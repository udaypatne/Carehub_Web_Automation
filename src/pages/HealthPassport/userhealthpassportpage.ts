import { BasePage } from "../BasePage";
import { Browser, Locator, Page } from "@playwright/test";
import path from 'path';
import { PDFParse } from 'pdf-parse';
import fs from 'fs';

export class userhealthpassportpage extends BasePage {

    private readonly userName: Locator;
    private readonly tabList: Locator;
    private readonly timeWindowOptions: Locator;
    private readonly exportCSV: Locator;
    private readonly veiwHealthPassportReport: Locator;


    constructor(page: Page) {
        super(page);

        this.userName = this.page.locator(`//*[contains(@class,'flex items-center')]/div`).getByRole('heading', { level: 1 });
        this.tabList = this.page.locator(`//div[contains(@class,'bg-panel-header')]//div[@role='tablist']/button`);
        this.timeWindowOptions = this.page.getByText('Time Window').locator(`..//button`);
        this.exportCSV = this.page.locator(`//div[contains(@class,'bg-panel')]`).getByText('Export CSV');
        this.veiwHealthPassportReport = this.page.getByRole('button', { name: 'View Health Passport Report' });

    }

    async selectDays(name: string) {
        let days = await this.page.locator(`//div[contains(@class,'bg-panel')]`).getByText(name);
        await days.click()

    }

    async getTabText(): Promise<string[]> {

        await this.tabList.first().waitFor({
            state: 'visible'
        });

        return (await this.tabList.allTextContents())
            .map(text => text.trim());
    }

    async getTimeWindowsOptionText(): Promise<string[]> {
        let tabName;
        tabName = await this.tabList.allTextContents();
        return tabName;
    }

    async clickExportBtn(downloadPath: string): Promise<string> {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.exportCSV.click()
        ]);
        const filePath = path.join(downloadPath, await download.suggestedFilename());
        await download.saveAs(filePath);
        return filePath;
    }

    async viewHealthPassport(): Promise<string> {
        // Wait for the new PDF tab/window while clicking the button
        const [pdfPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.veiwHealthPassportReport.click()
        ]);
        await pdfPage.waitForLoadState('load');
        const pdfContent = await pdfPage.locator('body').innerText();
        return pdfContent;
    }


    async viewHealthPassport4(): Promise<string> {
        const context = this.page.context();

        const [pdfPage] = await Promise.all([
            context.waitForEvent('page'),
            this.veiwHealthPassportReport.click()
        ]);
        await pdfPage.waitForLoadState('domcontentloaded');
        const pdfUrl = pdfPage.url();
        console.log('PDF URL:', pdfUrl);
        // Get PDF using the browser context
        const response = await context.request.get(pdfUrl);
        if (!response.ok()) {
            throw new Error(
                `Failed to download PDF: ${response.status()} ${response.statusText()}`
            );
        }
        // Get PDF as Buffer
        const pdfBuffer = await response.body();
        // Parse PDF
        const parser = new PDFParse({
            data: pdfBuffer
        });
        const result = await parser.getText();
        //  console.log('PDF text:', result.text);
        await parser.destroy();
        return result.text;
    }

    async clickOnTab(tabName: string): Promise<void> {
        await this.page.getByRole('tab', { name: tabName }).click();
    }

    async downloadCsv(
        type: string,
        downloadPath: string
    ): Promise<string> {

        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.getByRole('button', {
                name: `Download ${type}`
            }).click()
        ]);

        const filePath = path.join(
            downloadPath,
            await download.suggestedFilename()
        );

        await download.saveAs(filePath);

        return filePath;
    }

}