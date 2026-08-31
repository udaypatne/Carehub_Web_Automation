# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: healthpassport.spec.ts >> verify 30 days health passport report PDF data 
- Location: tests/healthpassport.spec.ts:174:5

# Error details

```
TimeoutError: page.waitForLoadState: Timeout 30000ms exceeded.
=========================== logs ===========================
  "networkidle" event fired
============================================================
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
        - navigation [ref=e18]:
          - link "Dashboard" [ref=e19] [cursor=pointer]:
            - /url: /dashboard
          - link "AI Voice Dashboard" [ref=e26] [cursor=pointer]:
            - /url: /dashboard/ai-voice-dashboard
          - link "Work Queue" [ref=e29] [cursor=pointer]:
            - /url: /dashboard/work-queue
          - link "Patient List" [ref=e35] [cursor=pointer]:
            - /url: /dashboard/patients
          - link "Health Passport" [ref=e42] [cursor=pointer]:
            - /url: /dashboard/reporting
          - link "Care Programs" [ref=e47] [cursor=pointer]:
            - /url: /dashboard/programs
          - link "Onboarding" [ref=e52] [cursor=pointer]:
            - /url: /dashboard/onboarding
          - link "Population Health" [ref=e57] [cursor=pointer]:
            - /url: /dashboard/population-health
          - link "Custom Dashboards" [ref=e61] [cursor=pointer]:
            - /url: /dashboard/custom-dashboards
          - link "Medication Adherence" [ref=e66] [cursor=pointer]:
            - /url: /dashboard/adherence
          - link "AI Guardrails 62" [ref=e71] [cursor=pointer]:
            - /url: /dashboard/ai-review
            - generic [ref=e75]: AI Guardrails
            - generic [ref=e76]: "62"
          - link "Rewards Engine" [ref=e77] [cursor=pointer]:
            - /url: /dashboard/motivation
          - link "Reward Milestones" [ref=e85] [cursor=pointer]:
            - /url: /dashboard/admin/rewards/milestones
          - link "Care Team" [ref=e91] [cursor=pointer]:
            - /url: /dashboard/providers
          - link "Integrations" [ref=e97] [cursor=pointer]:
            - /url: /dashboard/integrations
          - link "Organization" [ref=e101] [cursor=pointer]:
            - /url: /dashboard/settings/organizations
      - generic [ref=e108]:
        - link "Help" [ref=e109] [cursor=pointer]:
          - /url: /dashboard/help
        - link "Settings" [ref=e113] [cursor=pointer]:
          - /url: /dashboard/settings
        - link "Sam Voice Platform" [ref=e118] [cursor=pointer]:
          - /url: /dashboard/sam-voice
        - generic [ref=e124]:
          - link "My profile" [ref=e125] [cursor=pointer]:
            - /url: /dashboard/profile
            - generic [ref=e126]: UN
            - generic [ref=e127]:
              - generic [ref=e128]: udayorgadmin name
              - generic [ref=e129]: roleuserid+orgadmin@gmail.com
          - button "Sign out" [ref=e130] [cursor=pointer]
    - main [ref=e134]:
      - generic [ref=e135]:
        - generic [ref=e136]:
          - generic [ref=e137]: Organization
          - button "Organization" [ref=e138]:
            - generic [ref=e139]: Fortis Test Hospital
        - button "Guide Me" [ref=e144]
        - generic [ref=e148]:
          - navigation "Breadcrumb" [ref=e150]:
            - link "Home" [ref=e152] [cursor=pointer]:
              - /url: /dashboard
            - link "Health Passport" [ref=e156] [cursor=pointer]:
              - /url: /dashboard/reporting
            - generic "Uday Patne" [ref=e160]
          - generic [ref=e162]:
            - button "Back" [ref=e163]
            - generic [ref=e166]:
              - heading "Health Passport" [level=1] [ref=e167]
              - paragraph [ref=e168]: Comprehensive health data across all domains.
          - generic [ref=e169]:
            - generic [ref=e171]:
              - generic [ref=e172]: UP
              - generic [ref=e174]:
                - heading "Uday Patne" [level=1] [ref=e175]
                - paragraph [ref=e176]:
                  - generic [ref=e180]: udaypatneit@gmail.com
                - paragraph [ref=e181]: "+918411011435"
                - paragraph [ref=e184]: "DOJ: 07/02/2026 · DOB: 01/04/1989"
              - generic [ref=e185]: active
            - generic [ref=e187]:
              - generic [ref=e188]:
                - generic [ref=e189]:
                  - generic [ref=e190]:
                    - generic [ref=e191]: Time Window
                    - generic [ref=e192]:
                      - button "7 Days" [ref=e193]
                      - button "30 Days" [ref=e194]
                      - button "90 Days" [ref=e195]
                  - generic [ref=e196]:
                    - button "Export CSV" [ref=e197]
                    - button "View Health Passport Report" [active] [ref=e202]
                - tablist [ref=e206]:
                  - tab "Overview" [selected] [ref=e207] [cursor=pointer]
                  - tab "Weight" [ref=e208] [cursor=pointer]
                  - tab "Glucose" [ref=e209] [cursor=pointer]
                  - tab "Sleep" [ref=e210] [cursor=pointer]
                  - tab "Activity" [ref=e211] [cursor=pointer]
                  - tab "Nutrition" [ref=e212] [cursor=pointer]
                  - tab "Water Intake" [ref=e213] [cursor=pointer]
                  - tab "Cardiac" [ref=e214] [cursor=pointer]
                  - tab "Blood Pressure" [ref=e215] [cursor=pointer]
                  - tab "Temperature" [ref=e216] [cursor=pointer]
                  - tab "Biomarkers" [ref=e217] [cursor=pointer]
                  - tab "Body Scan" [ref=e218] [cursor=pointer]
                  - tab "Medications" [ref=e219] [cursor=pointer]
                  - tab "Supplements" [ref=e220] [cursor=pointer]
                  - tab "Reports" [ref=e221] [cursor=pointer]
              - tabpanel "Overview" [ref=e223]:
                - generic [ref=e224]:
                  - generic [ref=e225]:
                    - button "Weight 440.9 lbs" [ref=e226] [cursor=pointer]:
                      - generic [ref=e227]:
                        - generic [ref=e228]: Weight
                        - generic [ref=e236]:
                          - generic [ref=e237]: "440.9"
                          - generic [ref=e238]: lbs
                    - button "BMI 67.6" [ref=e239] [cursor=pointer]:
                      - generic [ref=e240]:
                        - generic [ref=e241]: BMI
                        - generic [ref=e248]: "67.6"
                    - button "Glucose TIR 80 %" [ref=e251] [cursor=pointer]:
                      - generic [ref=e252]:
                        - generic [ref=e253]: Glucose TIR
                        - generic [ref=e261]:
                          - generic [ref=e262]: "80"
                          - generic [ref=e263]: "%"
                    - button "Avg Sleep (logged days) 6.3 hrs" [ref=e264] [cursor=pointer]:
                      - generic [ref=e265]:
                        - generic [ref=e266]: Avg Sleep (logged days)
                        - generic [ref=e273]:
                          - generic [ref=e274]: "6.3"
                          - generic [ref=e275]: hrs
                    - button "Avg Steps (logged days) 6,904" [ref=e276] [cursor=pointer]:
                      - generic [ref=e277]:
                        - generic [ref=e278]: Avg Steps (logged days)
                        - generic [ref=e284]: 6,904
                    - button "Avg Nutrition (logged days) 11880 cal/day" [ref=e287] [cursor=pointer]:
                      - generic [ref=e288]:
                        - generic [ref=e289]: Avg Nutrition (logged days)
                        - generic [ref=e297]:
                          - generic [ref=e298]: "11880"
                          - generic [ref=e299]: cal/day
                  - generic [ref=e300]:
                    - heading "Connected Devices" [level=3] [ref=e301]
                    - generic [ref=e302]:
                      - generic [ref=e303]: XSpan.ai App
                      - generic [ref=e307]:
                        - generic [ref=e308]: Android
                        - generic [ref=e309]: 1.24.8
                      - generic [ref=e310]:
                        - generic [ref=e311]:
                          - generic [ref=e315]: Fitbit
                          - generic [ref=e316]: Smartwatch
                        - generic [ref=e317]: Disconnected · Last synced 07/16/2026
                      - generic [ref=e318]: Health Connect connected
        - generic [ref=e322]:
          - generic [ref=e323]: © 2026 XSpan AI. All rights reserved.
          - generic [ref=e324]: Version 1.24.5
```

# Test source

```ts
  9   |     private readonly userName: Locator;
  10  |     private readonly tabList: Locator;
  11  |     private readonly timeWindowOptions: Locator;
  12  |     private readonly exportCSV: Locator;
  13  |     private readonly veiwHealthPassportReport: Locator;
  14  | 
  15  | 
  16  |     constructor(page: Page) {
  17  |         super(page);
  18  | 
  19  |         this.userName = this.page.locator(`//*[contains(@class,'flex items-center')]/div`).getByRole('heading', { level: 1 });
  20  |         this.tabList = this.page.locator(`//div[contains(@class,'bg-panel-header')]//div[@role='tablist']/button`);
  21  |         this.timeWindowOptions = this.page.getByText('Time Window').locator(`..//button`);
  22  |         this.exportCSV = this.page.locator(`//div[contains(@class,'bg-panel')]`).getByText('Export CSV');
  23  |         this.veiwHealthPassportReport = this.page.getByRole('button', { name: 'View Health Passport Report' });
  24  | 
  25  |     }
  26  | 
  27  |     async selectDays(name: string) {
  28  |         let days = await this.page.locator(`//div[contains(@class,'bg-panel')]`).getByText(name);
  29  |         await days.click()
  30  | 
  31  |     }
  32  | 
  33  |     async getTabText(): Promise<string[]> {
  34  | 
  35  |         await this.tabList.first().waitFor({
  36  |             state: 'visible'
  37  |         });
  38  | 
  39  |         return (await this.tabList.allTextContents())
  40  |             .map(text => text.trim());
  41  |     }
  42  | 
  43  |     async getTimeWindowsOptionText(): Promise<string[]> {
  44  |         let tabName;
  45  |         tabName = await this.tabList.allTextContents();
  46  |         return tabName;
  47  |     }
  48  | 
  49  |     async clickExportBtn(downloadPath: string): Promise<string> {
  50  |         const [download] = await Promise.all([
  51  |             this.page.waitForEvent('download'),
  52  |             this.exportCSV.click()
  53  |         ]);
  54  |         const filePath = path.join(downloadPath, await download.suggestedFilename());
  55  |         await download.saveAs(filePath);
  56  |         return filePath;
  57  |     }
  58  | 
  59  |     async viewHealthPassport(): Promise<string> {
  60  |         // Wait for the new PDF tab/window while clicking the button
  61  |         const [pdfPage] = await Promise.all([
  62  |             this.page.context().waitForEvent('page'),
  63  |             this.veiwHealthPassportReport.click()
  64  |         ]);
  65  |         await pdfPage.waitForLoadState('load');
  66  |         const pdfContent = await pdfPage.locator('body').innerText();
  67  |         return pdfContent;
  68  |     }
  69  | 
  70  | 
  71  |     async viewHealthPassport4(): Promise<string> {
  72  |         const context = this.page.context();
  73  | 
  74  |         const [pdfPage] = await Promise.all([
  75  |             context.waitForEvent('page'),
  76  |             this.veiwHealthPassportReport.click()
  77  |         ]);
  78  |         // await pdfPage.waitForLoadState('domcontentloaded');
  79  |         await this.page.waitForTimeout(4000);
  80  |         const pdfUrl = pdfPage.url();
  81  |         console.log('PDF URL:', pdfUrl);
  82  |         // Get PDF using the browser context
  83  |         const response = await context.request.get(pdfUrl);
  84  |         if (!response.ok()) {
  85  |             throw new Error(
  86  |                 `Failed to download PDF: ${response.status()} ${response.statusText()}`
  87  |             );
  88  |         }
  89  |         // Get PDF as Buffer
  90  |         const pdfBuffer = await response.body();
  91  |         // Parse PDF
  92  |         const parser = new PDFParse({
  93  |             data: pdfBuffer
  94  |         });
  95  |         const result = await parser.getText();
  96  |         //  console.log('PDF text:', result.text);
  97  |         await parser.destroy();
  98  |         return result.text;
  99  |     }
  100 | 
  101 |     async viewHealthPassportt(): Promise<string> {
  102 |     const context = this.page.context();
  103 | 
  104 |     const [pdfPage] = await Promise.all([
  105 |         context.waitForEvent('page'),
  106 |         this.veiwHealthPassportReport.click()
  107 |     ]);
  108 | 
> 109 |     await pdfPage.waitForLoadState('domcontentloaded', {
      |                   ^ TimeoutError: page.waitForLoadState: Timeout 30000ms exceeded.
  110 |         timeout: 30000
  111 |     });
  112 | 
  113 |     const pdfUrl = pdfPage.url();
  114 | 
  115 |     console.log('PDF URL:', pdfUrl);
  116 | 
  117 |     if (!pdfUrl || pdfUrl === 'about:blank') {
  118 |         throw new Error(
  119 |             `PDF page did not navigate to a valid URL. Current URL: ${pdfUrl}`
  120 |         );
  121 |     }
  122 | 
  123 |     const response = await context.request.get(pdfUrl);
  124 | 
  125 |     if (!response.ok()) {
  126 |         throw new Error(
  127 |             `Failed to download PDF: ${response.status()} ${response.statusText()}`
  128 |         );
  129 |     }
  130 | 
  131 |     const pdfBuffer = await response.body();
  132 | 
  133 |     if (pdfBuffer.length === 0) {
  134 |         throw new Error('PDF response is empty');
  135 |     }
  136 | 
  137 |     const parser = new PDFParse({
  138 |         data: pdfBuffer
  139 |     });
  140 | 
  141 |     try {
  142 |         const result = await parser.getText();
  143 |         return result.text;
  144 |     } finally {
  145 |         await parser.destroy();
  146 |     }
  147 | }
  148 | 
  149 | 
  150 |     async clickOnTab(tabName: string): Promise<void> {
  151 |         await this.page.getByRole('tab', { name: tabName }).click();
  152 |     }
  153 | 
  154 |     async downloadCsv(
  155 |         type: string,
  156 |         downloadPath: string
  157 |     ): Promise<string> {
  158 | 
  159 |         const [download] = await Promise.all([
  160 |             this.page.waitForEvent('download'),
  161 |             this.page.getByRole('button', {
  162 |                 name: `Download ${type}`
  163 |             }).click()
  164 |         ]);
  165 | 
  166 |         const filePath = path.join(
  167 |             downloadPath,
  168 |             await download.suggestedFilename()
  169 |         );
  170 | 
  171 |         await download.saveAs(filePath);
  172 | 
  173 |         return filePath;
  174 |     }
  175 | 
  176 | }
```