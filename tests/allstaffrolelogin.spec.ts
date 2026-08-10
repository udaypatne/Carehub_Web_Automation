import { test, expect } from '../src/fixtures/page'


test.beforeEach(async ({ loginPage }) => {
    await loginPage.navToLoginPage();
})

test('Verify tab visibility for OrgAdmin staff role', async ({ loginPage, dashboardPage, page }) => {
    const menuItems = [
        "Dashboard",
        "Work Queue",
        "Patient List",
        "Health Passport",
        "Care Programs",
        "Onboarding",
        "Population Health",
        "Custom Dashboards",
        "Medication Adherence",
        "AI Guardrails",
        "Rewards Engine",
        "Reward Milestones",
        "Care Team",
        "Integrations",
        "Organization"
    ]
    await loginPage.login(process.env.ORG_ADMIN!, process.env.PASSWORD!)
    await page.waitForURL('/dashboard')
    await loginPage.disableTutorial();
    let actualUrl = await loginPage.getLoginPageUrl();
    await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
    let actualTabs = await dashboardPage.getAllMenuItems();
    await console.log(actualTabs)
    expect(actualTabs).toEqual(menuItems);
});

test('Verify tab visibility for Physician staff role', async ({ loginPage, dashboardPage, page }) => {
    const menuItems = ['Dashboard',
        'Work Queue',
        'Patient List',
        'Health Passport',
        'Care Programs',
        'Onboarding'
    ]
    await loginPage.login(process.env.PHYSICIAN_ROLE!, process.env.PASSWORD!)
    await page.waitForURL('/dashboard')
    await loginPage.disableTutorial();
    let actualUrl = await loginPage.getLoginPageUrl();
    await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
    let actualTabs = await dashboardPage.getAllMenuItems();
    expect(actualTabs).toEqual(menuItems);
});


test('Verify tab visibility for Nurse staff role', async ({ loginPage, dashboardPage, page }) => {
    const menuItems = ['Dashboard',
        'Work Queue',
        'Patient List',
        'Health Passport',
        'Care Programs',
        'Onboarding'
    ]
    await loginPage.login(process.env.NURSE_ROLE!, process.env.PASSWORD!)
    await page.waitForURL('/dashboard')
    await loginPage.disableTutorial();
    let actualUrl = await loginPage.getLoginPageUrl();
    await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
    let actualTabs = await dashboardPage.getAllMenuItems();
    expect(actualTabs).toEqual(menuItems);
});


test('Verify tab visibility for Carecoordinator staff role', async ({ loginPage, dashboardPage, page }) => {
    const menuItems = ['Dashboard',
        'Work Queue',
        'Patient List',
        'Health Passport',
        'Care Programs',
        'Onboarding',
        "Medication Adherence",
        "AI Guardrails",
        "Rewards Engine",
        "Reward Milestones",
    ]
    await loginPage.login(process.env.CARECOORDINATOR_ROLE!, process.env.PASSWORD!)
    await page.waitForURL('/dashboard')
    await loginPage.disableTutorial();
    let actualUrl = await loginPage.getLoginPageUrl();
    await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
    let actualTabs = await dashboardPage.getAllMenuItems();
    expect(actualTabs).toEqual(menuItems);
});

test('Verify tab visibility for Dietician staff role', async ({ loginPage, dashboardPage, page }) => {
    const menuItems = ['Dashboard',
        'Work Queue',
        'Patient List',
        'Health Passport',
        'Care Programs',
        'Onboarding'
    ]
    await loginPage.login(process.env.DIETICIAN_ROLE!, process.env.PASSWORD!)
    await page.waitForURL('/dashboard')
    await loginPage.disableTutorial();
    let actualUrl = await loginPage.getLoginPageUrl();
    await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
    let actualTabs = await dashboardPage.getAllMenuItems();
    expect(actualTabs).toEqual(menuItems);
});

test('Verify tab visibility for Clinical staff role', async ({ loginPage, dashboardPage, page }) => {
    const menuItems = [
        'Dashboard',
        'Work Queue',
        'Patient List',
        'Health Passport',
        'Care Programs',
        'Onboarding'
    ]
    await loginPage.login(process.env.CLINICAL_ROLE!, process.env.PASSWORD!)
    await page.waitForURL('/dashboard')
    await loginPage.disableTutorial();
    let actualUrl = await loginPage.getLoginPageUrl();
    await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
    let actualTabs = await dashboardPage.getAllMenuItems();
    expect(actualTabs).toEqual(menuItems);
});


test('Verify tab visibility for Marketing staff role', async ({ loginPage, dashboardPage, page }) => {
    const menuItems = [
        "Care Programs",
        "Onboarding",
        "Population Health",
        "Custom Dashboards",
        "Medication Adherence",
        "Rewards Engine",
        "Reward Milestones",
    ]
    await loginPage.login(process.env.MARKETING_ROLE!, process.env.PASSWORD!)
    await page.waitForURL('/dashboard/population-health')
    await loginPage.disableTutorial();
    let actualUrl = await loginPage.getLoginPageUrl();
    await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard/population-health");
    let actualTabs = await dashboardPage.getAllMenuItems();
    expect(actualTabs).toEqual(menuItems);
});

test('Verify tab visibility for techAdmin staff role', async ({ loginPage, dashboardPage, page }) => {
    const menuItems = [
        'AI Guardrails',
        'Care Team',
        'Integrations',
        'Organization',
    ]
    await loginPage.login(process.env.TECHADMIN_ROLE!, process.env.PASSWORD!)
    await page.waitForURL('/dashboard/integrations')
    await loginPage.disableTutorial();
    let actualUrl = await loginPage.getLoginPageUrl();
    await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard/integrations");
    let actualTabs = await dashboardPage.getAllMenuItems();
    expect(actualTabs).toEqual(menuItems);
});

test('Verify tab visibility for Custom staff role', async ({ loginPage, dashboardPage, page }) => {
    const menuItems = [
        "Dashboard",
        "Work Queue",
        "Patient List",
        "Health Passport",
        "Care Programs",
        "Onboarding",
        "Population Health",
        "Custom Dashboards",
        "Medication Adherence",
        "AI Guardrails",
        "Rewards Engine",
        "Reward Milestones",
        "Care Team",
        "Integrations",
        "Organization"
    ]
    await loginPage.login(process.env.CUSTOM_ROLE!, process.env.PASSWORD!)
    await page.waitForURL('/dashboard')
    await loginPage.disableTutorial();
    let actualUrl = await loginPage.getLoginPageUrl();
    await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");

    let actualTabs = await dashboardPage.getAllMenuItems();
    await console.log(actualTabs)
    expect(actualTabs).toHaveLength(menuItems.length);
    expect(actualTabs).toEqual(menuItems);

});




