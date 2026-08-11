import { Page } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }


    async waitForPageLoad() {
        await this.page.waitForLoadState('load')
    }

    async waitForPageDomLoad() {
        await this.page.waitForLoadState('domcontentloaded')
    }

    async waitForPageApiCall() {
        await this.page.waitForLoadState('networkidle')
    }

    async waitForElementTimeout (sec:number){
        await this.page.waitForTimeout(sec);
    }
}