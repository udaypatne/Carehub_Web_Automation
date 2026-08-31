# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: careProgramtwo.spec.ts >> verify create Program
- Location: tests/careProgramtwo.spec.ts:22:5

# Error details

```
Test timeout of 80000ms exceeded.
```

```
Error: locator.fill: Test timeout of 80000ms exceeded.
Call log:
  - waiting for locator('//*[contains(text(),\'Total Module\')]/following-sibling::input')

```

# Page snapshot

```yaml
- generic:
  - region "Notifications alt+T"
  - generic:
    - complementary:
      - generic:
        - generic:
          - generic:
            - generic:
              - generic: XSpan
              - generic: The Physics of Biology
          - button
        - generic:
          - textbox:
            - /placeholder: Search patients...
        - generic:
          - navigation:
            - link:
              - /url: /dashboard
              - generic: Dashboard
            - link:
              - /url: /dashboard/ai-voice-dashboard
              - generic: AI Voice Dashboard
            - link:
              - /url: /dashboard/work-queue
              - generic: Work Queue
            - link:
              - /url: /dashboard/patients
              - generic: Patient List
            - link:
              - /url: /dashboard/reporting
              - generic: Health Passport
            - link:
              - /url: /dashboard/programs
              - generic: Care Programs
            - link:
              - /url: /dashboard/onboarding
              - generic: Onboarding
            - link:
              - /url: /dashboard/population-health
              - generic: Population Health
            - link:
              - /url: /dashboard/custom-dashboards
              - generic: Custom Dashboards
            - link:
              - /url: /dashboard/adherence
              - generic: Medication Adherence
            - link:
              - /url: /dashboard/ai-review
              - generic: AI Guardrails
              - generic: "62"
            - link:
              - /url: /dashboard/motivation
              - generic: Rewards Engine
            - link:
              - /url: /dashboard/admin/rewards/milestones
              - generic: Reward Milestones
            - link:
              - /url: /dashboard/providers
              - generic: Care Team
            - link:
              - /url: /dashboard/integrations
              - generic: Integrations
            - link:
              - /url: /dashboard/settings/organizations
              - generic: Organization
      - generic:
        - link:
          - /url: /dashboard/help
          - generic: Help
        - link:
          - /url: /dashboard/settings
          - generic: Settings
        - link:
          - /url: /dashboard/sam-voice
          - generic: Sam Voice Platform
        - generic:
          - link:
            - /url: /dashboard/profile
            - generic: UN
            - generic:
              - generic: udayorgadmin name
              - generic: roleuserid+orgadmin@gmail.com
          - button
    - main:
      - generic:
        - generic:
          - generic: Organization
          - button:
            - generic: Fortis Test Hospital
        - generic:
          - button
        - generic:
          - generic:
            - navigation:
              - generic:
                - link:
                  - /url: /dashboard
                  - text: Dashboard
              - generic: Programs
          - generic:
            - generic:
              - generic:
                - generic:
                  - generic:
                    - heading [level=1]: Programs
                  - paragraph: Manage care programs and enrolled patients
              - generic:
                - generic:
                  - button: Request Program Transfer
                  - button: Create Program
          - generic:
            - generic:
              - textbox:
                - /placeholder: Search programs by name…
            - generic:
              - button:
                - generic: "Type: All Types"
            - generic:
              - button:
                - generic: "Status: 2 statuses"
          - generic:
            - generic:
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Automation
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 1 weeks
                    - paragraph: description text
                - generic: 0 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Automation
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 1 weeks
                    - paragraph: description text
                - generic: 0 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Automation
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 1 weeks
                    - paragraph: description text
                - generic: 0 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Automation
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 1 weeks
                    - paragraph: description text
                - generic: 0 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Automation
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 1 weeks
                    - paragraph: description text
                - generic: 0 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Automation
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 1 weeks
                    - paragraph: description text
                - generic: 0 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Automation
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 1 weeks
                    - paragraph: description text
                - generic: 0 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Automation
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 1 weeks
                    - paragraph: description text
                - generic: 0 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Automation
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 1 weeks
                    - paragraph: description text
                - generic: 0 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Automation
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 1 weeks
                    - paragraph: description text
                - generic: 0 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Automation
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 1 weeks
                    - paragraph: description text
                - generic: 0 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Automation
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 1 weeks
                    - paragraph: description text
                - generic: 0 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: kkk
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 12 weeks
                - generic: 0 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: j
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 12 weeks
                - generic: 0 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Automation
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 1 weeks
                    - paragraph: description text
                - generic: 0 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Program 26 19.15 pm
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: custom ·
                      - text: 1 weeks
                - generic: 730 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: New Created Program Fortis
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: custom ·
                      - text: 1 weeks
                - generic: 729 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Jio Program Fortis
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: custom ·
                      - text: 1 weeks
                - generic: 99 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: m
                      - generic: Active
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 12 weeks
                - generic: 1 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Twenty one August
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 12 weeks
                - generic: 563 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: addedin cohort directly
                      - generic: Active
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 2 weeks
                - generic: 0 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: steps normal
                      - generic: Active
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 1 weeks
                - generic: 2 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Sub Program
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 1 weeks
                - generic: 500 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Internal Testing 13 August import from production
                      - generic: Active
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 1 weeks
                    - paragraph: Do not delete use for internal testing
                - generic: 9 enrolled
                - button: View Details
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading [level=3]: Automation
                      - generic: Draft
                      - button
                    - paragraph:
                      - generic: healthspan ·
                      - text: 1 weeks
                    - paragraph: Automation
                - generic: 0 enrolled
                - button: View Details
            - generic:
              - generic:
                - generic:
                  - generic:
                    - generic: "Rows per page:"
                    - combobox
                  - generic:
                    - text: Showing
                    - generic: 1–25
                    - text: of 204 programs
                - generic:
                  - button [disabled]: Prev
                  - button: "1"
                  - button: "2"
                  - generic: …
                  - button: "9"
                  - button: Next
        - generic:
          - generic: © 2026 XSpan AI. All rights reserved.
          - generic: Version 1.24.5
  - dialog [ref=e2]:
    - generic [ref=e3]:
      - heading "Create Program" [level=2] [ref=e4]
      - paragraph [ref=e5]: Set up a new care program for your organization.
    - generic [ref=e6]:
      - generic [ref=e7]:
        - generic [ref=e8]:
          - generic [ref=e9]: Program Name *
          - generic [ref=e10]: 10/150
        - textbox "Program Name *" [ref=e11]:
          - /placeholder: e.g. Spring Weight Loss Cohort
          - text: Automation
      - generic [ref=e12]:
        - text: Program Type *
        - combobox [ref=e14]:
          - option "Healthspan" [selected]
          - option "Weight Management"
          - option "Diabetes Prevention (PreventT2)"
          - option "Convert Fat into Musscels"
          - option "+ Add custom type…"
      - generic [ref=e16]:
        - text: Duration (weeks) *
        - spinbutton [active] [ref=e17]: "1"
      - generic [ref=e18]:
        - generic [ref=e19]:
          - generic [ref=e20]: Description
          - generic [ref=e21]: 0/500
        - textbox "Optional — describe the program goals and approach" [ref=e22]
      - generic [ref=e24] [cursor=pointer]:
        - checkbox "Make this program available to all sub-orgs Descendant orgs will see this program in their picker and can enroll their patients. They cannot edit it." [ref=e25]
        - generic [ref=e26]:
          - text: Make this program available to all sub-orgs
          - generic [ref=e27]: Descendant orgs will see this program in their picker and can enroll their patients. They cannot edit it.
      - generic [ref=e29] [cursor=pointer]:
        - checkbox "Ask patients to set their goals when they enroll The app opens goal setting as part of enrollment, for the goals this program doesn't prescribe itself." [ref=e30]
        - generic [ref=e31]:
          - text: Ask patients to set their goals when they enroll
          - generic [ref=e32]: The app opens goal setting as part of enrollment, for the goals this program doesn't prescribe itself.
      - paragraph [ref=e33]: New programs are created as a draft. Add phases and weekly curriculum on the program page, then publish to make it available to patients.
      - generic [ref=e34]:
        - button "Cancel" [ref=e35] [cursor=pointer]
        - button "Create Program" [ref=e36] [cursor=pointer]
    - button "Close" [ref=e37]
```

# Test source

```ts
  1  | import { BasePage } from "../BasePage";
  2  | import { Locator, Page } from "@playwright/test";
  3  | 
  4  | export class CareProgramPage2 extends BasePage {
  5  | 
  6  |     private readonly createProgramBtn: Locator;
  7  |     private readonly importProgramBtn: Locator;
  8  |     private readonly readOnlyMsg: Locator;
  9  |     private readonly viewDetails: Locator;
  10 |     private readonly createProgramPopUp: Locator;
  11 |     private readonly programName: Locator;
  12 |     private readonly duration: Locator;
  13 |     private readonly modules: Locator;
  14 |     private readonly programDescription: Locator;
  15 |     private readonly makeThisProgramCheckbox: Locator;
  16 |     private readonly cancel: Locator;
  17 |     private readonly saveCreateProgram: Locator;
  18 |     private readonly programHeaderN: Locator;
  19 | 
  20 | 
  21 | 
  22 | 
  23 |     constructor(page: Page) {
  24 |         super(page);
  25 |         this.createProgramBtn = page.getByRole('button', { name: 'Create Program' });
  26 |         this.importProgramBtn = page.getByRole('button', { name: 'Import Program' });
  27 |         this.readOnlyMsg = page.getByText(` Read-only — you don't have permission to edit this program's structure`);
  28 |         this.viewDetails = page.getByRole('button', { name: 'View Details' }).first();
  29 |         this.createProgramPopUp = page.getByRole('dialog', { name: 'Create Program' });
  30 |         this.programName = page.getByRole('textbox', { name: 'Program Name *' });
  31 |         this.duration = page.locator(`//*[contains(text(),'Duration')]/following-sibling::input`);
  32 |         this.modules = page.locator(`//*[contains(text(),'Total Module')]/following-sibling::input`);
  33 |         this.programDescription = page.getByRole('textbox', { name: 'describe the program' });
  34 |         this.makeThisProgramCheckbox = page.getByRole('checkbox', { name: 'Make this Program' });
  35 |         this.cancel = page.getByRole('button', { name: 'Cancel' });
  36 |         this.saveCreateProgram = page.locator(`//*[contains(@class,'flex flex-col-reve')]`).getByRole('button', { name: 'Create Program' });
  37 |         this.programHeaderN = page.getByRole('heading', { level: 1 });
  38 |     }
  39 | 
  40 |     async selectTab(tabName: string): Promise<void> {
  41 |         await this.page.getByRole('link', { name: tabName, exact: true }).click();
  42 |     }
  43 | 
  44 |     async careProgramBtns(buttonName: string): Promise<boolean> {
  45 |         return await this.page.getByRole('button', { name: `${buttonName}` }).isVisible();
  46 |     }
  47 | 
  48 |     async selectProgramByName(programName: string): Promise<void> {
  49 |         let viewDetail = await this.page.locator(`//*[contains(text(),'${programName}')]/../../..`).getByRole('button', { name: 'view Details' }).first();
  50 |         await viewDetail.waitFor({ state: 'visible' });
  51 |         await viewDetail.click();
  52 |     }
  53 | 
  54 |     async clickOnViewDetails(): Promise<void> {
  55 |         // await this.viewDetails.waitFor({     state: 'visible'});
  56 |         await this.viewDetails.click();
  57 |     };
  58 | 
  59 |     async isReadOnlyPermissionMsgPresent(): Promise<boolean> {
  60 |         await this.readOnlyMsg.waitFor({
  61 |             state: 'visible'
  62 |         });
  63 |         return await this.readOnlyMsg.isVisible()
  64 |     }
  65 | 
  66 |     async expectedUrlPath(): Promise<string> {
  67 |         await this.page.waitForURL('/dashboard/programs');
  68 |         return await this.page.url();
  69 |     }
  70 | 
  71 |     async createProgram(progName: string, duration: string, modules: string): Promise<void> {
  72 |         if (await this.createProgramBtn.isVisible) {
  73 |             await this.createProgramBtn.click();
  74 |             if (await this.createProgramPopUp.isVisible()) {
  75 |                 await this.programName.fill(progName);
  76 |                 await this.duration.fill(duration);
> 77 |                 await this.modules.fill('2');
     |                                    ^ Error: locator.fill: Test timeout of 80000ms exceeded.
  78 |                 await this.programDescription.fill(modules);
  79 |                 await this.saveCreateProgram.click({ timeout: 5000 });
  80 |             }
  81 |         }
  82 | 
  83 | 
  84 | 
  85 |     }
  86 | }
```