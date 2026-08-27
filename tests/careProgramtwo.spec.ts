
import { test, expect } from "../src/fixtures/programFixture"

let CareProgName = 'Automation'

async function navigateOnProgramPage(careProgramPage2: any) {
    return await careProgramPage2.selectProgramByName(CareProgName);

}

test.beforeEach(async ({ loginPage, careProgramPage2, page }) => {
    await loginPage.navToLoginPage();
    loginPage.login(process.env.ORG_ADMIN!, 'Test@123');
    await page.waitForURL('/dashboard')
    await loginPage.disableTutorial();
    await careProgramPage2.selectTab('Care Programs');
    await page.waitForLoadState('load');
    await careProgramPage2.expectedUrlPath();
    await page.waitForLoadState('networkidle');
})

test('verify create Program', async ({ careProgramPage2, protocolPage, basePage }) => {
    CareProgName = 'Automation'
    let expectedModuleText = 'Automation Module';
    let expectedWeekText = 'sample Week'
    await careProgramPage2.selectTab('Care Programs');
    await careProgramPage2.expectedUrlPath();
    await basePage.waitForElementTimeout(2000);
    await careProgramPage2.createProgram(CareProgName, '1', 'description text');

   // await protocolPage.createModule('Phase 1', expectedModuleText)
   // let actualModuleText = await protocolPage.getModuleText(expectedModuleText);
   // await expect(actualModuleText).toContain(expectedModuleText);

    const protocols = [
        { protocolName: `Steps / day`, value: '1111' },
        { protocolName: `Activity min / wk`, value: '35' },
        { protocolName: `Daily calories`, value: '2000' },
        { protocolName: `Protein g / day`, value: '80' },
        { protocolName: `Carbs g / day`, value: '125' },
        { protocolName: `Fat g / day`, value: '30' },
        { protocolName: `Hydration ml`, value: '4' },
        { protocolName: `Sleep hrs`, value: '6' },
        { protocolName: `Strength / wk`, value: '45' },
        { protocolName: `Stress / wk`, value: '10' },
        { protocolName: `Weight loss %`, value: '2' },
        { protocolName: `Resting HR`, value: '4' },
        { protocolName: `HRV`, value: '50' },
    ];
    await protocolPage.addWeekUnderPhase()
    await protocolPage.createWeek('1', expectedWeekText, 'description', protocols);
    await basePage.waitForPageApiCall();
    expect.soft(await protocolPage.weekSaved()).toBeTruthy();
    expect.soft(await protocolPage.isWeekTitlePresent()).toBeTruthy();


})

test('verify Tabs availability on Protocol Page', async ({ careProgramPage2, protocolPage, basePage }) => {
    const expectedTabs = [
        "Protocol",
        "Enrolled Patients",
        "Content Library",
        "Outcomes",
        "Voice Campaigns",
        "Campaigns",
        "Nudge Audit",
        "Settings",
    ]
    await navigateOnProgramPage(careProgramPage2);
    await careProgramPage2.clickOnViewDetails();
    await basePage.waitForElementTimeout(2000);
    let actualTabs = await protocolPage.getTabs();
    console.log(actualTabs, 'list');
    expect(actualTabs).toEqual(expectedTabs);
})
