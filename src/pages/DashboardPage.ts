import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";
export class DashboardPage extends BasePage {

    private readonly menuTabs: Locator;


    constructor(page: Page) {
        super(page);
        this.menuTabs = page.locator(`//*[contains(@class,'flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1')]//a[contains(@class,'flex')]//span[@class='flex-1']`)

    }

    async getAllMenuItems(): Promise<string[]> {
        return await this.menuTabs.allInnerTexts();
    }

    async selectTab(tabName: string): Promise<void> {
    await this.page.locator(
        `//*[contains(@class,'flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1')]//a[contains(@class,'flex')]//span[normalize-space()='${tabName}']`
    ).click();
}
}