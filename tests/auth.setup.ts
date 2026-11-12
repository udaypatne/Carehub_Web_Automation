import fs from "fs";
import { Browser, test as setup } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { authFile, openSignedIn, SESSION_ROLES, waitUntilSignedIn } from "../src/utils/authState";

// Signs each role in to CareHub ONCE and saves the browser session (cookies,
// local storage and IndexedDB, where Firebase keeps its sign-in). Test files
// then start signed in, via test.use({ storageState: authFile(ROLE) }), instead
// of each test typing a 2FA code: CareHub accepts a code only once, and Firebase
// limits how many sign-ins it takes (auth/quota-exceeded).
//
// A session saved in the last hour is reused while it still opens the
// dashboard, so running a single test again does not sign in again.

const REUSE_FOR_MS = 60 * 60_000;

for (const role of SESSION_ROLES) {
    setup(`sign in as ${role}`, async ({ browser, page }, testInfo) => {
        const file = authFile(role);
        if (await savedSessionWorks(browser, file, testInfo.project.use.baseURL)) {
            fs.chmodSync(file, 0o600); // live session tokens: readable by this user only
            console.log(`${role}: reusing the session saved ${Math.round((Date.now() - fs.statSync(file).mtimeMs) / 60_000)} min ago`);
            return;
        }

        const email = process.env[role];
        const password = process.env[`${role}_PASSWORD`] || process.env.PASSWORD;
        if (!email || !password) throw new Error(`${role} (its email) or PASSWORD is not set in config/.env.<ENV>.`);

        const loginPage = new LoginPage(page);
        await loginPage.navToLoginPage();
        await loginPage.login(email, password);
        // After "Signed in successfully." CareHub resets the sign-in form for a
        // moment before moving on, so wait to leave the page before checking.
        await page.waitForURL((url) => !url.pathname.startsWith("/provider/"), { timeout: 30_000 });
        await waitUntilSignedIn(page);
        await loginPage.disableTutorial();
        await page.context().storageState({ path: file, indexedDB: true });
        fs.chmodSync(file, 0o600); // live session tokens: readable by this user only
        console.log(`${role}: signed in and saved the session`);
    });
}

async function savedSessionWorks(browser: Browser, file: string, baseURL: string | undefined): Promise<boolean> {
    if (!fs.existsSync(file) || Date.now() - fs.statSync(file).mtimeMs > REUSE_FOR_MS) return false;
    const context = await browser.newContext({ baseURL, storageState: file });
    try {
        await openSignedIn(await context.newPage());
        return true;
    } catch {
        return false;
    } finally {
        await context.close();
    }
}
