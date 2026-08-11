# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: orgadmin.spec.ts >> verify create Program is visible
- Location: tests/orgadmin.spec.ts:12:5

# Error details

```
Error: Create program button is not  be visible

expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - region "Notifications alt+T"
  - generic [ref=e2]:
    - complementary [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - generic [ref=e6]:
            - img "XSpan Logo" [ref=e7]
            - generic [ref=e8]:
              - generic [ref=e9]: XSpan
              - generic [ref=e10]: The Physics of Biology
          - button "Toggle sidebar" [ref=e11] [cursor=pointer]
        - textbox "Search patients..." [ref=e16]
        - navigation [ref=e17]:
          - link "Dashboard" [ref=e18] [cursor=pointer]:
            - /url: /dashboard
          - link "Work Queue" [ref=e25] [cursor=pointer]:
            - /url: /dashboard/work-queue
          - link "Patient List" [ref=e31] [cursor=pointer]:
            - /url: /dashboard/patients
          - link "Health Passport" [ref=e38] [cursor=pointer]:
            - /url: /dashboard/reporting
          - link "Care Programs" [active] [ref=e42] [cursor=pointer]:
            - /url: /dashboard/programs
          - link "Onboarding" [ref=e48] [cursor=pointer]:
            - /url: /dashboard/onboarding
          - link "Population Health" [ref=e53] [cursor=pointer]:
            - /url: /dashboard/population-health
          - link "Custom Dashboards" [ref=e57] [cursor=pointer]:
            - /url: /dashboard/custom-dashboards
          - link "Medication Adherence" [ref=e62] [cursor=pointer]:
            - /url: /dashboard/adherence
          - link "AI Guardrails 56" [ref=e67] [cursor=pointer]:
            - /url: /dashboard/ai-review
            - generic [ref=e71]: AI Guardrails
            - generic [ref=e72]: "56"
          - link "Rewards Engine" [ref=e73] [cursor=pointer]:
            - /url: /dashboard/motivation
          - link "Reward Milestones" [ref=e81] [cursor=pointer]:
            - /url: /dashboard/admin/rewards/milestones
          - link "Care Team" [ref=e87] [cursor=pointer]:
            - /url: /dashboard/providers
          - link "Integrations" [ref=e93] [cursor=pointer]:
            - /url: /dashboard/integrations
          - link "Organization" [ref=e97] [cursor=pointer]:
            - /url: /dashboard/settings/organizations
      - generic [ref=e104]:
        - link "Help" [ref=e105] [cursor=pointer]:
          - /url: /dashboard/help
        - link "Settings" [ref=e109] [cursor=pointer]:
          - /url: /dashboard/settings
        - link "Sam Voice Platform" [ref=e114] [cursor=pointer]:
          - /url: /dashboard/sam-voice
        - generic [ref=e120]:
          - link "My profile" [ref=e121] [cursor=pointer]:
            - /url: /dashboard/profile
            - generic [ref=e122]: UN
            - generic [ref=e123]:
              - generic [ref=e124]: udayorgadmin name
              - generic [ref=e125]: roleuserid+orgadmin@gmail.com
          - button "Sign out" [ref=e126] [cursor=pointer]
    - main [ref=e130]:
      - generic [ref=e131]:
        - generic [ref=e132]:
          - generic [ref=e133]: Organization
          - button "Organization" [ref=e134]:
            - generic [ref=e135]: Fortis Test Hospital
        - button "Guide Me" [ref=e140]
        - generic [ref=e171]:
          - generic [ref=e172]: © 2026 XSpan AI. All rights reserved.
          - generic [ref=e173]: Version 1.24.5
```

# Test source

```ts
  1  | import { test, expect } from '../src/fixtures/page'
  2  | 
  3  | 
  4  | 
  5  | test.beforeEach(async ({ page, loginPage }) => {
  6  |     await loginPage.navToLoginPage();
  7  |     loginPage.login(process.env.ORG_ADMIN!, process.env.PASSWORD!);
  8  |     await page.waitForURL('/dashboard')
  9  |     await loginPage.disableTutorial();
  10 | })
  11 | 
  12 | test('verify create Program is visible', async ({ page, careProgramPage }) => {
  13 |     await careProgramPage.selectTab('Care Programs');
  14 |     await page.waitForLoadState('networkidle');
  15 |     console.log(await careProgramPage.expectedUrlPath());
  16 |     await careProgramPage.expectedUrlPath();
  17 |     let createProgramBtn = await careProgramPage.careProgramBtns('Create Program');
> 18 |     await expect(createProgramBtn, 'Create program button is not  be visible').toBeTruthy();
     |                                                                                ^ Error: Create program button is not  be visible
  19 | 
  20 | })
  21 | 
  22 | test('verify import Program is not visible', async ({ page, careProgramPage }) => {
  23 |     await careProgramPage.selectTab('Care Programs');
  24 |     await page.waitForLoadState('networkidle');
  25 |     let importProgramBtn = await careProgramPage.careProgramBtns('Import Program');
  26 |     await expect(importProgramBtn, 'Import program button is visible').toBeFalsy();
  27 | })
```