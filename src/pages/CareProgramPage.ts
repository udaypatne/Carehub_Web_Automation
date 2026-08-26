import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class CareProgramPage extends BasePage {

    private readonly createProgram: Locator;

    private readonly readOnlyMsg: Locator;
    private readonly viewDetails: Locator;
    private readonly createProgramPopUp: Locator;
    private readonly programName:Locator;
    private readonly duration: Locator;
    private readonly modules: Locator;
    private readonly programDescription: Locator;
    private readonly makeThisProgramCheckbox: Locator;
    private readonly cancel: Locator;



    constructor(page: Page) {
        super(page);
        this.createProgram = page.getByRole('button', { name: 'Create Program' });
        this.createProgram = page.getByRole('button', { name: 'Import Program' });
        this.readOnlyMsg = page.getByText(` Read-only — you don't have permission to edit this program's structure`);
        this.viewDetails = page.getByRole('button', { name: 'View Details' }).first();
        this.createProgramPopUp= page.getByRole('dialog',{name:'Create Program'});
        this.programName= page.getByRole('textbox', {name:'e.g. Spring Weight Loss Cohort'});
        this.duration= page.locator(`//*[contains(text(),'Duration')]/following-sibling::input`);
        this.modules= page.locator(`//*[contains(text(),'Total Module')]/following-sibling::input`);
        this.programDescription= page.getByRole('textbox',{name:'describe the program'});
        this.makeThisProgramCheckbox=page.getByRole('checkbox',{name:'Make this Program'});
        this.cancel=page.getByRole('button',{name:'Cancel'});
    }

    async selectTab(tabName: string): Promise<void> {
        await this.page.getByRole('link', { name: tabName, exact: true }).click();
    }

    async careProgramBtns(buttonName: string): Promise<boolean> {
        return await this.page.getByRole('button', { name: `${buttonName}` }).isVisible({ timeout: 30000 });
    }

    async selectProgramByName(programName: string): Promise<void> {
        let viewDetail = await this.page.locator(`//*[contains(text(),'${programName}')]/../../../..`).getByRole('button', { name: 'view Details' })
        await viewDetail.waitFor({ state: 'visible' });
        await viewDetail.click();
    }

    async clickOnViewDetails() {
      //  await this.page.waitForTimeout(7000);
        await this.viewDetails.waitFor({
            state: 'visible'
        });
        if (await this.viewDetails.isVisible) {
            await this.viewDetails.click()
        }
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
}