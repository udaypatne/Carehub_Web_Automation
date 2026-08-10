import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

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


    constructor(page: Page) {
        super(page);
        this.emailId = page.getByRole('textbox', { name: 'Email*' });
        this.password = page.getByRole('textbox', { name: 'Password*' });
        this.loginBtn = page.getByText('Sign in', { exact: true });
        this.signedInSuccessMsg = page.getByText('Signed in successfully');
        this.forgotPassword = page.getByRole('button', { name: 'Forgot password?' });
        this.nextBtn = page.locator(`//body//div[contains(@class,'outline-none')]//button[@type='button' and contains(text(),'Next')]`);
        this.skipBtn = page.locator(`//body//div[contains(@class,'outline-none')]//button[@type='button' and contains(text(),'Skip')]`);
        this.doNotShowCheckbox = page.locator(`//div[contains(@class,'shadow')]//label[contains(@class,'flex')]/input[@type='checkbox']`);
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
        } else {
            console.log("Login button is disabled");
        }
        await this.signedInSuccessMsg.isVisible();
    }
    async disableTutorial(): Promise<void> {
        await this.page.waitForTimeout(3000);
        if (await this.nextBtn.isVisible()) {
            await this.doNotShowCheckbox.click();
            await this.skipBtn.click();
        }
    }

}