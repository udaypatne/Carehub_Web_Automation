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
        - generic [ref=e144]:
          - navigation "Breadcrumb" [ref=e146]:
            - link "Dashboard" [ref=e148] [cursor=pointer]:
              - /url: /dashboard
            - generic [ref=e149]: Programs
          - generic [ref=e154]:
            - generic [ref=e156]:
              - heading "Programs" [level=1] [ref=e158]
              - paragraph [ref=e159]: Manage care programs and enrolled patients
            - generic [ref=e161]:
              - button "Request Program Transfer" [ref=e162]
              - button "Create Program" [ref=e166]
          - generic [ref=e168]:
            - textbox "Search programs by name…" [ref=e170]
            - 'button "Type: All Types" [ref=e172]'
            - 'button "Status: 2 statuses" [ref=e177]'
          - generic [ref=e181]:
            - generic [ref=e182]:
              - generic [ref=e183]:
                - generic [ref=e189]:
                  - generic [ref=e190]:
                    - heading "sample" [level=3] [ref=e191]
                    - generic [ref=e192]: Draft
                    - button "Program actions" [ref=e198]
                  - paragraph [ref=e203]:
                    - generic [ref=e204]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e205]: sample
                - generic [ref=e206]: 0 enrolled
                - button "View Details" [ref=e213]
              - generic [ref=e214]:
                - generic [ref=e220]:
                  - generic [ref=e221]:
                    - heading "Automation" [level=3] [ref=e222]
                    - generic [ref=e223]: Draft
                    - button "Program actions" [ref=e229]
                  - paragraph [ref=e234]:
                    - generic [ref=e235]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e236]: Automation
                - generic [ref=e237]: 0 enrolled
                - button "View Details" [ref=e244]
              - generic [ref=e245]:
                - generic [ref=e251]:
                  - generic [ref=e252]:
                    - heading "Automation" [level=3] [ref=e253]
                    - generic [ref=e254]: Draft
                    - button "Program actions" [ref=e260]
                  - paragraph [ref=e265]:
                    - generic [ref=e266]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e267]: Automation
                - generic [ref=e268]: 0 enrolled
                - button "View Details" [ref=e275]
              - generic [ref=e276]:
                - generic [ref=e282]:
                  - generic [ref=e283]:
                    - heading "m" [level=3] [ref=e284]
                    - generic [ref=e285]: Draft
                    - button "Program actions" [ref=e291]
                  - paragraph [ref=e296]:
                    - generic [ref=e297]: healthspan ·
                    - text: 12 weeks · 12 modules
                - generic [ref=e298]: 0 enrolled
                - button "View Details" [ref=e305]
              - generic [ref=e306]:
                - generic [ref=e312]:
                  - generic [ref=e313]:
                    - heading "Automation" [level=3] [ref=e314]
                    - generic [ref=e315]: Draft
                    - button "Program actions" [ref=e321]
                  - paragraph [ref=e326]:
                    - generic [ref=e327]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e328]: Automation
                - generic [ref=e329]: 0 enrolled
                - button "View Details" [ref=e336]
              - generic [ref=e337]:
                - generic [ref=e343]:
                  - generic [ref=e344]:
                    - heading "sample" [level=3] [ref=e345]
                    - generic [ref=e346]: Draft
                    - button "Program actions" [ref=e352]
                  - paragraph [ref=e357]:
                    - generic [ref=e358]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e359]: sample
                - generic [ref=e360]: 0 enrolled
                - button "View Details" [ref=e367]
              - generic [ref=e368]:
                - generic [ref=e374]:
                  - generic [ref=e375]:
                    - heading "sample" [level=3] [ref=e376]
                    - generic [ref=e377]: Draft
                    - button "Program actions" [ref=e383]
                  - paragraph [ref=e388]:
                    - generic [ref=e389]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e390]: sample
                - generic [ref=e391]: 0 enrolled
                - button "View Details" [ref=e398]
              - generic [ref=e399]:
                - generic [ref=e405]:
                  - generic [ref=e406]:
                    - heading "sample" [level=3] [ref=e407]
                    - generic [ref=e408]: Draft
                    - button "Program actions" [ref=e414]
                  - paragraph [ref=e419]:
                    - generic [ref=e420]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e421]: sample
                - generic [ref=e422]: 0 enrolled
                - button "View Details" [ref=e429]
              - generic [ref=e430]:
                - generic [ref=e436]:
                  - generic [ref=e437]:
                    - heading "sample" [level=3] [ref=e438]
                    - generic [ref=e439]: Draft
                    - button "Program actions" [ref=e445]
                  - paragraph [ref=e450]:
                    - generic [ref=e451]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e452]: sample
                - generic [ref=e453]: 0 enrolled
                - button "View Details" [ref=e460]
              - generic [ref=e461]:
                - generic [ref=e467]:
                  - generic [ref=e468]:
                    - heading "sample" [level=3] [ref=e469]
                    - generic [ref=e470]: Draft
                    - button "Program actions" [ref=e476]
                  - paragraph [ref=e481]:
                    - generic [ref=e482]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e483]: sample
                - generic [ref=e484]: 0 enrolled
                - button "View Details" [ref=e491]
              - generic [ref=e492]:
                - generic [ref=e498]:
                  - generic [ref=e499]:
                    - heading "sample" [level=3] [ref=e500]
                    - generic [ref=e501]: Draft
                    - button "Program actions" [ref=e507]
                  - paragraph [ref=e512]:
                    - generic [ref=e513]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e514]: sample
                - generic [ref=e515]: 0 enrolled
                - button "View Details" [ref=e522]
              - generic [ref=e523]:
                - generic [ref=e529]:
                  - generic [ref=e530]:
                    - heading "sample" [level=3] [ref=e531]
                    - generic [ref=e532]: Draft
                    - button "Program actions" [ref=e538]
                  - paragraph [ref=e543]:
                    - generic [ref=e544]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e545]: sample
                - generic [ref=e546]: 0 enrolled
                - button "View Details" [ref=e553]
              - generic [ref=e554]:
                - generic [ref=e560]:
                  - generic [ref=e561]:
                    - heading "sample" [level=3] [ref=e562]
                    - generic [ref=e563]: Draft
                    - button "Program actions" [ref=e569]
                  - paragraph [ref=e574]:
                    - generic [ref=e575]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e576]: sample
                - generic [ref=e577]: 0 enrolled
                - button "View Details" [ref=e584]
              - generic [ref=e585]:
                - generic [ref=e591]:
                  - generic [ref=e592]:
                    - heading "sample" [level=3] [ref=e593]
                    - generic [ref=e594]: Draft
                    - button "Program actions" [ref=e600]
                  - paragraph [ref=e605]:
                    - generic [ref=e606]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e607]: sample
                - generic [ref=e608]: 0 enrolled
                - button "View Details" [ref=e615]
              - generic [ref=e616]:
                - generic [ref=e622]:
                  - generic [ref=e623]:
                    - heading "sample" [level=3] [ref=e624]
                    - generic [ref=e625]: Draft
                    - button "Program actions" [ref=e631]
                  - paragraph [ref=e636]:
                    - generic [ref=e637]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e638]: sample
                - generic [ref=e639]: 0 enrolled
                - button "View Details" [ref=e646]
              - generic [ref=e647]:
                - generic [ref=e653]:
                  - generic [ref=e654]:
                    - heading "sample" [level=3] [ref=e655]
                    - generic [ref=e656]: Draft
                    - button "Program actions" [ref=e662]
                  - paragraph [ref=e667]:
                    - generic [ref=e668]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e669]: sample
                - generic [ref=e670]: 0 enrolled
                - button "View Details" [ref=e677]
              - generic [ref=e678]:
                - generic [ref=e684]:
                  - generic [ref=e685]:
                    - heading "sample" [level=3] [ref=e686]
                    - generic [ref=e687]: Draft
                    - button "Program actions" [ref=e693]
                  - paragraph [ref=e698]:
                    - generic [ref=e699]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e700]: sample
                - generic [ref=e701]: 0 enrolled
                - button "View Details" [ref=e708]
              - generic [ref=e709]:
                - generic [ref=e715]:
                  - generic [ref=e716]:
                    - heading "sample" [level=3] [ref=e717]
                    - generic [ref=e718]: Draft
                    - button "Program actions" [ref=e724]
                  - paragraph [ref=e729]:
                    - generic [ref=e730]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e731]: sample
                - generic [ref=e732]: 0 enrolled
                - button "View Details" [ref=e739]
              - generic [ref=e740]:
                - generic [ref=e746]:
                  - generic [ref=e747]:
                    - heading "sample" [level=3] [ref=e748]
                    - generic [ref=e749]: Draft
                    - button "Program actions" [ref=e755]
                  - paragraph [ref=e760]:
                    - generic [ref=e761]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e762]: sample
                - generic [ref=e763]: 0 enrolled
                - button "View Details" [ref=e770]
              - generic [ref=e771]:
                - generic [ref=e777]:
                  - generic [ref=e778]:
                    - heading "sample" [level=3] [ref=e779]
                    - generic [ref=e780]: Draft
                    - button "Program actions" [ref=e786]
                  - paragraph [ref=e791]:
                    - generic [ref=e792]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e793]: sample
                - generic [ref=e794]: 0 enrolled
                - button "View Details" [ref=e801]
              - generic [ref=e802]:
                - generic [ref=e808]:
                  - generic [ref=e809]:
                    - heading "f" [level=3] [ref=e810]
                    - generic [ref=e811]: Draft
                    - button "Program actions" [ref=e817]
                  - paragraph [ref=e822]:
                    - generic [ref=e823]: healthspan ·
                    - text: 1 weeks · 1 modules
                  - paragraph [ref=e824]: f
                - generic [ref=e825]: 0 enrolled
                - button "View Details" [ref=e832]
              - generic [ref=e833]:
                - generic [ref=e839]:
                  - generic [ref=e840]:
                    - heading "sample" [level=3] [ref=e841]
                    - generic [ref=e842]: Draft
                    - button "Program actions" [ref=e848]
                  - paragraph [ref=e853]:
                    - generic [ref=e854]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e855]: sample
                - generic [ref=e856]: 0 enrolled
                - button "View Details" [ref=e863]
              - generic [ref=e864]:
                - generic [ref=e870]:
                  - generic [ref=e871]:
                    - heading "sample" [level=3] [ref=e872]
                    - generic [ref=e873]: Draft
                    - button "Program actions" [ref=e879]
                  - paragraph [ref=e884]:
                    - generic [ref=e885]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e886]: sample
                - generic [ref=e887]: 0 enrolled
                - button "View Details" [ref=e894]
              - generic [ref=e895]:
                - generic [ref=e901]:
                  - generic [ref=e902]:
                    - heading "sample" [level=3] [ref=e903]
                    - generic [ref=e904]: Draft
                    - button "Program actions" [ref=e910]
                  - paragraph [ref=e915]:
                    - generic [ref=e916]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e917]: sample
                - generic [ref=e918]: 0 enrolled
                - button "View Details" [ref=e925]
              - generic [ref=e926]:
                - generic [ref=e932]:
                  - generic [ref=e933]:
                    - heading "sample" [level=3] [ref=e934]
                    - generic [ref=e935]: Draft
                    - button "Program actions" [ref=e941]
                  - paragraph [ref=e946]:
                    - generic [ref=e947]: healthspan ·
                    - text: 1 weeks · 2 modules
                  - paragraph [ref=e948]: sample
                - generic [ref=e949]: 0 enrolled
                - button "View Details" [ref=e956]
            - generic [ref=e958]:
              - generic [ref=e959]:
                - generic [ref=e960]:
                  - generic [ref=e961]: "Rows per page:"
                  - combobox "Rows per page" [ref=e962] [cursor=pointer]:
                    - option "25" [selected]
                    - option "50"
                    - option "100"
                - generic [ref=e963]:
                  - text: Showing
                  - generic [ref=e964]: 1–25
                  - text: of 180 programs
              - generic [ref=e965]:
                - button "Previous page" [disabled] [ref=e966]: Prev
                - button "1" [ref=e969]
                - button "2" [ref=e970] [cursor=pointer]
                - generic [ref=e971]: …
                - button "8" [ref=e972] [cursor=pointer]
                - button "Next page" [ref=e973]: Next
        - generic [ref=e976]:
          - generic [ref=e977]: © 2026 XSpan AI. All rights reserved.
          - generic [ref=e978]: Version 1.24.5
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