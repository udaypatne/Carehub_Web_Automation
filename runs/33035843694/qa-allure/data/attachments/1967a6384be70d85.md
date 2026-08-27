# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: allstaffrolelogin.spec.ts >> Verify tab visibility for techAdmin staff role
- Location: tests/allstaffrolelogin.spec.ts:154:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "https://provider-qa.xspan.ai/dashboard/integrations"
Received: "https://provider-qa.xspan.ai/dashboard/integrations/ehr"
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
          - link "AI Guardrails 62" [ref=e16] [cursor=pointer]:
            - /url: /dashboard/ai-review
            - generic [ref=e20]: AI Guardrails
            - generic [ref=e21]: "62"
          - link "Care Team" [ref=e22] [cursor=pointer]:
            - /url: /dashboard/providers
          - link "Integrations" [ref=e28] [cursor=pointer]:
            - /url: /dashboard/integrations
          - link "Organization" [ref=e33] [cursor=pointer]:
            - /url: /dashboard/settings/organizations
      - generic [ref=e40]:
        - link "Help" [ref=e41] [cursor=pointer]:
          - /url: /dashboard/help
        - link "Settings" [ref=e45] [cursor=pointer]:
          - /url: /dashboard/settings
        - link "Sam Voice Platform" [ref=e50] [cursor=pointer]:
          - /url: /dashboard/sam-voice
        - generic [ref=e56]:
          - link "My profile" [ref=e57] [cursor=pointer]:
            - /url: /dashboard/profile
            - generic [ref=e58]: UN
            - generic [ref=e59]:
              - generic [ref=e60]: udayTechAdmin name
              - generic [ref=e61]: roleuserid+techadmin@gmail.com
          - button "Sign out" [ref=e62] [cursor=pointer]
    - main [ref=e66]:
      - generic [ref=e67]:
        - generic [ref=e68]:
          - generic [ref=e69]: Organization
          - button "Organization" [ref=e70]:
            - generic [ref=e71]: Fortis Test Hospital
        - button "Guide Me" [ref=e76]
        - generic [ref=e80]:
          - navigation "Breadcrumb" [ref=e82]:
            - link "Home" [ref=e84] [cursor=pointer]:
              - /url: /dashboard
            - generic "Integrations" [ref=e88]
          - generic [ref=e93]:
            - heading "Integrations" [level=1] [ref=e95]
            - paragraph [ref=e96]: Manage EHR connectivity, wearable data, webhooks, and third-party API access.
          - generic [ref=e98]:
            - button "EHR / Redox" [ref=e99] [cursor=pointer]
            - button "Support Tickets" [ref=e104] [cursor=pointer]
            - button "Mobile App API" [ref=e107] [cursor=pointer]
            - button "Wearables" [ref=e110] [cursor=pointer]
            - button "Webhooks" [ref=e116] [cursor=pointer]
            - button "API Access (3rd-Party)" [ref=e121] [cursor=pointer]
            - button "Analytics" [ref=e126] [cursor=pointer]
          - generic [ref=e130]:
            - generic [ref=e131]:
              - generic [ref=e139]:
                - generic [ref=e140]:
                  - heading "EHR Integration" [level=2] [ref=e141]
                  - generic [ref=e142]: via Redox
                  - generic [ref=e143]: Not Connected
                - paragraph [ref=e146]: Server-to-server integration with health system EHRs. Supports historical backload, real-time ADT events, FHIR queries, and document write-back.
              - generic [ref=e147]:
                - generic [ref=e148]:
                  - generic [ref=e149]: Patients Synced
                  - paragraph [ref=e156]: "0"
                - generic [ref=e157]:
                  - generic [ref=e158]: Inbound (24h)
                  - paragraph [ref=e162]: "0"
                - generic [ref=e163]:
                  - generic [ref=e164]: Outbound (24h)
                  - paragraph [ref=e168]: "0"
                - generic [ref=e169]:
                  - generic [ref=e170]: Last Sync
                  - paragraph [ref=e175]: Never
              - generic [ref=e176]:
                - button "Sync All Patients Now" [ref=e177]
                - button "Refresh Status" [ref=e183]
            - generic [ref=e189]:
              - generic [ref=e190]:
                - generic [ref=e191]: Historical Backload
                - paragraph [ref=e198]: Bulk import patient data from health system (C-CDA, HL7, CSV)
              - generic [ref=e199]:
                - generic [ref=e200]: ADT Listener
                - paragraph [ref=e207]: Real-time admission, discharge, transfer events from EHR
              - generic [ref=e208]:
                - generic [ref=e209]: FHIR Query
                - paragraph [ref=e217]: On-demand query for labs, meds, vitals, encounters
              - generic [ref=e218]:
                - generic [ref=e219]: Document Write-Back
                - paragraph [ref=e226]: Push Health Passport PDF back to patient chart in EHR
            - generic [ref=e227]:
              - generic [ref=e228]:
                - heading "Sync History" [level=3] [ref=e232]
                - button "Refresh" [ref=e234]
              - generic [ref=e235]:
                - paragraph [ref=e238]: No sync events yet
                - paragraph [ref=e239]: Events will appear here when data flows from the EHR
        - generic [ref=e240]:
          - generic [ref=e241]: © 2026 XSpan AI. All rights reserved.
          - generic [ref=e242]: Version 1.24.5
```

# Test source

```ts
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
  149 |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard/population-health");
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
> 166 |     await expect(actualUrl).toBe("https://provider-qa.xspan.ai/dashboard/integrations");
      |                             ^ Error: expect(received).toBe(expected) // Object.is equality
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