# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: allstaffrolelogin.spec.ts >> Verify tab visibility for Marketing staff role
- Location: tests/allstaffrolelogin.spec.ts:134:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "https://provider-qa.xspan.ai/dashboard/population-health"
Received: "https://provider-qa.xspan.ai/dashboard/population-health/provider"
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
        - navigation [ref=e15]:
          - link "Care Programs" [ref=e16] [cursor=pointer]:
            - /url: /dashboard/programs
          - link "Onboarding" [ref=e21] [cursor=pointer]:
            - /url: /dashboard/onboarding
          - link "Population Health" [ref=e26] [cursor=pointer]:
            - /url: /dashboard/population-health
          - link "Custom Dashboards" [ref=e31] [cursor=pointer]:
            - /url: /dashboard/custom-dashboards
          - link "Medication Adherence" [ref=e36] [cursor=pointer]:
            - /url: /dashboard/adherence
          - link "Rewards Engine" [ref=e41] [cursor=pointer]:
            - /url: /dashboard/motivation
          - link "Reward Milestones" [ref=e49] [cursor=pointer]:
            - /url: /dashboard/admin/rewards/milestones
      - generic [ref=e56]:
        - link "Help" [ref=e57] [cursor=pointer]:
          - /url: /dashboard/help
        - generic [ref=e61]:
          - link "My profile" [ref=e62] [cursor=pointer]:
            - /url: /dashboard/profile
            - generic [ref=e63]: UN
            - generic [ref=e64]:
              - generic [ref=e65]: udayMarketing name
              - generic [ref=e66]: roleuserid+marketing@gmail.com
          - button "Sign out" [ref=e67] [cursor=pointer]
    - main [ref=e71]:
      - generic [ref=e72]:
        - generic [ref=e73]: Fortis Test Hospital
        - button "Guide Me" [ref=e80]
        - generic [ref=e84]:
          - generic [ref=e85]:
            - navigation "Breadcrumb" [ref=e86]:
              - link "Home" [ref=e88] [cursor=pointer]:
                - /url: /dashboard
              - generic "Population Health" [ref=e92]
            - generic [ref=e96]:
              - heading "Population Health" [level=1] [ref=e98]
              - paragraph [ref=e99]: Monitor outcomes, engagement, and financial performance across your patient population.
          - generic [ref=e100]:
            - tablist [ref=e101]:
              - tab "Provider Dashboard" [selected] [ref=e102]
              - tab "CMS Revenue & Billing" [ref=e103]
            - tabpanel "Provider Dashboard" [ref=e104]:
              - generic [ref=e105]:
                - generic [ref=e107]:
                  - generic [ref=e108]:
                    - generic [ref=e111]:
                      - text: Total Enrolled
                      - button "What does this measure?" [ref=e112]
                    - generic [ref=e115]: 3,654
                    - generic [ref=e116]: ▲ Active members
                  - generic [ref=e117]:
                    - generic [ref=e120]:
                      - text: DAU Rate (PostHog)
                      - button "What does this measure?" [ref=e121]
                    - generic [ref=e124]: 0.0%
                    - generic [ref=e125]: "▼ Industry: 23%"
                  - generic [ref=e126]:
                    - generic [ref=e129]:
                      - text: Avg Risk Score (ACG)
                      - button "What does this measure?" [ref=e130]
                    - generic [ref=e133]: "0.000"
                    - generic [ref=e134]: ▲ No change
                  - generic [ref=e135]:
                    - generic [ref=e138]:
                      - text: Projected Annual Savings
                      - button "What does this measure?" [ref=e139]
                    - generic [ref=e142]: $0
                    - generic [ref=e143]: ▲ —
                  - generic [ref=e144]:
                    - generic [ref=e147]:
                      - text: CMS Revenue YTD (MA)
                      - button "What does this measure?" [ref=e148]
                    - generic [ref=e151]: $0
                    - generic [ref=e152]: ▲ Year to date
                - generic [ref=e153]:
                  - generic [ref=e154]:
                    - heading "Engagement (PostHog)" [level=3] [ref=e157]
                    - generic [ref=e158]:
                      - generic [ref=e159]:
                        - heading [level=4] [ref=e161]:
                          - text: DAU / WAU / MAU
                          - button "What does this measure?" [ref=e162]
                        - generic [ref=e165]:
                          - generic [ref=e166]:
                            - paragraph [ref=e167]: 0.0%
                            - paragraph [ref=e168]: DAU
                          - generic [ref=e169]:
                            - paragraph [ref=e170]: 10.4%
                            - paragraph [ref=e171]: WAU
                          - generic [ref=e172]:
                            - paragraph [ref=e173]: 48.4%
                            - paragraph [ref=e174]: MAU
                      - heading [level=4] [ref=e177]:
                        - text: Action Distribution
                        - button "What does this measure?" [ref=e178]
                  - generic [ref=e181]:
                    - heading "Risk Stratification (ACG)" [level=3] [ref=e184]
                    - generic [ref=e186]:
                      - heading [level=4] [ref=e188]:
                        - text: Risk Tier Distribution
                        - button "What does this measure?" [ref=e189]
                      - generic [ref=e193]:
                        - application [ref=e196]
                        - generic: "0"
                  - generic [ref=e197]:
                    - heading "Clinical Outcomes" [level=3] [ref=e200]
                    - generic [ref=e201]:
                      - heading [level=4] [ref=e203]:
                        - text: Control Rates vs Targets
                        - button "What does this measure?" [ref=e204]
                      - generic [ref=e209]:
                        - generic [ref=e210]: SBP < 140
                        - generic [ref=e211]:
                          - generic [ref=e212]: 100%
                          - generic [ref=e213]: target 100%
                - generic [ref=e216]:
                  - heading "Tier Migration (Causal)" [level=3] [ref=e219]
                  - generic [ref=e220]:
                    - generic [ref=e221]:
                      - generic [ref=e222]:
                        - heading "Tier Migration (Sankey)" [level=4] [ref=e223]
                        - paragraph [ref=e224]: How members moved between risk tiers from baseline → current. Hover a ribbon for flow detail.
                      - generic [ref=e225]: Empty · no cohort arms
                    - generic [ref=e226]:
                      - paragraph [ref=e227]: No before/after data for this population yet.
                      - paragraph [ref=e228]: Tier-migration analysis needs two scored snapshots per patient (a baseline and a current reading) and a comparison group. This card lights up automatically once your program has run long enough to enroll a study cohort. Until then, the rest of the dashboard still tells you who's high-risk right now.
                    - generic [ref=e229]:
                      - paragraph [ref=e230]:
                        - text: XSpan caused
                        - generic [ref=e231]: 0.0%
                        - text: more high-risk members to improve a tier (95% CI 0.0–0.0), net of regression to the mean.
                      - paragraph [ref=e232]: "Uncorrected (naive) figure: 0.0% — before adjusting for regression to the mean."
                    - generic [ref=e233]:
                      - generic [ref=e234]:
                        - generic [ref=e236]:
                          - text: On XSpan
                          - generic [ref=e237]: · 0 members
                        - generic [ref=e238]:
                          - generic [ref=e239]: ↑ Improved 0 (0%)
                          - generic [ref=e240]: → Stable 0 (0%)
                          - generic [ref=e241]: ↓ Worsened 0 (0%)
                        - img [ref=e242]:
                          - generic [ref=e243]: BASELINE
                          - generic [ref=e244]: CURRENT
                      - generic [ref=e245]:
                        - generic [ref=e247]:
                          - text: Control
                          - generic [ref=e248]: · 0 members
                        - generic [ref=e249]:
                          - generic [ref=e250]: ↑ Improved 0 (0%)
                          - generic [ref=e251]: → Stable 0 (0%)
                          - generic [ref=e252]: ↓ Worsened 0 (0%)
                        - img [ref=e253]:
                          - generic [ref=e254]: BASELINE
                          - generic [ref=e255]: CURRENT
                    - generic [ref=e256]:
                      - generic [ref=e257]:
                        - generic [ref=e258]: "Tiers:"
                        - generic [ref=e259]: low
                        - generic [ref=e262]: moderate
                        - generic [ref=e265]: high
                        - generic [ref=e268]: complex
                        - generic [ref=e271]: dashed = stayed in same tier
                      - paragraph [ref=e273]: "Projected — On XSpan: 0 projected migrations; Control: 0 projected migrations."
                - generic [ref=e274]:
                  - generic [ref=e275]:
                    - heading "Utilization Impact" [level=3] [ref=e278]
                    - generic [ref=e279]:
                      - heading [level=4] [ref=e281]:
                        - text: ED/IP Rate Trend
                        - button "What does this measure?" [ref=e282]
                      - application [ref=e288]
                      - generic [ref=e294]:
                        - generic [ref=e295]:
                          - generic [ref=e296]: ED Avoided
                          - generic [ref=e297]: "-0"
                        - generic [ref=e298]:
                          - generic [ref=e299]: IP Avoided
                          - generic [ref=e300]: "-0"
                        - generic [ref=e301]:
                          - generic [ref=e302]: Total
                          - generic [ref=e303]: "0"
                  - generic [ref=e304]:
                    - heading "Cost Savings & ROI" [level=3] [ref=e307]
                    - generic [ref=e308]:
                      - heading [level=4] [ref=e310]:
                        - text: Cost Waterfall
                        - button "What does this measure?" [ref=e311]
                      - generic [ref=e315]:
                        - generic [ref=e316]:
                          - generic [ref=e317]: Total Savings
                          - generic [ref=e318]: $0
                        - generic [ref=e319]:
                          - generic [ref=e320]: ROI
                          - generic [ref=e321]: 0.00x
                  - generic [ref=e322]:
                    - heading "Medication Impact" [level=3] [ref=e325]
                    - generic [ref=e326]: No data available
        - generic [ref=e327]:
          - generic [ref=e328]: © 2026 XSpan AI. All rights reserved.
          - generic [ref=e329]: Version 1.24.5
```

# Test source

```ts
  49  |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
  50  |     let actualTabs = await dashboardPage.getAllMenuItems();
  51  |     expect(actualTabs).toEqual(menuItems);
  52  | });
  53  | 
  54  | 
  55  | test('Verify tab visibility for Nurse staff role', async ({ loginPage, dashboardPage, page }) => {
  56  |     const menuItems = ['Dashboard',
  57  |         "AI Voice Dashboard",
  58  |         'Work Queue',
  59  |         'Patient List',
  60  |         'Health Passport',
  61  |         'Care Programs',
  62  |         'Onboarding'
  63  |     ]
  64  |     await loginPage.login(process.env.NURSE_ROLE!, process.env.PASSWORD!)
  65  |     await page.waitForURL('/dashboard')
  66  |     await loginPage.disableTutorial();
  67  |     let actualUrl = await loginPage.getLoginPageUrl();
  68  |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
  69  |     let actualTabs = await dashboardPage.getAllMenuItems();
  70  |     expect(actualTabs).toEqual(menuItems);
  71  | });
  72  | 
  73  | 
  74  | test('Verify tab visibility for Carecoordinator staff role', async ({ loginPage, dashboardPage, page }) => {
  75  |     const menuItems = ['Dashboard',
  76  |         "AI Voice Dashboard",
  77  |         'Work Queue',
  78  |         'Patient List',
  79  |         'Health Passport',
  80  |         'Care Programs',
  81  |         'Onboarding',
  82  |         "Medication Adherence",
  83  |         "AI Guardrails",
  84  |         "Rewards Engine",
  85  |         "Reward Milestones",
  86  |     ]
  87  |     await loginPage.login(process.env.CARECOORDINATOR_ROLE!, process.env.PASSWORD!)
  88  |     await page.waitForURL('/dashboard')
  89  |     await loginPage.disableTutorial();
  90  |     let actualUrl = await loginPage.getLoginPageUrl();
  91  |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
  92  |     let actualTabs = await dashboardPage.getAllMenuItems();
  93  |     expect(actualTabs).toEqual(menuItems);
  94  | });
  95  | 
  96  | test('Verify tab visibility for Dietician staff role', async ({ loginPage, dashboardPage, page }) => {
  97  |     const menuItems = ['Dashboard',
  98  |         "AI Voice Dashboard",
  99  |         'Work Queue',
  100 |         'Patient List',
  101 |         'Health Passport',
  102 |         'Care Programs',
  103 |         'Onboarding'
  104 |     ]
  105 |     await loginPage.login(process.env.DIETICIAN_ROLE!, process.env.PASSWORD!)
  106 |     await page.waitForURL('/dashboard')
  107 |     await loginPage.disableTutorial();
  108 |     let actualUrl = await loginPage.getLoginPageUrl();
  109 |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
  110 |     let actualTabs = await dashboardPage.getAllMenuItems();
  111 |     expect(actualTabs).toEqual(menuItems);
  112 | });
  113 | 
  114 | test('Verify tab visibility for Clinical staff role', async ({ loginPage, dashboardPage, page }) => {
  115 |     const menuItems = [
  116 |         'Dashboard',
  117 |         "AI Voice Dashboard",
  118 |         'Work Queue',
  119 |         'Patient List',
  120 |         'Health Passport',
  121 |         'Care Programs',
  122 |         'Onboarding'
  123 |     ]
  124 |     await loginPage.login(process.env.CLINICAL_ROLE!, process.env.PASSWORD!)
  125 |     await page.waitForURL('/dashboard')
  126 |     await loginPage.disableTutorial();
  127 |     let actualUrl = await loginPage.getLoginPageUrl();
  128 |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
  129 |     let actualTabs = await dashboardPage.getAllMenuItems();
  130 |     expect(actualTabs).toEqual(menuItems);
  131 | });
  132 | 
  133 | 
  134 | test('Verify tab visibility for Marketing staff role', async ({ loginPage, dashboardPage, page }) => {
  135 |     const menuItems = [
  136 |         "Care Programs",
  137 |         "AI Voice Dashboard",
  138 |         "Onboarding",
  139 |         "Population Health",
  140 |         "Custom Dashboards",
  141 |         "Medication Adherence",
  142 |         "Rewards Engine",
  143 |         "Reward Milestones",
  144 |     ]
  145 |     await loginPage.login(process.env.MARKETING_ROLE!, process.env.PASSWORD!)
  146 |     await page.waitForURL('/dashboard/population-health')
  147 |     await loginPage.disableTutorial();
  148 |     let actualUrl = await loginPage.getLoginPageUrl();
> 149 |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard/population-health");
      |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  150 |     let actualTabs = await dashboardPage.getAllMenuItems();
  151 |     expect(actualTabs).toEqual(menuItems);
  152 | });
  153 | 
  154 | test('Verify tab visibility for techAdmin staff role', async ({ loginPage, dashboardPage, page }) => {
  155 |     const menuItems = [
  156 |         'AI Guardrails',
  157 |         "AI Voice Dashboard",
  158 |         'Care Team',
  159 |         'Integrations',
  160 |         'Organization',
  161 |     ]
  162 |     await loginPage.login(process.env.TECHADMIN_ROLE!, process.env.PASSWORD!)
  163 |     await page.waitForURL('/dashboard/integrations')
  164 |     await loginPage.disableTutorial();
  165 |     let actualUrl = await loginPage.getLoginPageUrl();
  166 |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard/integrations");
  167 |     let actualTabs = await dashboardPage.getAllMenuItems();
  168 |     expect(actualTabs).toEqual(menuItems);
  169 | });
  170 | 
  171 | test('Verify tab visibility for Custom staff role', async ({ loginPage, dashboardPage, page }) => {
  172 |     const menuItems = [
  173 |         "Dashboard",
  174 |         "AI Voice Dashboard",
  175 |         "Work Queue",
  176 |         "Patient List",
  177 |         "Health Passport",
  178 |         "Care Programs",
  179 |         "Onboarding",
  180 |         "Population Health",
  181 |         "Custom Dashboards",
  182 |         "Medication Adherence",
  183 |         "AI Guardrails",
  184 |         "Rewards Engine",
  185 |         "Reward Milestones",
  186 |         "Care Team",
  187 |         "Integrations",
  188 |         "Organization"
  189 |     ]
  190 |     await loginPage.login(process.env.CUSTOM_ROLE!, process.env.PASSWORD!)
  191 |     await page.waitForURL('/dashboard')
  192 |     await loginPage.disableTutorial();
  193 |     let actualUrl = await loginPage.getLoginPageUrl();
  194 |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard");
  195 | 
  196 |     let actualTabs = await dashboardPage.getAllMenuItems();
  197 |     await console.log(actualTabs)
  198 |     expect(actualTabs).toHaveLength(menuItems.length);
  199 |     expect(actualTabs).toEqual(menuItems);
  200 | 
  201 | });
  202 | 
  203 | 
  204 | 
  205 | 
  206 | 
```