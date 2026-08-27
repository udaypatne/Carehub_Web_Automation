# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: allstaffrolelogin.spec.ts >> Verify tab visibility for Clinical staff role
- Location: tests/allstaffrolelogin.spec.ts:109:5

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
      - generic [ref=e57]:
        - link "Help" [ref=e58] [cursor=pointer]:
          - /url: /dashboard/help
        - generic [ref=e62]:
          - link "My profile" [ref=e63] [cursor=pointer]:
            - /url: /dashboard/profile
            - generic [ref=e64]: UN
            - generic [ref=e65]:
              - generic [ref=e66]: udayclinicalstaff name
              - generic [ref=e67]: roleuserid+clinicalstaff@gmail.com
          - button "Sign out" [ref=e68] [cursor=pointer]
    - main [ref=e72]:
      - generic [ref=e73]:
        - generic [ref=e74]: Fortis Test Hospital
        - button "Guide Me" [ref=e81]
        - generic [ref=e85]:
          - generic [ref=e86]:
            - generic [ref=e87]:
              - heading "Good morning, udayclinicalstaff" [level=1] [ref=e88]
              - paragraph [ref=e89]: Here's what's happening with your patients today
            - button "This Quarter" [ref=e92]
          - generic [ref=e96]:
            - link "Total Patients 3 +3 new" [ref=e97] [cursor=pointer]:
              - /url: /dashboard/patients
              - generic [ref=e98]:
                - generic [ref=e100]:
                  - generic [ref=e101]: Total Patients
                  - button [ref=e102]
                - generic [ref=e111]: "3"
                - generic [ref=e114]: +3 new
            - link "Active Patients (30d) 1 33% of total" [ref=e119] [cursor=pointer]:
              - /url: /dashboard/patients?active=30d
              - generic [ref=e120]:
                - generic [ref=e122]:
                  - generic [ref=e123]: Active Patients (30d)
                  - button [ref=e124]
                - generic [ref=e130]: "1"
                - generic [ref=e133]: 33% of total
            - link "Avg Engagement 1 % -49% Averaged across 3 patients. 1 had activity in the last 30 days; the other 2 count as 0%." [ref=e136] [cursor=pointer]:
              - /url: /dashboard/work-queue/engagement/report
              - generic [ref=e137]:
                - generic [ref=e139]:
                  - generic [ref=e140]: Avg Engagement
                  - button [ref=e141]
                - generic [ref=e148]:
                  - generic [ref=e149]: "1"
                  - generic [ref=e150]: "%"
                - generic [ref=e151]: "-49%"
                - paragraph [ref=e156]: Averaged across 3 patients. 1 had activity in the last 30 days; the other 2 count as 0%.
            - link "Action Items 0" [ref=e157] [cursor=pointer]:
              - /url: /dashboard/work-queue
              - generic [ref=e158]:
                - generic [ref=e160]:
                  - generic [ref=e161]: Action Items
                  - button [ref=e162]
                - generic [ref=e170]: "0"
            - link "New Patients (30d) 3" [ref=e173] [cursor=pointer]:
              - /url: /dashboard/patients
              - generic [ref=e174]:
                - generic [ref=e176]:
                  - generic [ref=e177]: New Patients (30d)
                  - button [ref=e178]
                - generic [ref=e185]: "3"
          - generic [ref=e188]:
            - generic [ref=e189]:
              - generic [ref=e191]:
                - heading "Engagement Metrics" [level=3] [ref=e192]
                - button [ref=e193]
              - generic [ref=e197]:
                - generic "No sub-organizations available for this view" [ref=e198]:
                  - checkbox "Include sub-organizations" [disabled] [ref=e199]
                  - text: Include sub-organizations
                - button "View Report" [ref=e200]
            - generic [ref=e204]:
              - generic [ref=e205]:
                - generic [ref=e206]: DAU
                - paragraph [ref=e211]: 0%
                - paragraph [ref=e212]: 0 of 3 active today
              - generic [ref=e213]:
                - generic [ref=e214]: WAU
                - paragraph [ref=e219]: 0%
                - paragraph [ref=e220]: Avg across 3 of 3 patients, last 7 days
              - generic [ref=e221]:
                - generic [ref=e222]: MAU
                - paragraph [ref=e229]: 1%
                - paragraph [ref=e230]: Avg across 3 of 3 patients, last 30 days
          - generic [ref=e231]:
            - generic [ref=e234]:
              - heading "Patient Engagement Tiers" [level=3] [ref=e235]
              - button [ref=e236]
            - generic [ref=e239]:
              - generic [ref=e240]:
                - generic [ref=e241]:
                  - generic [ref=e242]: Avg Tier
                  - generic [ref=e243]:
                    - generic [ref=e244]: "1"
                    - generic [ref=e245]: (Starter)
                  - generic [ref=e246]: vs last quarter
                - generic [ref=e251]:
                  - generic [ref=e252]: Tier Distribution
                  - generic [ref=e253]:
                    - 'generic "Starter: 99%" [ref=e254]'
                    - 'generic "Building: 0%"'
                    - 'generic "Consistent: 0%"'
                    - 'generic "Dedicated: 0%"'
                    - 'generic "Elite: 0%"'
                  - generic [ref=e255]:
                    - generic [ref=e256]: 99% Starter
                    - generic [ref=e258]: 0% Building
                    - generic [ref=e260]: 0% Consistent
                    - generic [ref=e262]: 0% Dedicated
                    - generic [ref=e264]: 0% Elite
                - generic [ref=e266]:
                  - generic [ref=e267]: Active Streaks (7d+)
                  - button "3 patients" [ref=e268]:
                    - generic [ref=e271]: "3"
                    - generic [ref=e272]: patients
              - paragraph [ref=e273]: Based on 1,639 of 3 patients with engagement history. Tiers reflect all-time activity, not just the last 30 days.
          - generic [ref=e274]:
            - generic [ref=e276]:
              - generic [ref=e279]:
                - heading "Patients Requiring Attention" [level=3] [ref=e280]
                - button [ref=e281]
              - textbox "Search by name or email..." [ref=e288]
            - generic [ref=e290]:
              - generic [ref=e291]:
                - generic [ref=e293]:
                  - heading "Work Queue Summary" [level=3] [ref=e294]
                  - button [ref=e295]
                - link "View All" [ref=e299] [cursor=pointer]:
                  - /url: /dashboard/work-queue
              - generic [ref=e302]:
                - paragraph [ref=e307]: Upcoming Check-ins
                - generic [ref=e308]: "0"
          - generic [ref=e309]:
            - generic [ref=e310]:
              - generic [ref=e312]:
                - generic [ref=e313]:
                  - heading "BMI Distribution" [level=3] [ref=e314]
                  - button [ref=e315]
                - paragraph [ref=e318]: 1 patients
              - generic [ref=e319]:
                - generic [ref=e320]:
                  - img [ref=e322]:
                    - generic [ref=e325]: "1"
                    - generic [ref=e326]: patients
                  - generic [ref=e328]:
                    - generic [ref=e330]: Obesity II
                    - generic [ref=e331]: "1"
                    - generic [ref=e332]: (100%)
                - paragraph [ref=e333]: Above is calculated on available patient data. Data is missing for 2/3.
            - generic [ref=e334]:
              - generic [ref=e335]:
                - generic [ref=e337]:
                  - heading "Recent Lab Tests" [level=3] [ref=e338]
                  - button [ref=e339]
                - link "View All →" [ref=e343] [cursor=pointer]:
                  - /url: /dashboard/lab-tests
              - table [ref=e346]:
                - rowgroup [ref=e347]:
                  - row [ref=e348]:
                    - columnheader "Patient" [ref=e349]
                    - columnheader "Test" [ref=e350]
                    - columnheader "Date" [ref=e351]
                    - columnheader "Status" [ref=e352]
                - rowgroup [ref=e353]:
                  - row [ref=e354]:
                    - cell "No recent lab orders" [ref=e355]
          - generic [ref=e358]:
            - generic [ref=e359]:
              - generic [ref=e360]:
                - generic [ref=e361]:
                  - heading "Voice Campaigns — Results & Re-activation" [level=2] [ref=e362]
                  - paragraph [ref=e363]: Live results from your voice re-engagement campaigns.
                - button "Export" [ref=e364]
              - tablist "Campaign status filter" [ref=e369]:
                - tab "All(0)" [selected] [ref=e370]:
                  - text: All
                  - generic [ref=e371]: (0)
                - tab "Active(0)" [ref=e372]:
                  - text: Active
                  - generic [ref=e373]: (0)
                - tab "Past(0)" [ref=e374]:
                  - text: Past
                  - generic [ref=e375]: (0)
                - tab "Draft(0)" [ref=e376]:
                  - text: Draft
                  - generic [ref=e377]: (0)
            - generic [ref=e378]:
              - generic [ref=e379]:
                - generic [ref=e380]: Campaigns active
                - generic [ref=e381]: "0"
              - generic "Distinct patients across every campaign in the selected window (counted once even if called several times). This is the re-activation denominator." [ref=e382]:
                - generic [ref=e383]: Patients in campaigns
                - generic [ref=e384]: "0"
                - generic [ref=e385]: distinct patients
              - generic [ref=e386]:
                - generic [ref=e387]: Calls placed (30d)
                - generic [ref=e388]: "0"
              - generic [ref=e389]:
                - generic [ref=e390]: Answer rate
                - generic [ref=e391]: 0%
                - generic [ref=e392]: 0/0 calls
              - generic "Distinct patients who opened the app or logged/synced any data within 7 days of a completed call, as a share of distinct patients in campaigns." [ref=e393]:
                - generic [ref=e394]: Re-activated within 7d
                - generic [ref=e395]: 0%
                - generic [ref=e396]: 0/0 patients
              - generic "Operational cost per re-activated patient. Raw Twilio Voice + Conversation Intelligence usage is doubled to cover platform overhead, ops, and patient outreach support." [ref=e397]:
                - generic [ref=e398]: Cost / re-activation
                - generic [ref=e399]: $0.00
            - generic [ref=e400]:
              - generic [ref=e401]:
                - generic [ref=e403]:
                  - heading "Re-activation funnel · last 30 days" [level=3] [ref=e405]
                  - paragraph [ref=e406]: From dialed to logged-in within 7 days post-call.
                - generic [ref=e408]:
                  - generic [ref=e409]:
                    - generic [ref=e410]: Calls placed
                    - generic [ref=e412]: 0/0 calls
                    - generic [ref=e413]: 0.0%
                  - generic [ref=e414]:
                    - generic [ref=e415]: Connected (any)
                    - generic [ref=e417]: 0/0 calls
                    - generic [ref=e418]: 0.0%
                  - generic [ref=e419]:
                    - generic [ref=e420]: Human answered
                    - generic [ref=e422]: 0/0 calls
                    - generic [ref=e423]: 0.0%
                  - generic [ref=e424]:
                    - generic [ref=e425]: Held conversation >15s
                    - generic [ref=e427]: 0/0 calls
                    - generic [ref=e428]: 0.0%
                  - generic [ref=e429]:
                    - generic [ref=e430]: Goal acknowledged
                    - generic [ref=e432]: 0/0 calls
                    - generic [ref=e433]: 0.0%
                  - generic [ref=e434]:
                    - generic [ref=e435]: Re-activated <7d
                    - generic [ref=e437]: 0/0 patients
                    - generic [ref=e438]: 0.0%
              - generic [ref=e439]:
                - generic [ref=e441]:
                  - heading "Conversation sentiment" [level=3] [ref=e443]
                  - paragraph [ref=e444]: AI-powered analysis of call conversations and patient sentiment. Recording consent required.
                - generic [ref=e446]:
                  - generic [ref=e447]: …
                  - generic [ref=e449]: Not enough conversations yet
                  - generic [ref=e450]: Sentiment analysis needs at least 3 completed conversations.
            - generic [ref=e451]:
              - generic [ref=e452]:
                - generic [ref=e454]:
                  - heading "Best time to call · answer rate heatmap" [level=3] [ref=e456]
                  - paragraph [ref=e457]: Patient local time. Use to seed system suggestions for next campaign.
                - generic [ref=e459]:
                  - generic [ref=e460]:
                    - generic [ref=e462]: Mon
                    - generic [ref=e463]: Tue
                    - generic [ref=e464]: Wed
                    - generic [ref=e465]: Thu
                    - generic [ref=e466]: Fri
                    - generic [ref=e467]: Sat
                    - generic [ref=e468]: Sun
                    - generic [ref=e469]: 8am
                    - generic "Monday 8am-11am · 10% answer rate" [ref=e470]
                    - generic "Tuesday 8am-11am · 30% answer rate" [ref=e471]
                    - generic "Wednesday 8am-11am · 10% answer rate" [ref=e472]
                    - generic "Thursday 8am-11am · 30% answer rate" [ref=e473]
                    - generic "Friday 8am-11am · 10% answer rate" [ref=e474]
                    - generic "Saturday 8am-11am · 20% answer rate" [ref=e475]
                    - generic "Sunday 8am-11am · 20% answer rate" [ref=e476]
                    - generic [ref=e477]: 11am
                    - generic "Monday 11am-2pm · 30% answer rate" [ref=e478]
                    - generic "Tuesday 11am-2pm · 55% answer rate" [ref=e479]
                    - generic "Wednesday 11am-2pm · 30% answer rate" [ref=e480]
                    - generic "Thursday 11am-2pm · 55% answer rate" [ref=e481]
                    - generic "Friday 11am-2pm · 30% answer rate" [ref=e482]
                    - generic "Saturday 11am-2pm · 30% answer rate" [ref=e483]
                    - generic "Sunday 11am-2pm · 30% answer rate" [ref=e484]
                    - generic [ref=e485]: 2pm
                    - generic "Monday 2pm-5pm · 55% answer rate" [ref=e486]
                    - generic "Tuesday 2pm-5pm · 72% answer rate" [ref=e487]
                    - generic "Wednesday 2pm-5pm · 55% answer rate" [ref=e488]
                    - generic "Thursday 2pm-5pm · 72% answer rate" [ref=e489]
                    - generic "Friday 2pm-5pm · 55% answer rate" [ref=e490]
                    - generic "Saturday 2pm-5pm · 55% answer rate" [ref=e491]
                    - generic "Sunday 2pm-5pm · 55% answer rate" [ref=e492]
                    - generic [ref=e493]: 5pm
                    - generic "Monday 5pm-8pm · 55% answer rate" [ref=e494]
                    - generic "Tuesday 5pm-8pm · 92% answer rate" [ref=e495]
                    - generic "Wednesday 5pm-8pm · 72% answer rate" [ref=e496]
                    - generic "Thursday 5pm-8pm · 92% answer rate" [ref=e497]
                    - generic "Friday 5pm-8pm · 72% answer rate" [ref=e498]
                    - generic "Saturday 5pm-8pm · 55% answer rate" [ref=e499]
                    - generic "Sunday 5pm-8pm · 30% answer rate" [ref=e500]
                    - generic [ref=e501]: 8pm
                    - generic "Monday 8pm-11pm · 30% answer rate" [ref=e502]
                    - generic "Tuesday 8pm-11pm · 55% answer rate" [ref=e503]
                    - generic "Wednesday 8pm-11pm · 30% answer rate" [ref=e504]
                    - generic "Thursday 8pm-11pm · 55% answer rate" [ref=e505]
                    - generic "Friday 8pm-11pm · 30% answer rate" [ref=e506]
                    - generic "Saturday 8pm-11pm · 30% answer rate" [ref=e507]
                    - generic "Sunday 8pm-11pm · 10% answer rate" [ref=e508]
                  - generic [ref=e509]:
                    - generic [ref=e510]: Lower
                    - generic [ref=e517]: Higher answer rate
                    - generic [ref=e518]: "★ Peak: Tuesday 5pm-8pm"
              - generic [ref=e519]:
                - generic [ref=e521]:
                  - heading "Voice persona A/B test" [level=3] [ref=e523]
                  - paragraph [ref=e524]: "Cohort: patients inactive 14+ days. Outcome: re-activation within 7 days of the call."
                - generic [ref=e526]:
                  - table [ref=e528]:
                    - rowgroup [ref=e529]:
                      - row [ref=e530]:
                        - columnheader "Persona" [ref=e531]
                        - columnheader "Calls" [ref=e532]
                        - columnheader "Answer" [ref=e533]
                        - columnheader "Avg duration" [ref=e534]
                        - columnheader "Re-activated within 7d of call" [ref=e535]
                        - columnheader "Re-activated (A/B)" [ref=e536]
                        - columnheader "Positive sentiment" [ref=e537]
                    - rowgroup [ref=e538]:
                      - row [ref=e539] [cursor=pointer]:
                        - cell "Sam" [ref=e540]
                        - cell "233" [ref=e541]
                        - cell "0.4%" [ref=e542]
                        - cell "0m 12s" [ref=e543]
                        - cell "0.0%" [ref=e544]
                        - cell "— no A/B" [ref=e545]
                        - cell "0%" [ref=e546]
                  - generic [ref=e550]:
                    - text: Click any persona row to see the patient-level call list for that arm. A persona is flagged as the winner (★) when its
                    - strong [ref=e551]: A/B
                    - text: re-activation rate is highest among arms with at least 10 randomised calls — so the star need not sit on the highest "Re-activated within 7d", which counts every call on the arm including ones never in an experiment.
                    - strong [ref=e552]: No winner in this window
                    - text: — no arm has 10+ randomised calls, so there is no experiment to decide between them.
            - generic [ref=e553]:
              - generic [ref=e554]:
                - generic [ref=e555]:
                  - heading "Campaigns · last 30 days" [level=3] [ref=e557]
                  - paragraph [ref=e558]: Click any row to drill into transcripts, AMD detail, drop-off reasons, per-patient outcomes. · Updated 3:01 AM
                - generic [ref=e559]:
                  - button "Export CSV" [disabled] [ref=e560]
                  - button "New campaign" [ref=e564]
              - generic [ref=e568]:
                - paragraph [ref=e572]: No campaigns in the last 30 days.
                - button "Create your first campaign" [ref=e573]
            - generic [ref=e576]:
              - generic [ref=e577]: Date range
              - combobox "Date range for compliance, cost, and drop-off panels" [ref=e578]:
                - option "Last 7 days"
                - option "Last 14 days"
                - option "Last 30 days" [selected]
                - option "Last 60 days"
                - option "Last 90 days"
            - generic [ref=e579]:
              - generic [ref=e580]:
                - heading "Compliance audit · 30d" [level=3] [ref=e584]
                - generic [ref=e586]:
                  - generic [ref=e587]:
                    - generic [ref=e588]: TCPA quiet-hours respected
                    - generic [ref=e589]: 100% (0/0)
                  - generic [ref=e590]:
                    - generic [ref=e591]: National DNC scrub
                    - generic [ref=e592]: 0 numbers blocked
                  - generic [ref=e593]:
                    - generic [ref=e594]: State DNC (TX, FL, CA)
                    - generic [ref=e595]: 0 numbers blocked
                  - generic [ref=e596]:
                    - generic [ref=e597]: Recording consent obtained
                    - generic [ref=e598]: 100% (0/0)
                  - generic [ref=e599]:
                    - generic [ref=e600]: Mid-call opt-outs honored
                    - generic [ref=e601]: 0/0
                  - generic [ref=e602]:
                    - generic [ref=e603]: Hospice / bereavement skipped
                    - generic [ref=e604]: 0 patients
              - generic [ref=e605]:
                - heading "Cost breakdown · 30d" [level=3] [ref=e609]
                - generic [ref=e611]:
                  - generic [ref=e612]:
                    - generic [ref=e613]: Cost
                    - generic [ref=e614]: $0.00
                  - generic [ref=e615]:
                    - generic [ref=e616]: Cost per re-activation
                    - generic [ref=e617]: $0.00
                  - generic [ref=e618]: vs $7.20 push, $3.40 SMS, $11.20 manual coach call
              - heading "Drop-off reasons · 30d" [level=3] [ref=e623]
        - generic [ref=e625]:
          - generic [ref=e626]: © 2026 XSpan AI. All rights reserved.
          - generic [ref=e627]: Version 1.24.5
```

# Test source

```ts
  24  |         "Organization"
  25  |     ]
  26  |     await loginPage.login(process.env.ORG_ADMIN!, process.env.PASSWORD!)
  27  |     await page.waitForURL('/dashboard')
  28  |     await loginPage.disableTutorial();
  29  |     let actualUrl = await loginPage.getLoginPageUrl();
  30  |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
  31  |     let actualTabs = await dashboardPage.getAllMenuItems();
  32  |     expect(actualTabs).toEqual(menuItems);
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
> 124 |     expect(actualTabs).toEqual(menuItems);
      |                        ^ Error: expect(received).toEqual(expected) // deep equality
  125 | });
  126 | 
  127 | 
  128 | test('Verify tab visibility for Marketing staff role', async ({ loginPage, dashboardPage, page }) => {
  129 |     const menuItems = [
  130 |         "Care Programs",
  131 |         "Onboarding",
  132 |         "Population Health",
  133 |         "Custom Dashboards",
  134 |         "Medication Adherence",
  135 |         "Rewards Engine",
  136 |         "Reward Milestones",
  137 |     ]
  138 |     await loginPage.login(process.env.MARKETING_ROLE!, process.env.PASSWORD!)
  139 |     await page.waitForURL('/dashboard/population-health')
  140 |     await loginPage.disableTutorial();
  141 |     let actualUrl = await loginPage.getLoginPageUrl();
  142 |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard/population-health");
  143 |     let actualTabs = await dashboardPage.getAllMenuItems();
  144 |     expect(actualTabs).toEqual(menuItems);
  145 | });
  146 | 
  147 | test('Verify tab visibility for techAdmin staff role', async ({ loginPage, dashboardPage, page }) => {
  148 |     const menuItems = [
  149 |         'AI Guardrails',
  150 |         'Care Team',
  151 |         'Integrations',
  152 |         'Organization',
  153 |     ]
  154 |     await loginPage.login(process.env.TECHADMIN_ROLE!, process.env.PASSWORD!)
  155 |     await page.waitForURL('/dashboard/integrations')
  156 |     await loginPage.disableTutorial();
  157 |     let actualUrl = await loginPage.getLoginPageUrl();
  158 |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard/integrations");
  159 |     let actualTabs = await dashboardPage.getAllMenuItems();
  160 |     expect(actualTabs).toEqual(menuItems);
  161 | });
  162 | 
  163 | test('Verify tab visibility for Custom staff role', async ({ loginPage, dashboardPage, page }) => {
  164 |     const menuItems = [
  165 |         "Dashboard",
  166 |         "Work Queue",
  167 |         "Patient List",
  168 |         "Health Passport",
  169 |         "Care Programs",
  170 |         "Onboarding",
  171 |         "Population Health",
  172 |         "Custom Dashboards",
  173 |         "Medication Adherence",
  174 |         "AI Guardrails",
  175 |         "Rewards Engine",
  176 |         "Reward Milestones",
  177 |         "Care Team",
  178 |         "Integrations",
  179 |         "Organization"
  180 |     ]
  181 |     await loginPage.login(process.env.CUSTOM_ROLE!, process.env.PASSWORD!)
  182 |     await page.waitForURL('/dashboard')
  183 |     await loginPage.disableTutorial();
  184 |     let actualUrl = await loginPage.getLoginPageUrl();
  185 |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
  186 | 
  187 |     let actualTabs = await dashboardPage.getAllMenuItems();
  188 |     await console.log(actualTabs)
  189 |     expect(actualTabs).toHaveLength(menuItems.length);
  190 |     expect(actualTabs).toEqual(menuItems);
  191 | 
  192 | });
  193 | 
  194 | 
  195 | 
  196 | 
  197 | 
```