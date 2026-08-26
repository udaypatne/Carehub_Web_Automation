import { BasePage } from "../BasePage";
import { Locator, Page } from "@playwright/test";

export class CareProgramPage2 extends BasePage {

    private readonly createProgramBtn: Locator;
    private readonly importProgramBtn: Locator;
    private readonly readOnlyMsg: Locator;
    private readonly viewDetails: Locator;
    private readonly createProgramPopUp: Locator;
    private readonly programName: Locator;
    private readonly duration: Locator;
    private readonly modules: Locator;
    private readonly programDescription: Locator;
    private readonly makeThisProgramCheckbox: Locator;
    private readonly cancel: Locator;
    private readonly saveCreateProgram: Locator;
    private readonly programHeaderN: Locator;




    constructor(page: Page) {
        super(page);
        this.createProgramBtn = page.getByRole('button', { name: 'Create Program' });
        this.importProgramBtn = page.getByRole('button', { name: 'Import Program' });
        this.readOnlyMsg = page.getByText(` Read-only — you don't have permission to edit this program's structure`);
        this.viewDetails = page.getByRole('button', { name: 'View Details' }).first();
        this.createProgramPopUp = page.getByRole('dialog', { name: 'Create Program' });
        this.programName = page.getByRole('textbox', { name: 'e.g. Spring Weight Loss Cohort' });
        this.duration = page.locator(`//*[contains(text(),'Duration')]/following-sibling::input`);
        this.modules = page.locator(`//*[contains(text(),'Total Module')]/following-sibling::input`);
        this.programDescription = page.getByRole('textbox', { name: 'describe the program' });
        this.makeThisProgramCheckbox = page.getByRole('checkbox', { name: 'Make this Program' });
        this.cancel = page.getByRole('button', { name: 'Cancel' });
        this.saveCreateProgram = page.locator(`//*[contains(@class,'flex flex-col-reve')]`).getByRole('button', { name: 'Create Program' });
        this.programHeaderN = page.getByRole('heading', { level: 1 });
    }

    async selectTab(tabName: string): Promise<void> {
        await this.page.getByRole('link', { name: tabName, exact: true }).click();
    }

    async careProgramBtns(buttonName: string): Promise<boolean> {
        return await this.page.getByRole('button', { name: `${buttonName}` }).isVisible();
    }

    async selectProgramByName(programName: string): Promise<void> {
        let viewDetail = await this.page.locator(`//*[contains(text(),'${programName}')]/../../..`).getByRole('button', { name: 'view Details' }).first();
        await viewDetail.waitFor({ state: 'visible' });
        await viewDetail.click();
    }

    async clickOnViewDetails(): Promise<void> {
        // await this.viewDetails.waitFor({     state: 'visible'});
        await this.viewDetails.click();
    };

    async isReadOnlyPermissionMsgPresent(): Promise<boolean> {
        await this.readOnlyMsg.waitFor({
            state: 'visible'
        });
        return await this.readOnlyMsg.isVisible()
    }

    async expectedUrlPath(): Promise<string> {
        await this.page.waitForURL('/dashboard/programs');
        return await this.page.url();
    }

    async createProgram(progName: string, duration: string, modules: string): Promise<void> {
        if (await this.createProgramBtn.isVisible) {
            await this.createProgramBtn.click();
            if (await this.createProgramPopUp.isVisible()) {
                await this.programName.fill(progName);
                await this.duration.fill(duration);
                await this.modules.fill('2');
                await this.programDescription.fill(modules);
                await this.saveCreateProgram.click({ timeout: 5000 });
            }
        }



    }
}