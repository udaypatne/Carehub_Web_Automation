import { test, expect } from '../src/fixtures/page'



test.beforeEach(async ({loginPage, page }) => {
    await loginPage.navToLoginPage();
    loginPage.login(process.env.PHYSICIAN_ROLE!, process.env.PASSWORD!);
    await page.waitForURL('/dashboard')
    await loginPage.disableTutorial();
})

test('verify create/import button disable for physician role', async ({ careProgramPage}) => {
    await careProgramPage.selectTab('Care Programs');
    await careProgramPage.expectedUrlPath();
    let createProgramBtn = await careProgramPage.careProgramBtns('Create Program');
    let importProgramBtn = await careProgramPage.careProgramBtns('Import Program');
    await expect(createProgramBtn,'Create program button should not be visible').toBeFalsy;
    await expect(importProgramBtn,'Import program button should not be visible').toBeFalsy();
})

test('verify physician role have Readonly permission', async ({careProgramPage }) => {
    await careProgramPage.selectTab('Care Programs');
    expect(await careProgramPage.expectedUrlPath()).toContain('/dashboard/programs');
    await careProgramPage.clickOnViewDetails();
    expect(await careProgramPage.isReadOnlyPermissionMsgPresent()).toBeTruthy();
})