import { test, expect } from '../src/fixtures/page'



test.beforeEach(async ({ page ,loginPage}) => {
    await loginPage.navToLoginPage();
    loginPage.login(process.env.ORGADMIN!, process.env.PASSWORD!);
    await page.waitForURL('/dashboard')
    await loginPage.disableTutorial();
})

test('verify create Program is visible', async ({ page,careProgramPage }) => {
    await careProgramPage.selectTab('Care Programs');
    await page.waitForLoadState('networkidle');
    await careProgramPage.expectedUrlPath();
    let createProgramBtn = await careProgramPage.careProgramBtns('Create Program');
    await expect(createProgramBtn, 'Create program button is not  be visible').toBeTruthy();

})

test('verify import Program is not visible', async ({ page, careProgramPage }) => {
    await careProgramPage.selectTab('Care Programs');
    await page.waitForLoadState('networkidle');
    let importProgramBtn = await careProgramPage.careProgramBtns('Import Program');
    await expect(importProgramBtn, 'Import program button is visible').toBeFalsy();
})