import path from "path";
import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { MfaSetupPage } from "../pages/MfaSetupPage";
import { readEnvValue, setEnvValue } from "./envFile";

export interface EnrollOptions {
    /** Env var holding the account's email, e.g. ORG_ADMIN or NURSE_ROLE. */
    role: string;
    /** The dotenv file to save `<role>_TOTP_SECRET` in, e.g. config/.env.qa. */
    envFile: string;
    /** Where the email and password are read from. Default: process.env. */
    env?: NodeJS.ProcessEnv;
    /** Replace a key that is already saved (after an admin reset). */
    force?: boolean;
    log?: (line: string) => void;
    signInTimeoutMs?: number;
    confirmTimeoutMs?: number;
}

/**
 * Sets up CareHub two-step verification (XSPAN-9002) for one test account and
 * saves its authenticator key as `<role>_TOTP_SECRET` in `envFile`.
 *
 * Signs in with the account's email and password; CareHub then opens its
 * set-up page, which shows the key. The key is saved BEFORE it is turned on, so
 * an accepted key is never lost, and put back the way it was if CareHub
 * rejects it. The key is never logged or put in an error.
 */
export async function enrollTotp(page: Page, opts: EnrollOptions): Promise<void> {
    const { role, envFile } = opts;
    const env = opts.env ?? process.env;
    const log = opts.log ?? ((line: string) => console.log(line));
    const secretVar = `${role}_TOTP_SECRET`;
    const fileName = path.basename(envFile);

    if (!/^[A-Z][A-Z0-9_]*$/.test(role)) throw new Error(`Not an env var name: ${role}`);
    const email = env[role];
    const password = env[`${role}_PASSWORD`] || env.PASSWORD;
    if (!email) throw new Error(`${role} (the account's email) is not set in ${fileName}.`);
    if (!password) throw new Error(`No password for ${role}: set PASSWORD (or ${role}_PASSWORD) in ${fileName}.`);
    if (readEnvValue(envFile, secretVar) && !opts.force) {
        throw new Error(
            `${secretVar} is already saved in ${fileName}. To replace it (only after an admin has reset ` +
            `the account's two-step verification), run again with FORCE=1.`,
        );
    }

    log(`${role}: signing in`);
    const loginPage = new LoginPage(page);
    await loginPage.navToLoginPage();
    if (!(await loginPage.submitCredentials(email, password))) {
        throw new Error(`${role}: the Sign in button stayed disabled.`);
    }

    switch (await signInOutcome(page, loginPage, opts.signInTimeoutMs ?? 30_000)) {
        case "setup":
            break;
        case "hasApp":
            throw new Error(
                `${role} already has an authenticator app (CareHub asked for its code). An org admin must reset ` +
                "its two-step verification first (Staff list → Reset two-step verification), then run this again.",
            );
        case "badLogin":
            throw new Error(`${role}: CareHub rejected the email or password in ${fileName}.`);
        case "signedIn":
            throw new Error(
                `${role}: CareHub signed in without asking to set up two-step verification, so it is not ` +
                "required for this account yet. Nothing to do.",
            );
        default:
            throw new Error(`${role}: timed out waiting for CareHub after signing in.`);
    }

    const setupPage = new MfaSetupPage(page);
    const secret = await setupPage.readKey();
    log(`${role}: got the key from the set-up page`);

    const previous = setEnvValue(envFile, secretVar, secret);
    let keep = false;
    try {
        for (let attempt = 1; ; attempt++) {
            const result = await setupPage.submitCode(secret, opts.confirmTimeoutMs ?? 30_000);
            if (result.outcome === "accepted") {
                keep = true;
                log(`${role}: two-step verification is on; key saved as ${secretVar} in ${fileName}`);
                return;
            }
            if (result.outcome === "unconfirmed") {
                // It may have been accepted: losing a working key would need another admin reset.
                keep = true;
                throw new Error(
                    `${role}: CareHub did not confirm in time. The key is kept as ${secretVar} in case it ` +
                    `was accepted; run a test as ${role} to check.`,
                );
            }
            if (attempt === 2) {
                throw new Error(
                    `${role}: CareHub did not accept the code ("${result.message}"). Check that this ` +
                    "computer's clock is set automatically, then run this again.",
                );
            }
            // The code can expire between typing it and CareHub checking it.
            log(`${role}: code not accepted, trying once more with a fresh one`);
        }
    } finally {
        if (!keep) {
            try {
                setEnvValue(envFile, secretVar, previous ?? "");
            } catch {
                log(`${role}: could not restore ${secretVar} in ${fileName}; set it back by hand.`);
            }
        }
    }
}

type SignInOutcome = "setup" | "hasApp" | "badLogin" | "signedIn" | "timeout";

/** What CareHub did after Sign in, found by polling (it shows one of these). */
async function signInOutcome(page: Page, loginPage: LoginPage, timeoutMs: number): Promise<SignInOutcome> {
    const onPath = (p: string) => new URL(page.url()).pathname.startsWith(p);
    const deadline = Date.now() + timeoutMs;
    let signedInAt: number | undefined;
    while (Date.now() < deadline) {
        if (onPath(MfaSetupPage.PATH)) return "setup";
        if (await page.locator("#totp-code").isVisible().catch(() => false)) return "hasApp";
        if (await loginPage.isLoginErrorDisplayed().catch(() => false)) return "badLogin";
        if (!onPath("/provider/login")) {
            // Signed in. In the rollout's prompt phase CareHub moves on to the
            // set-up page right after, so give it a moment before concluding.
            signedInAt ??= Date.now();
            if (Date.now() - signedInAt > 5_000) return "signedIn";
        }
        await page.waitForTimeout(250);
    }
    return signedInAt ? "signedIn" : "timeout";
}
