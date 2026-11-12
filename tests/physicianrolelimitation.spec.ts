import { test, expect } from '../src/fixtures/page'
import { authFile, openSignedIn } from '../src/utils/authState'

// Starts signed in as PHYSICIAN_ROLE (session saved by tests/auth.setup.ts).
test.use({ storageState: authFile('PHYSICIAN_ROLE') });

test.beforeEach(async ({loginPage, page }) => {
    await openSignedIn(page);
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