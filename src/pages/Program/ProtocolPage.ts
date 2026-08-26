import { TIMEOUT } from "node:dns";
import { BasePage } from "../BasePage";
import { Locator, Page } from "@playwright/test";

export class ProtocolPage extends BasePage {

    private readonly programheading: Locator;
    private readonly addModulePopUp: Locator;
    private readonly addModuleTitle: Locator;
    private readonly nutrition: Locator;
    private readonly savebtn: Locator;
    private readonly moduleWeek: Locator;
    private readonly educationSummaryDescription: Locator;
    private readonly createModulebtn: Locator;
    private readonly protocolTab: Locator;
    private readonly phaseTile: Locator;

    //Week locators
    private readonly weekTab: Locator;
    private readonly weekNumber: Locator;
    private readonly weekTitle: Locator;
    private readonly weekDescription: Locator;
    private readonly stepProtocol: Locator;
    private readonly activityProtocol: Locator;
    private readonly calorieProtocol: Locator;
    private readonly carbsProtocol: Locator;
    private readonly fatProtocol: Locator;
    private readonly hydrationsProtocol: Locator;
    private readonly sleepHoursProtocol: Locator;
    private readonly strengthProtocol: Locator;
    private readonly stressProtocol: Locator;
    private readonly weightLossProtocol: Locator;
    private readonly restingHoursProtocol: Locator;
    private readonly hrvProtocol: Locator;
    private readonly allProtocols: Locator;
    private readonly savedMessage: Locator;
    private readonly tabsList: Locator;



    constructor(page: Page) {
        super(page);
        this.programheading = page.getByRole('heading', { name: 'Program structure' });
        this.addModulePopUp = page.getByRole('dialog', { name: 'Add Module' });
        this.addModuleTitle = page.getByRole('textbox', { name: 'Track Your Food' });
        this.nutrition = page.getByRole('textbox', { name: 'nutrition' });

        this.savebtn = page.getByRole('button', { name: 'Save' });
        this.moduleWeek = page.locator(`//*[@style='opacity: 1; position: relative; transition: transform linear;']`).filter({ hasText: 'Module 1' }).
            getByRole('button', { name: 'week' });
        this.educationSummaryDescription = page.locator(`//*[text()='Educational summary']/following-sibling::textarea`);
        this.createModulebtn = page.getByRole('button', { name: 'module' });
        this.protocolTab = page.getByRole('tab', { name: 'Protocol' });
        this.phaseTile = page.locator(`//div[contains(@class,'flex items-center gap-2 px-4 py-2.5 border-b border-border hover:bg-card-nested/40 group')]`).first();

        //Week
        this.weekTab = page.getByRole('dialog', { name: 'Add week' });
        this.weekNumber = page.getByText('Week number').locator('../input');
        this.weekTitle = page.getByText('Title').locator('../input');
        this.weekDescription = page.getByText(`Content (markdown)`).locator(`../textarea`);
        this.stepProtocol = page.getByText(`Steps / day`).locator(`../input`);
        this.activityProtocol = page.getByText(`Activity min / wk`).locator(`../input`)
        this.calorieProtocol = page.getByText(`Daily calories`).locator(`../input`)
        this.carbsProtocol = page.getByText(`Carbs g / day`).locator(`../input`)
        this.fatProtocol = page.getByText(`Fat g / day`).locator(`../input`);
        this.hydrationsProtocol = page.getByText(`Hydration ml`).locator(`../input`)
        this.sleepHoursProtocol = page.getByText(`Sleep hrs`).locator(`../input`)
        this.strengthProtocol = page.getByText(`Strength / wk`).locator(`../input`)
        this.stressProtocol = page.getByText(`Stress / wk`).locator(`../input`)
        this.weightLossProtocol = page.getByText(`Weight loss %`).locator(`../input`)
        this.restingHoursProtocol = page.getByText(`Resting HR`).locator(`../input`)
        this.hrvProtocol = page.getByText(`HRV`).locator(`../input`)
        this.allProtocols = page.locator(`//div[contains(@class,' gap-x-3 gap-y-3')]//input`)
        this.savedMessage = page.getByText('Saved');
        this.tabsList=page.locator(`//*[@role='tablist']//button/.`);
    }

    async getHeT(): Promise<string> {
        return this.programheading.innerText();
    }

    async weekSaved(): Promise<boolean> {
        return await this.savedMessage.isVisible({});
    }

    async getTabs(): Promise<string[]> {
        return await this.tabsList.allInnerTexts();
    }

    async selectPhase(phaseName: string): Promise<void> {
        await this.page.waitForLoadState('networkidle')
        let phase = await this.page.locator(`//*[contains(@class,'overflow-hidden bg-card')]/descendant::span[contains(text(),'${phaseName}')]`);
        if (await phase.isVisible()) {
            await phase.hover({ timeout: 5000 });
        }
    }

    async getModuleText(moduleName: string): Promise<string> {
        let module = await this.page.locator(`//div[contains(@class,'bg-card-nested/40 group')]`).filter({ hasText: `Module 1 · ${moduleName}` });
        if (await module.isVisible()) {
            await module.hover();
        }
        return await module.innerText();
    }

    async addWeekUnderModule(moduleName: string) {
        let module = await this.page.getByText(`Module 1 · ${moduleName}`).locator('..');
        let week = await this.page.locator(`//div[contains(@class,'bg-card-nested/40 group')]`).filter({ hasText: `Module 1 · ${moduleName}` }).getByRole('button', { name: `Week` })
        // await week.hover();
        //await week.click();
        for (let i = 0; i < 5; i++) {
            await module.hover();
            console.log('week hover 105');
            let buttonVisible1 = await week.isVisible();
            if (await buttonVisible1) {
                await week.click();
                console.log('week clicked 109');
                break;
            }
            await this.page.waitForTimeout(500);
        }
    }


    async createModule(phaseName: string, moduleName: string): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded')
        //  await this.selectPhase(phaseName);
        console.log('countIs ', await this.phaseTile.count());
        for (let i = 0; i < 5; i++) {
            //  await this.selectPhase(phaseName);
            await this.phaseTile.hover();
            await this.createModulebtn.waitFor({ state: 'visible' });
            let buttonVisible = await this.createModulebtn.isVisible();
            if (buttonVisible) {
                await this.createModulebtn.click();
                break;
            }
            await this.page.waitForTimeout(500);
        }

        await this.page.waitForLoadState("networkidle");
        // await this.createModulebtn.click({ timeout: 2000 })
        let createModuleIsVisible = await this.addModulePopUp.isVisible();
        await this.addModulePopUp.waitFor({ state: 'visible' });
        if (createModuleIsVisible) {
            await this.addModuleTitle.fill(moduleName);
            await this.nutrition.fill(moduleName + 'nutri');
            await this.educationSummaryDescription.fill('Description test')
            let vd = await this.savebtn.isVisible();
            if (vd) {
                await this.savebtn.isEnabled();
                await this.savebtn.click();
            }
            await this.page.waitForLoadState("networkidle");
            await this.page.waitForLoadState('domcontentloaded');
            let moduleTextIs = await this.getModuleText(moduleName);
            console.log("bbbb", moduleTextIs);

        }
    }


    async createModule2(phaseName: string, moduleName: string): Promise<void> {
        console.log(this.page.title());
        console.log(this.page.url());
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForLoadState('networkidle')
        await this.phaseTile.highlight();
        console.log('countIs ', await this.phaseTile.count());
        //  await this.selectPhase(phaseName);
        for (let i = 0; i < 5; i++) {
            await (await this.phaseTile).hover();
            try {
                await this.createModulebtn.highlight()
                await this.createModulebtn.waitFor({
                    state: 'visible',
                    timeout: 2000
                });

                await this.createModulebtn.click();
                return; // Success
            } catch {
                await this.page.waitForTimeout(2000);
            }
        }

        throw new Error(`Create Module button did not appear for phase: ${phaseName}`);
    }

    async commonProtocolLocator(protocolName: string) {
        return await this.page.locator('.space-y-1')
            .filter({ hasText: protocolName })
            .locator('input')
    }

    async fillProtocol(protocolName: string, value: string): Promise<void> {
        let protocol = await this.commonProtocolLocator(protocolName);
        console.log(
            `Protocol: ${protocolName} | Count: ${await protocol.count()} | Value: ${value}`
        );
        if (await protocol.isVisible()) {
            await protocol.fill(value);
        } console.log(`Filled ${protocolName}`);
    }

    async getProtocolCount(): Promise<number> {
        let protocolCount = await this.allProtocols.count();
        return await protocolCount;
    }

    async createWeek(weeknumber: string, weekTitle: string, weekDescription: string, protocols: { protocolName: string; value: string }[]): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        //    let countp = await this.getProtocolCount();
        //   console.log('count is ?', countp)
        console.log('217')

        if (await this.weekTab.isVisible()) {
            await this.weekNumber.fill(weeknumber)
            await this.weekTitle.fill(weekTitle);
            await this.weekDescription.fill(weekDescription);
            console.log('223 description')
            for (const protocol of protocols) {
                console.log(
                    `Filling protocol: ${protocol.protocolName} = ${protocol.value}`
                );

                await this.fillProtocol(
                    protocol.protocolName,
                    protocol.value
                );
                console.log('Filled', protocol.protocolName)
            }
        }
        else {
            console.log('not open')
        }
        await this.savebtn.click();
    }

    async getWeekText(moduleName: string, weekName: string): Promise<string> {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');

        //  let module = await this.page.locator(`//div[contains(@class,'bg-card-nested/40 group')]`).filter({ hasText: moduleName }).locator('svg').nth(1);
        //  await this.page.locator(`//div[contains(@class,'bg-card-nested/40 group')]`) .filter({has: this.page.getByText('Module 1 · Automation Module', { exact: true })}).locator('svg').nth(1).locator('..')
        //const maximizeModule = module.locator('svg').nth(1);
        let pre = this.page.getByText('Module 1 · Automation Module', { exact: true })
            .locator('..')
            .locator('//button');


        let module = await this.page.locator(`//*[contains(text(),'Automation')]/..//*[name()='svg' and contains(@class, 'lucide lucide-chevron-right h-3.5 w-3.5 transition-transform')]`);

        if (await module.isVisible()) {
            await module.click();
            // await maximizeModule.locator('xpath=..').click({ force: true });
        }

        await this.page.waitForLoadState('domcontentloaded');
        // await this.page.waitForLoadState('networkidle');
        const week = await this.page.locator(`//div[contains(@class,'bg-card-nested/40 group')]`).filter({ hasText: weekName });

        console.log(week)
        await week.waitFor({
            state: 'visible',
            timeout: 3000
        });
        await week.isVisible();
        return await week.innerText();

    }

}

