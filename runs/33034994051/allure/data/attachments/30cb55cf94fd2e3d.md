# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: allstaffrolelogin.spec.ts >> Verify tab visibility for OrgAdmin staff role
- Location: tests/allstaffrolelogin.spec.ts:8:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

@@ -1,7 +1,8 @@
  Array [
    "Dashboard",
+   "AI Voice Dashboard",
    "Work Queue",
    "Patient List",
    "Health Passport",
    "Care Programs",
    "Onboarding",
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
          - link "AI Voice Dashboard" [ref=e26] [cursor=pointer]:
            - /url: /dashboard/ai-voice-dashboard
          - link "Work Queue" [ref=e29] [cursor=pointer]:
            - /url: /dashboard/work-queue
          - link "Patient List" [ref=e35] [cursor=pointer]:
            - /url: /dashboard/patients
          - link "Health Passport" [ref=e42] [cursor=pointer]:
            - /url: /dashboard/reporting
          - link "Care Programs" [ref=e46] [cursor=pointer]:
            - /url: /dashboard/programs
          - link "Onboarding" [ref=e51] [cursor=pointer]:
            - /url: /dashboard/onboarding
          - link "Population Health" [ref=e56] [cursor=pointer]:
            - /url: /dashboard/population-health
          - link "Custom Dashboards" [ref=e60] [cursor=pointer]:
            - /url: /dashboard/custom-dashboards
          - link "Medication Adherence" [ref=e65] [cursor=pointer]:
            - /url: /dashboard/adherence
          - link "AI Guardrails 62" [ref=e70] [cursor=pointer]:
            - /url: /dashboard/ai-review
            - generic [ref=e74]: AI Guardrails
            - generic [ref=e75]: "62"
          - link "Rewards Engine" [ref=e76] [cursor=pointer]:
            - /url: /dashboard/motivation
          - link "Reward Milestones" [ref=e84] [cursor=pointer]:
            - /url: /dashboard/admin/rewards/milestones
          - link "Care Team" [ref=e90] [cursor=pointer]:
            - /url: /dashboard/providers
          - link "Integrations" [ref=e96] [cursor=pointer]:
            - /url: /dashboard/integrations
          - link "Organization" [ref=e100] [cursor=pointer]:
            - /url: /dashboard/settings/organizations
      - generic [ref=e107]:
        - link "Help" [ref=e108] [cursor=pointer]:
          - /url: /dashboard/help
        - link "Settings" [ref=e112] [cursor=pointer]:
          - /url: /dashboard/settings
        - link "Sam Voice Platform" [ref=e117] [cursor=pointer]:
          - /url: /dashboard/sam-voice
        - generic [ref=e123]:
          - link "My profile" [ref=e124] [cursor=pointer]:
            - /url: /dashboard/profile
            - generic [ref=e125]: UN
            - generic [ref=e126]:
              - generic [ref=e127]: udayorgadmin name
              - generic [ref=e128]: roleuserid+orgadmin@gmail.com
          - button "Sign out" [ref=e129] [cursor=pointer]
    - main [ref=e133]:
      - generic [ref=e134]:
        - generic [ref=e135]:
          - generic [ref=e136]: Organization
          - button "Organization" [ref=e137]:
            - generic [ref=e138]: Fortis Test Hospital
        - button "Guide Me" [ref=e143]
        - generic [ref=e147]:
          - generic [ref=e148]:
            - generic [ref=e149]:
              - heading "Good morning, udayorgadmin" [level=1] [ref=e150]
              - paragraph [ref=e151]: Here's what's happening with your patients today
            - button "This Quarter" [ref=e154]
          - generic [ref=e158]:
            - link "Total Patients 5233 +5225 new" [ref=e159] [cursor=pointer]:
              - /url: /dashboard/patients
              - generic [ref=e160]:
                - generic [ref=e162]:
                  - generic [ref=e163]: Total Patients
                  - button [ref=e164]
                - generic [ref=e173]: "5233"
                - generic [ref=e176]: +5225 new
            - link "Active Patients (30d) 5126 98% of total" [ref=e181] [cursor=pointer]:
              - /url: /dashboard/patients?active=30d
              - generic [ref=e182]:
                - generic [ref=e184]:
                  - generic [ref=e185]: Active Patients (30d)
                  - button [ref=e186]
                - generic [ref=e192]: "5126"
                - generic [ref=e195]: 98% of total
            - link "Avg Engagement 25 % -25% Averaged across 5220 patients. 5126 had activity in the last 30 days; the other 94 count as 0%. 13 not counted — joined today or no join date on record." [ref=e198] [cursor=pointer]:
              - /url: /dashboard/work-queue/engagement/report
              - generic [ref=e199]:
                - generic [ref=e201]:
                  - generic [ref=e202]: Avg Engagement
                  - button [ref=e203]
                - generic [ref=e210]:
                  - generic [ref=e211]: "25"
                  - generic [ref=e212]: "%"
                - generic [ref=e213]: "-25%"
                - paragraph [ref=e218]: Averaged across 5220 patients. 5126 had activity in the last 30 days; the other 94 count as 0%. 13 not counted — joined today or no join date on record.
            - link "Action Items 52" [ref=e219] [cursor=pointer]:
              - /url: /dashboard/work-queue
              - generic [ref=e220]:
                - generic [ref=e222]:
                  - generic [ref=e223]: Action Items
                  - button [ref=e224]
                - generic [ref=e232]: "52"
            - link "New Patients (30d) 5225" [ref=e235] [cursor=pointer]:
              - /url: /dashboard/patients
              - generic [ref=e236]:
                - generic [ref=e238]:
                  - generic [ref=e239]: New Patients (30d)
                  - button [ref=e240]
                - generic [ref=e247]: "5225"
          - generic [ref=e250]:
            - generic [ref=e251]:
              - generic [ref=e253]:
                - heading "Engagement Metrics" [level=3] [ref=e254]
                - button [ref=e255]
              - generic [ref=e259]:
                - generic [ref=e260] [cursor=pointer]:
                  - checkbox "Include sub-organizations" [ref=e261]
                  - text: Include sub-organizations
                - button "Export Report" [ref=e262]
                - button "View Report" [ref=e266]
            - generic [ref=e270]:
              - generic [ref=e271]:
                - generic [ref=e272]: DAU
                - paragraph [ref=e277]: 0.1%
                - paragraph [ref=e278]: 4 of 3654 active today
              - generic [ref=e279]:
                - generic [ref=e280]: WAU
                - paragraph [ref=e285]: 22.9%
                - paragraph [ref=e286]: Avg across 3654 of 3654 patients, last 7 days
              - generic [ref=e287]:
                - generic [ref=e288]: MAU
                - paragraph [ref=e295]: 30.3%
                - paragraph [ref=e296]: Avg across 3654 of 3654 patients, last 30 days
          - generic [ref=e297]:
            - generic [ref=e300]:
              - heading "Patient Engagement Tiers" [level=3] [ref=e301]
              - button [ref=e302]
            - generic [ref=e305]:
              - generic [ref=e306]:
                - generic [ref=e307]:
                  - generic [ref=e308]: Avg Tier
                  - generic [ref=e309]:
                    - generic [ref=e310]: "1"
                    - generic [ref=e311]: (Starter)
                  - generic [ref=e312]: vs last quarter
                - generic [ref=e317]:
                  - generic [ref=e318]: Tier Distribution
                  - generic [ref=e319]:
                    - 'generic "Starter: 99%" [ref=e320]'
                    - 'generic "Building: 0%"'
                    - 'generic "Consistent: 0%"'
                    - 'generic "Dedicated: 0%"'
                    - 'generic "Elite: 0%"'
                  - generic [ref=e321]:
                    - generic [ref=e322]: 99% Starter
                    - generic [ref=e324]: 0% Building
                    - generic [ref=e326]: 0% Consistent
                    - generic [ref=e328]: 0% Dedicated
                    - generic [ref=e330]: 0% Elite
                - generic [ref=e332]:
                  - generic [ref=e333]: Active Streaks (7d+)
                  - button "3 patients" [ref=e334]:
                    - generic [ref=e337]: "3"
                    - generic [ref=e338]: patients
              - paragraph [ref=e339]: Based on 1,639 of 5,233 patients with engagement history. Tiers reflect all-time activity, not just the last 30 days.
          - generic [ref=e340]:
            - generic [ref=e342]:
              - generic [ref=e345]:
                - heading "Patients Requiring Attention" [level=3] [ref=e346]
                - button [ref=e347]
              - generic [ref=e351]:
                - textbox "Search by name or email..." [ref=e354]
                - button "Low Engagement 3638" [ref=e356] [cursor=pointer]:
                  - generic [ref=e357]: Low Engagement
                  - generic [ref=e361]: "3638"
                - button "Increasing BMI 11" [ref=e366] [cursor=pointer]:
                  - generic [ref=e367]: Increasing BMI
                  - generic [ref=e372]: "11"
                - button "New Patients 3541" [ref=e377] [cursor=pointer]:
                  - generic [ref=e378]: New Patients
                  - generic [ref=e383]: "3541"
                - button "Patients with Updates 1" [ref=e388] [cursor=pointer]:
                  - generic [ref=e389]: Patients with Updates
                  - generic [ref=e394]: "1"
                - button "Static BMI 53" [ref=e399] [cursor=pointer]:
                  - generic [ref=e400]: Static BMI
                  - generic [ref=e403]: "53"
            - generic [ref=e408]:
              - generic [ref=e409]:
                - generic [ref=e411]:
                  - heading "Work Queue Summary" [level=3] [ref=e412]
                  - button [ref=e413]
                - link "View All" [ref=e417] [cursor=pointer]:
                  - /url: /dashboard/work-queue
              - generic [ref=e420]:
                - paragraph [ref=e425]: Upcoming Check-ins
                - generic [ref=e426]: "0"
          - generic [ref=e427]:
            - generic [ref=e428]:
              - generic [ref=e430]:
                - generic [ref=e431]:
                  - heading "BMI Distribution" [level=3] [ref=e432]
                  - button [ref=e433]
                - paragraph [ref=e436]: 49 patients
              - generic [ref=e437]:
                - generic [ref=e438]:
                  - img [ref=e440]:
                    - generic [ref=e446]: "49"
                    - generic [ref=e447]: patients
                  - generic [ref=e448]:
                    - generic [ref=e449]:
                      - generic [ref=e451]: Obesity II
                      - generic [ref=e452]: "4"
                      - generic [ref=e453]: (8%)
                    - generic [ref=e454]:
                      - generic [ref=e456]: Obesity I
                      - generic [ref=e457]: "6"
                      - generic [ref=e458]: (12%)
                    - generic [ref=e459]:
                      - generic [ref=e461]: Overweight
                      - generic [ref=e462]: "9"
                      - generic [ref=e463]: (18%)
                    - generic [ref=e464]:
                      - generic [ref=e466]: Normal
                      - generic [ref=e467]: "30"
                      - generic [ref=e468]: (61%)
                - paragraph [ref=e469]: Above is calculated on available patient data. Data is missing for 5184/5233.
            - generic [ref=e470]:
              - generic [ref=e471]:
                - generic [ref=e473]:
                  - heading "Recent Lab Tests" [level=3] [ref=e474]
                  - button [ref=e475]
                - link "View All →" [ref=e479] [cursor=pointer]:
                  - /url: /dashboard/lab-tests
              - table [ref=e482]:
                - rowgroup [ref=e483]:
                  - row [ref=e484]:
                    - columnheader "Patient" [ref=e485]
                    - columnheader "Test" [ref=e486]
                    - columnheader "Date" [ref=e487]
                    - columnheader "Status" [ref=e488]
                - rowgroup [ref=e489]:
                  - row [ref=e490]:
                    - cell "No recent lab orders" [ref=e491]
        - generic [ref=e497]:
          - generic [ref=e498]: © 2026 XSpan AI. All rights reserved.
          - generic [ref=e499]: Version 1.24.5
```

# Test source

```ts
  1   | import { test, expect } from '../src/fixtures/page'
  2   | 
  3   | 
  4   | test.beforeEach(async ({ loginPage }) => {
  5   |     await loginPage.navToLoginPage();
  6   | })
  7   | 
  8   | test('Verify tab visibility for OrgAdmin staff role', async ({ loginPage, dashboardPage, page }) => {
  9   |     const menuItems = [
  10  |         "Dashboard",
  11  |         "Work Queue",
  12  |         "Patient List",
  13  |         "Health Passport",
  14  |         "Care Programs",
  15  |         "Onboarding",
  16  |         "Population Health",
  17  |         "Custom Dashboards",
  18  |         "Medication Adherence",
  19  |         "AI Guardrails",
  20  |         "Rewards Engine",
  21  |         "Reward Milestones",
  22  |         "Care Team",
  23  |         "Integrations",
  24  |         "Organization"
  25  |     ]
  26  |     await loginPage.login(process.env.ORG_ADMIN!, process.env.PASSWORD!)
  27  |     await page.waitForURL('/dashboard')
  28  |     await loginPage.disableTutorial();
  29  |     let actualUrl = await loginPage.getLoginPageUrl();
  30  |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
  31  |     let actualTabs = await dashboardPage.getAllMenuItems();
> 32  |     expect(actualTabs).toEqual(menuItems);
      |                        ^ Error: expect(received).toEqual(expected) // deep equality
  33  | });
  34  | 
  35  | test('Verify tab visibility for Physician staff role', async ({ loginPage, dashboardPage, page }) => {
  36  |     const menuItems = ['Dashboard',
  37  |         'Work Queue',
  38  |         'Patient List',
  39  |         'Health Passport',
  40  |         'Care Programs',
  41  |         'Onboarding'
  42  |     ]
  43  |     await loginPage.login(process.env.PHYSICIAN_ROLE!, process.env.PASSWORD!)
  44  |     await page.waitForURL('/dashboard')
  45  |     await loginPage.disableTutorial();
  46  |     let actualUrl = await loginPage.getLoginPageUrl();
  47  |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
  48  |     let actualTabs = await dashboardPage.getAllMenuItems();
  49  |     expect(actualTabs).toEqual(menuItems);
  50  | });
  51  | 
  52  | 
  53  | test('Verify tab visibility for Nurse staff role', async ({ loginPage, dashboardPage, page }) => {
  54  |     const menuItems = ['Dashboard',
  55  |         'Work Queue',
  56  |         'Patient List',
  57  |         'Health Passport',
  58  |         'Care Programs',
  59  |         'Onboarding'
  60  |     ]
  61  |     await loginPage.login(process.env.NURSE_ROLE!, process.env.PASSWORD!)
  62  |     await page.waitForURL('/dashboard')
  63  |     await loginPage.disableTutorial();
  64  |     let actualUrl = await loginPage.getLoginPageUrl();
  65  |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
  66  |     let actualTabs = await dashboardPage.getAllMenuItems();
  67  |     expect(actualTabs).toEqual(menuItems);
  68  | });
  69  | 
  70  | 
  71  | test('Verify tab visibility for Carecoordinator staff role', async ({ loginPage, dashboardPage, page }) => {
  72  |     const menuItems = ['Dashboard',
  73  |         'Work Queue',
  74  |         'Patient List',
  75  |         'Health Passport',
  76  |         'Care Programs',
  77  |         'Onboarding',
  78  |         "Medication Adherence",
  79  |         "AI Guardrails",
  80  |         "Rewards Engine",
  81  |         "Reward Milestones",
  82  |     ]
  83  |     await loginPage.login(process.env.CARECOORDINATOR_ROLE!, process.env.PASSWORD!)
  84  |     await page.waitForURL('/dashboard')
  85  |     await loginPage.disableTutorial();
  86  |     let actualUrl = await loginPage.getLoginPageUrl();
  87  |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
  88  |     let actualTabs = await dashboardPage.getAllMenuItems();
  89  |     expect(actualTabs).toEqual(menuItems);
  90  | });
  91  | 
  92  | test('Verify tab visibility for Dietician staff role', async ({ loginPage, dashboardPage, page }) => {
  93  |     const menuItems = ['Dashboard',
  94  |         'Work Queue',
  95  |         'Patient List',
  96  |         'Health Passport',
  97  |         'Care Programs',
  98  |         'Onboarding'
  99  |     ]
  100 |     await loginPage.login(process.env.DIETICIAN_ROLE!, process.env.PASSWORD!)
  101 |     await page.waitForURL('/dashboard')
  102 |     await loginPage.disableTutorial();
  103 |     let actualUrl = await loginPage.getLoginPageUrl();
  104 |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
  105 |     let actualTabs = await dashboardPage.getAllMenuItems();
  106 |     expect(actualTabs).toEqual(menuItems);
  107 | });
  108 | 
  109 | test('Verify tab visibility for Clinical staff role', async ({ loginPage, dashboardPage, page }) => {
  110 |     const menuItems = [
  111 |         'Dashboard',
  112 |         'Work Queue',
  113 |         'Patient List',
  114 |         'Health Passport',
  115 |         'Care Programs',
  116 |         'Onboarding'
  117 |     ]
  118 |     await loginPage.login(process.env.CLINICAL_ROLE!, process.env.PASSWORD!)
  119 |     await page.waitForURL('/dashboard')
  120 |     await loginPage.disableTutorial();
  121 |     let actualUrl = await loginPage.getLoginPageUrl();
  122 |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
  123 |     let actualTabs = await dashboardPage.getAllMenuItems();
  124 |     expect(actualTabs).toEqual(menuItems);
  125 | });
  126 | 
  127 | 
  128 | test('Verify tab visibility for Marketing staff role', async ({ loginPage, dashboardPage, page }) => {
  129 |     const menuItems = [
  130 |         "Care Programs",
  131 |         "Onboarding",
  132 |         "Population Health",
```