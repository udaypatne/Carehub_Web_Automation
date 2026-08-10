
import { test, expect } from "../src/fixtures/programFixture"






test.beforeEach(async ({ loginPage, careProgramPage2, page }) => {
    await loginPage.navToLoginPage();
    loginPage.login(process.env.ORG_ADMIN!, 'Test@123');
    await page.waitForURL('/dashboard')
    await loginPage.disableTutorial();
    await careProgramPage2.selectTab('Care Programs');
    await careProgramPage2.expectedUrlPath();
    await page.waitForLoadState('networkidle');
})

test('verify create Program', async ({ careProgramPage2, protocolPage, page }) => {
    let expectedModuleText = 'Automation Module';
    let expectedWeekText = 'sample Week'
    await careProgramPage2.selectTab('Care Programs');
    await careProgramPage2.expectedUrlPath();
    await page.waitForTimeout(2000);
    await careProgramPage2.createProgram('sample', '1', 'automation')

    await protocolPage.createModule('Phase 1', expectedModuleText)
    let actualModuleText = await protocolPage.getModuleText(expectedModuleText);
    await expect(actualModuleText).toContain(expectedModuleText);

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

    console.log("run45")
    await protocolPage.addWeekUnderModule(expectedModuleText);
    await protocolPage.createWeek('1', expectedWeekText, 'description', protocols);
    expect(await protocolPage.weekSaved()).toBeTruthy();


})
