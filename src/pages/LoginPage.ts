import { Locator, Page, test } from "@playwright/test";
import { BasePage } from "./BasePage";
import { claimTotp, totpSecretFor } from "../utils/totp";

export class LoginPage extends BasePage {

    // Locators:

    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgotPassword: Locator;
    private readonly signedInSuccessMsg: Locator;
    private readonly nextBtn: Locator;
    private readonly skipBtn: Locator;
    private readonly doNotShowCheckbox: Locator;
    private readonly loginErrorMessage:Locator;
    private readonly totpCode: Locator;
    private readonly verifyBtn: Locator;
    private readonly totpCodeError: Locator;
    private readonly notifications: Locator;


    constructor(page: Page) {
        super(page);
        this.emailId = page.getByRole('textbox', { name: 'Email*' });
        this.password = page.getByRole('textbox', { name: 'Password*' });
        this.loginBtn = page.getByText('Sign in', { exact: true });
        this.signedInSuccessMsg = page.getByText('Signed in successfully');
        this.forgotPassword = page.getByRole('button', { name: 'Forgot password?' });
        this.nextBtn = page.locator(`//body//div[contains(@class,'outline-none')]//button[@type='button' and contains(text(),'Next')]`);
        this.skipBtn = page.locator(`//body//div[contains(@class,'outline-none')]//button[@type='button' and contains(text(),'Skip')]`);
        this.doNotShowCheckbox = page.locator(`//div[contains(@class,'shadow')]//label[contains(@class,'flex')]/input[@type='checkbox']`).last();
        this.loginErrorMessage=this.page.getByText('Invalid email or password.', { exact: true });
        this.totpCode = page.locator('#totp-code');
        this.verifyBtn = page.getByRole('button', { name: 'Verify & sign in' });
        this.totpCodeError = page.locator('#totp-code-error');
        // CareHub's toasts, e.g. "Firebase: Exceeded quota. (auth/quota-exceeded)."
        this.notifications = page.getByRole('region', { name: /^Notifications/ });
    }

    async navToLoginPage(): Promise<void> {
        await this.page.goto('provider/login')
    }

    async getLoginPageUrl(): Promise<String> {
        return await this.page.url();
    }

    async goToUrl(url: string): Promise<void> {
        await this.page.goto(url)
    }

    async login(username: string, password: string): Promise<void> {
        if (await this.submitCredentials(username, password)) {
            await this.completeTwoFactorIfAsked(username);
        }
        await this.signedInSuccessMsg.isVisible();
    }

    /** Types the email and password and clicks Sign in. False if Sign in was disabled. */
    async submitCredentials(username: string, password: string): Promise<boolean> {
        await this.emailId.fill(username);
        await this.password.fill(password);
        if (!(await this.loginBtn.isEnabled())) {
            console.log("Login button is disabled");
            return false;
        }
        await this.loginBtn.click();
        console.log("Login button clicked");
        return true;
    }

    // CareHub staff 2FA (XSPAN-9002). After the password, CareHub signs in, shows
    // an error, or asks for the authenticator code. Answer the code from the
    // account's TOTP secret; every other outcome is left to the caller as before.
    private async completeTwoFactorIfAsked(username: string): Promise<void> {
        // filter({ visible }): wait for whichever outcome SHOWS, not the first match
        // in the DOM, which may be a hidden element that never becomes visible.
        await this.totpCode.or(this.signedInSuccessMsg).or(this.loginErrorMessage)
            .filter({ visible: true }).first().waitFor({ timeout: 20_000 }).catch(() => { });
        if (this.page.url().includes('/provider/mfa-setup')) {
            throw new Error(
                "This account has no authenticator app set up. Set it up by hand once " +
                "(not in a test run, which would record the key) and save its key as <ROLE>_TOTP_SECRET.",
            );
        }
        if (!(await this.totpCode.isVisible())) return;

        // CareHub refuses a code another worker already typed for this account, so
        // claim a 30-second window of our own; any wait is added to the test's timeout.
        await this.totpCode.fill(await claimTotp(totpSecretFor(username), username, { onWait: extendTestTimeout }));
        await this.verifyBtn.click();
        // Settled when CareHub shows a code error or leaves the code page.
        await Promise.race([
            this.totpCodeError.waitFor({ state: 'visible', timeout: 20_000 }),
            this.totpCode.waitFor({ state: 'hidden', timeout: 20_000 }),
        ].map((settled) => settled.catch(() => { })));
        if (await this.totpCodeError.isVisible()) {
            throw new Error(
                `CareHub rejected the 2FA code ("${await this.totpCodeError.innerText()}"). ` +
                "Check the TOTP secret, and that this Mac's clock is set automatically.",
            );
        }
        if (await this.totpCode.isVisible()) {
            // Fail now with CareHub's own message, not 80 s later at waitForURL.
            const notice = (await this.notifications.innerText({ timeout: 1_000 }).catch(() => '')).trim();
            throw new Error(
                "CareHub did not sign in after the 2FA code: still on the code page after 20 s" +
                (notice ? ` ("${notice.slice(0, 200)}")` : "") +
                ". auth/quota-exceeded means Firebase is limiting sign-ins: wait a few minutes, then run again.",
            );
        }
    }

    async disableTutorial(): Promise<void> {
        await this.page.waitForTimeout(3000);
        if (await this.nextBtn.isVisible()) {
            await this.doNotShowCheckbox.click();
            await this.skipBtn.click();
        }
    }

    async isLoginErrorDisplayed(): Promise<boolean> {
        return await this.loginErrorMessage.isVisible();
    }


}

/** Gives the running test `ms` more time. Outside a test (the set-up script) does nothing. */
function extendTestTimeout(ms: number): void {
    let info;
    try {
        info = test.info();
    } catch {
        return;
    }
    if (info.timeout > 0) info.setTimeout(info.timeout + ms);
}