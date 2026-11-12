import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { freshTotp, normalizeTotpKey } from "../utils/totp";

export type SubmitResult =
    | { outcome: "accepted" }
    | { outcome: "rejected"; message: string }
    | { outcome: "unconfirmed" };

/**
 * CareHub's "Set up two-step verification" page (XSPAN-9002) at
 * /provider/mfa-setup. Selectors and texts from xspan-provider-portal-web
 * src/features/auth/mfa-setup/MfaSetupPage.tsx. On success CareHub signs the
 * user out and goes to /provider/login?mfa_set_up=1.
 */
export class MfaSetupPage extends BasePage {
    static readonly PATH = "/provider/mfa-setup";

    private readonly secretKey: Locator;
    private readonly codeInput: Locator;
    private readonly turnOnBtn: Locator;
    private readonly codeError: Locator;
    private readonly alreadyOn: Locator;
    private readonly notAvailable: Locator;
    private readonly loadError: Locator;

    constructor(page: Page) {
        super(page);
        this.secretKey = page.getByTestId("totp-secret-key");
        this.codeInput = page.locator("#totp-code");
        this.turnOnBtn = page.getByRole("button", { name: "Turn on two-step verification" });
        this.codeError = page.locator("#totp-code-error");
        this.alreadyOn = page.getByText("Two-step verification is already on.");
        this.notAvailable = page.getByText("Two-step verification isn't turned on for your organization yet.");
        this.loadError = page.locator('.auth-banner[role="alert"]');
    }

    /**
     * The account's new authenticator key, read off the page (never logged).
     * Throws a plain explanation when the page shows anything but a key.
     */
    async readKey(timeoutMs = 30_000): Promise<string> {
        const shown = await firstVisible(
            { key: this.secretKey, alreadyOn: this.alreadyOn, notAvailable: this.notAvailable, loadError: this.loadError },
            timeoutMs,
        );
        switch (shown) {
            case "key":
                return normalizeTotpKey((await this.secretKey.textContent()) ?? "");
            case "alreadyOn":
                throw new Error(
                    "CareHub says this account already has an authenticator app. An org admin must reset " +
                    "its two-step verification first (Staff list → Reset two-step verification).",
                );
            case "notAvailable":
                throw new Error("CareHub says two-step verification isn't turned on for this organization yet.");
            case "loadError":
                throw new Error(`CareHub couldn't start the set-up: "${await this.loadError.innerText()}"`);
            default:
                throw new Error("The set-up page did not show a key in time.");
        }
    }

    /** Types the current code for `secret` and clicks "Turn on two-step verification". */
    async submitCode(secret: string, timeoutMs = 30_000): Promise<SubmitResult> {
        await this.codeInput.fill(await freshTotp(secret));
        await this.turnOnBtn.click();
        const deadline = Date.now() + timeoutMs;
        while (Date.now() < deadline) {
            if (new URL(this.page.url()).searchParams.get("mfa_set_up") === "1") return { outcome: "accepted" };
            if (await this.codeError.isVisible().catch(() => false)) {
                return { outcome: "rejected", message: await this.codeError.innerText() };
            }
            await this.page.waitForTimeout(250);
        }
        return { outcome: "unconfirmed" };
    }
}

/** Polls until one of `locators` is visible; returns its name, or "timeout". */
async function firstVisible<K extends string>(locators: Record<K, Locator>, timeoutMs: number): Promise<K | "timeout"> {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        for (const name of Object.keys(locators) as K[]) {
            if (await locators[name].first().isVisible().catch(() => false)) return name;
        }
        await new Promise((resolve) => setTimeout(resolve, 250));
    }
    return "timeout";
}
