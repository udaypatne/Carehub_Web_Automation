import { Page } from "@playwright/test";
import path from 'path';

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

    async waitForElementTimeout(sec: number) {
        await this.page.waitForTimeout(sec);
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title()
    }

    async getPageUrl(): Promise<string> {
        return await this.page.url()
    }

    async waitForUrlPath(path: string): Promise<void> {
        return await this.page.waitForURL(path);
    }

    async waitForTime(timeout: number) {
        await this.page.waitForTimeout(timeout);
    }

    async waitForDomLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
}

}