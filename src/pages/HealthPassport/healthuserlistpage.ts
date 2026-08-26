import { BasePage } from "../BasePage";
import { Locator, Page } from "@playwright/test";


export class healthuserlistpage extends BasePage {

    private readonly searchBtn: Locator;
    private readonly loader: Locator;

    constructor(page: Page) {
        super(page)
        this.searchBtn = this.page.getByRole('textbox', { name: 'Search name, email, phone,' });
        this.loader = this.page.locator(`//div[contains(@class,'overflow-hidden')]/div[contains(@class,'flex items-center justify-center py')]`)

    }

    async searchUser(name: string): Promise<void> {
        await this.searchBtn.waitFor();
        await this.searchBtn.click()
        await this.searchBtn.fill(name);
    }

    async selectUser(name: string): Promise<void> {
        let user = await this.page.locator(`//table/tbody/tr/td//div[contains(@class,'min-w')]`).getByText(name);
        await user.waitFor();
        await user.click();
    }

}