import { test, expect } from '../src/fixtures/page'

test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.navToLoginPage();
    await loginPage.login(process.env.ORG_ADMIN!, process.env.PASSWORD!)
    await page.waitForURL('/dashboard')
    await loginPage.disableTutorial();
});


test('loginPage', async ({ loginPage, page }) => {
    let actualUrl = await loginPage.getLoginPageUrl();
    expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
    expect(page).toHaveURL('/dashboard');
    await expect(page).toHaveURL('https://provider-qa.xspan.ai/dashboard');
});




test('NavigateOnWorkqueue', async ({ loginPage, page }) => {
    await page.waitForURL('/dashboard')
    await loginPage.goToUrl('/dashboard/work-queue/alerts')
    await page.waitForURL('/dashboard/work-queue/alerts');
    await loginPage.disableTutorial();
    let actualUrl = await loginPage.getLoginPageUrl();
    expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard/work-queue/alerts");
    await expect(page).toHaveURL("https://provider-qa.xspan.ai/dashboard/work-queue/alerts");
});


