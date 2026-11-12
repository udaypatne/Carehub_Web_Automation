import { test, expect } from '../src/fixtures/page'
import { authFile, openSignedIn } from '../src/utils/authState'

// Starts signed in as ORG_ADMIN (session saved by tests/auth.setup.ts).
test.use({ storageState: authFile('ORG_ADMIN') });

test.beforeEach(async ({ page, loginPage }) => {
    await openSignedIn(page);
    await loginPage.disableTutorial();
})

test('verify create Program is visible', async ({ page, careProgramPage }) => {
    await careProgramPage.selectTab('Care Programs');
    await page.waitForLoadState('networkidle');
    console.log(await careProgramPage.expectedUrlPath());
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