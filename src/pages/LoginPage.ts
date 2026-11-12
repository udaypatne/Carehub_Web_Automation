import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { freshTotp, totpSecretFor } from "../utils/totp";

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
        await this.emailId.fill(username);
        await this.password.fill(password);
        if (await this.loginBtn.isEnabled()) {
            await this.loginBtn.click();
            console.log("Login button clicked");
            await this.completeTwoFactorIfAsked(username);
        } else {
            console.log("Login button is disabled");
        }
        await this.signedInSuccessMsg.isVisible();
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

        await this.totpCode.fill(await freshTotp(totpSecretFor(username)));
        await this.verifyBtn.click();
        await this.totpCodeError.or(this.signedInSuccessMsg)
            .filter({ visible: true }).first().waitFor({ timeout: 20_000 }).catch(() => { });
        if (await this.totpCodeError.isVisible()) {
            throw new Error(
                `CareHub rejected the 2FA code ("${await this.totpCodeError.innerText()}"). ` +
                "Check the TOTP secret, and that this Mac's clock is set automatically.",
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