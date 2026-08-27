import { test, expect } from '../src/fixtures/page'
import path from 'path';
import fs from 'fs';

const userEmail = 'udaypatneit@gmail.com';

test.beforeEach(async ({ loginPage, dashboardPage, page }) => {
    await loginPage.navToLoginPage();
    loginPage.login(process.env.ORG_ADMIN!, process.env.PASSWORD!);
    await page.waitForURL('/dashboard')
    await loginPage.disableTutorial();
    await dashboardPage.selectTab('Health Passport');

})

test('verify all tabs present ', async ({ healthUserListPage, userHealthPassportPage, page }) => {
    await page.waitForTimeout(2000)
    await healthUserListPage.searchUser(userEmail);
    await healthUserListPage.selectUser(userEmail);

    let tabText = await userHealthPassportPage.getTabText();
    let options =
        [
            'Overview', 'Weight',
            'Glucose', 'Sleep',
            'Activity', 'Nutrition',
            'Water Intake', 'Cardiac',
            'Blood Pressure', 'Temperature',
            'Biomarkers', 'Body Scan',
            'Medications', 'Supplements',
            'Reports'
        ]
    expect(tabText).toEqual(options);
})


test('verify Overview csv Data ', async ({ healthUserListPage, userHealthPassportPage, page, }) => {

    const downloadPath = path.join(
        process.cwd(),
        'downloads',
        'Health_Passport',
        'overview1'
    );
    await healthUserListPage.searchUser(userEmail);
    await healthUserListPage.selectUser(userEmail);
    await userHealthPassportPage.selectDays('90 Days');
    let bbb = await userHealthPassportPage.clickExportBtn(downloadPath);
    await page.waitForTimeout(2000);

    const filePath =
        await userHealthPassportPage.clickExportBtn(downloadPath);

    const csvContent = fs.readFileSync(filePath, 'utf-8');

    expect(csvContent).toContain('Uday Patne');
    expect.soft(csvContent).toContain('Weight');
    expect.soft(csvContent).toContain('Patient');
    expect.soft(csvContent).toContain('Date');
    expect.soft(csvContent).toContain('Weight (kg)');
    expect.soft(csvContent).toContain('Weight (lbs)');
    expect.soft(csvContent).toContain('BMI');
    expect.soft(csvContent).toContain('Body Fat %');
    expect.soft(csvContent).toContain('Source');


    //Glucose
    expect.soft(csvContent).toContain('Glucose');
    expect.soft(csvContent).toContain('Patient');
    expect.soft(csvContent).toContain('Date');
    expect.soft(csvContent).toContain('Avg');
    expect.soft(csvContent).toContain('Glucose');
    expect.soft(csvContent).toContain('Min Glucose');
    expect.soft(csvContent).toContain('Max Glucose');
    expect.soft(csvContent).toContain('Sample Count');

    //Sleep
    expect.soft(csvContent).toContain('Sleep');
    expect.soft(csvContent).toContain('Patient');
    expect.soft(csvContent).toContain('Date');
    expect.soft(csvContent).toContain('Metric');
    expect.soft(csvContent).toContain('Value');
    expect.soft(csvContent).toContain('Unit');

    //Activity
    expect.soft(csvContent).toContain('Activity');
    expect.soft(csvContent).toContain('Patient');
    expect.soft(csvContent).toContain('Date');
    expect.soft(csvContent).toContain('Metric');
    expect.soft(csvContent).toContain('Value');
    expect.soft(csvContent).toContain('Carbohydrates (g)');
    expect.soft(csvContent).toContain('Unit');


    //Nutrition
    expect.soft(csvContent).toContain('Nutrition');
    expect.soft(csvContent).toContain('Patient');
    expect.soft(csvContent).toContain('Date');
    expect.soft(csvContent).toContain('Calories');
    expect.soft(csvContent).toContain('Protein (g)');
    expect.soft(csvContent).toContain('Carbohydrates (g)');
    expect.soft(csvContent).toContain('Fat (g)');
    expect.soft(csvContent).toContain('Fiber (g)');


    //Water Intake
    expect.soft(csvContent).toContain('Water Intake');
    expect.soft(csvContent).toContain('Patient');
    expect.soft(csvContent).toContain('Date');
    expect.soft(csvContent).toContain('Water (ml)');

    //Cardiac
    expect.soft(csvContent).toContain('Cardiac');
    expect.soft(csvContent).toContain('Patient');
    expect.soft(csvContent).toContain('Date');
    expect.soft(csvContent).toContain('Metric');
    expect.soft(csvContent).toContain('Metric');

    //Blood Pressure
    expect.soft(csvContent).toContain('Blood Pressure');
    expect.soft(csvContent).toContain('Patient');
    expect.soft(csvContent).toContain('Date');
    expect.soft(csvContent).toContain('Time');
    expect.soft(csvContent).toContain('Systolic (mmHg)');
    expect.soft(csvContent).toContain('Diastolic (mmHg)');
    expect.soft(csvContent).toContain('Source');
    expect.soft(csvContent).toContain('Device');

    //Temprature
    expect.soft(csvContent).toContain('Temperature');
    expect.soft(csvContent).toContain('Patient');
    expect.soft(csvContent).toContain('Date');
    expect.soft(csvContent).toContain('Body Temp (°C');
    expect.soft(csvContent).toContain('Skin Temp Avg (°C)');
    expect.soft(csvContent).toContain('Skin Temp Min (°C)');
    expect.soft(csvContent).toContain('Skin Temp Max (°C)');
    expect.soft(csvContent).toContain('Source');

    //Biomarkers
    expect.soft(csvContent).toContain('Biomarkers');
    expect.soft(csvContent).toContain('Patient');
    expect.soft(csvContent).toContain('Biomarker');
    expect.soft(csvContent).toContain('Category');
    expect.soft(csvContent).toContain('Value');
    expect.soft(csvContent).toContain('Unit');
    expect.soft(csvContent).toContain('Reference Min');
    expect.soft(csvContent).toContain('Reference Max');
    expect.soft(csvContent).toContain('Test Date');
    expect.soft(csvContent).toContain('Lab');

    //Body Scan
    expect.soft(csvContent).toContain('Body Scan');
    expect.soft(csvContent).toContain('Patient');
    expect.soft(csvContent).toContain('Metric');
    expect.soft(csvContent).toContain('Value');
    expect.soft(csvContent).toContain('Unit');
    expect.soft(csvContent).toContain('Scan Date');


    //Medications
    expect(csvContent).toContain('Medications');
    expect.soft(csvContent).toContain('Patient');
    expect.soft(csvContent).toContain('Medication');
    expect.soft(csvContent).toContain('Frequency');
    expect.soft(csvContent).toContain('Prescriber');
    expect.soft(csvContent).toContain('Start Date');
    expect.soft(csvContent).toContain('Status');

    expect.soft(csvContent).toContain('Source');

})


test('verify 30 days health passport report PDF data ', async ({ healthUserListPage, userHealthPassportPage, basePage }) => {

    await healthUserListPage.searchUser(userEmail);
    await healthUserListPage.selectUser(userEmail);
    await userHealthPassportPage.selectDays('30 Days');

    let result = await userHealthPassportPage.viewHealthPassport4();
    await basePage.waitForTime(2000);
    const reportPeriodRegex =
        /Report Period:\s*(\d+)\s*days;\s*(\d{2}\/\d{2}\/\d{4})\s*-\s*(\d{2}\/\d{2}\/\d{4})/;

    const match = result.match(reportPeriodRegex);
    expect(match).not.toBeNull();

    const periodDays = match![1];
    const startDate = match![2];
    const endDate = match![3];

    // Today's date
    const today = new Date();

    const expectedDate =
        `${String(today.getMonth() + 1).padStart(2, '0')}/` +
        `${String(today.getDate()).padStart(2, '0')}/` +
        `${today.getFullYear()}`;

    console.log('Period days:', periodDays);
    console.log('Start date:', startDate);
    console.log('End date:', endDate);
    console.log('Expected date:', expectedDate);

    // Assertions
    expect(periodDays).toBe('30');
    expect(endDate).toBe(endDate);

    // Main report fields
    expect.soft(result).toMatch(/Report Period:\s*.+/);
    expect.soft(result).toMatch(/Patient:\s*Uday Patne/);
    expect.soft(result).toMatch(/Email:\s*udaypatneit@gmail\.com/);

    // Section headers
    expect.soft(result).toContain('Blood Pressure');
    expect.soft(result).toContain('Nutrition');
    expect.soft(result).toContain('Cardiometabolic');
    expect.soft(result).toContain('Sleep');
    expect.soft(result).toContain('Activity');
    expect.soft(result).toContain('Engagement');

    // subheaders:
    expect.soft(result).toContain('Resting Heart Rate (RHR)');
    expect.soft(result).toContain('Heart Rate Variability (HRV)');

    // Blood Pressure - dynamic numeric values
    expect.soft(result).toMatch(
        /Latest:\s*\d+\/\d+\s*mmHg/
    );

    expect.soft(result).toMatch(
        /Avg:\s*\d+\/\d+\s*mmHg/
    );

    // 1. Average daily calories
    expect.soft(result).toMatch(
        /Avg daily calories:\s*↓\s*~\d+(?:\.\d+)?%\s*over\s*30\s*days/
    );

    // 2. Cardiometabolic
    expect.soft(result).toMatch(
        /Baseline avg:\s*\d+(?:\.\d+)?\s*bpm\s*Current avg:\s*\d+(?:\.\d+)?\s*bpm/
    );

    // 3. Average sleep
    expect.soft(result).toMatch(
        /Avg sleep:\s*\d+(?:\.\d+)?\s*→\s*\d+(?:\.\d+)?\s*hrs\/night/
    );

    // 4. Activity
    expect.soft(result).toMatch(
        /Activity\s+(?:increased|decreased),\s*on\s*average,\s*by\s*\d+(?:\.\d+)?\s*hours?\s*per\s*week/
    );

    // 5. Engagement
    expect.soft(result).toMatch(
        /\d+(?:\.\d+)?%\s*engagement\s*over\s*30\s*days\s*·\s*\d+\s*active,\s*\d+\s*passive,\s*\d+\s*inactive\s*days/
    );

})

test('verify 90 days health passport report PDF data ', async ({ healthUserListPage, userHealthPassportPage, basePage }) => {

    await healthUserListPage.searchUser(userEmail);
    await healthUserListPage.selectUser(userEmail);
    await userHealthPassportPage.selectDays('90 Days');

    let result = await userHealthPassportPage.viewHealthPassport4();
    await basePage.waitForTime(2000);
    const reportPeriodRegex =
        /Report Period:\s*(\d+)\s*days;\s*(\d{2}\/\d{2}\/\d{4})\s*-\s*(\d{2}\/\d{2}\/\d{4})/;

    const match = result.match(reportPeriodRegex);
    expect(match).not.toBeNull();

    const periodDays = match![1];
    const startDate = match![2];
    const endDate = match![3];
    // Today's date
    const today = new Date();
    const expectedDate =
        `${String(today.getMonth() + 1).padStart(2, '0')}/` +
        `${String(today.getDate()).padStart(2, '0')}/` +
        `${today.getFullYear()}`;

    console.log('Period days:', periodDays);
    console.log('Start date:', startDate);
    console.log('End date:', endDate);
    console.log('Expected date:', expectedDate);

    expect(periodDays).toBe('90');
    expect(endDate).toBe(endDate);

    expect.soft(result).toMatch(/Report Period:\s*.+/);
    expect.soft(result).toMatch(/Patient:\s*Uday Patne/);
    expect.soft(result).toMatch(/Email:\s*udaypatneit@gmail\.com/);

    expect.soft(result).toContain('Blood Pressure');
    expect.soft(result).toContain('Nutrition');
    expect.soft(result).toContain('Cardiometabolic');
    expect.soft(result).toContain('Sleep');
    expect.soft(result).toContain('Activity');
    expect.soft(result).toContain('Engagement');

    expect.soft(result).toContain('Resting Heart Rate (RHR)');
    expect.soft(result).toContain('Heart Rate Variability (HRV)');


    expect.soft(result).toMatch(
        /Latest:\s*\d+\/\d+\s*mmHg/
    );

    expect.soft(result).toMatch(
        /Avg:\s*\d+\/\d+\s*mmHg/
    );

    expect.soft(result).toMatch(
        /Avg daily calories:\s*↓\s*~\d+(?:\.\d+)?%\s*over\s*90\s*days/
    );

    expect.soft(result).toMatch(
        /Baseline avg:\s*\d+(?:\.\d+)?\s*bpm\s*Current avg:\s*\d+(?:\.\d+)?\s*bpm/
    );

    expect.soft(result).toMatch(
        /Avg sleep:\s*\d+(?:\.\d+)?\s*→\s*\d+(?:\.\d+)?\s*hrs\/night/
    );

    expect.soft(result).toMatch(
        /Activity\s+(?:increased|decreased),\s*on\s*average,\s*by\s*\d+(?:\.\d+)?\s*hours?\s*per\s*week/
    );

    expect.soft(result).toMatch(
        /\d+(?:\.\d+)?%\s*engagement\s*over\s*90\s*days\s*·\s*\d+\s*active,\s*\d+\s*passive,\s*\d+\s*inactive\s*days/
    );

})


test('verify Weight csv ', async ({ healthUserListPage, userHealthPassportPage, basePage }) => {

    const downloadPath = path.join(
        process.cwd(),
        'downloads',
        'Health_Passport',
        'weight'
    );
    await healthUserListPage.searchUser(userEmail);
    await healthUserListPage.selectUser(userEmail);
    await userHealthPassportPage.clickOnTab('Weight');
    await basePage.waitForTime(2000);
    await userHealthPassportPage.selectDays('30 Days');
    const filePath = await userHealthPassportPage.downloadCsv('Weight', downloadPath);
    await basePage.waitForTime(2000);

    // Read downloaded CSV
    const csvContent = fs.readFileSync(filePath, 'utf-8');
    expect(csvContent).toContain('Uday Patne');
    expect.soft(csvContent).toContain('Weight');
    expect.soft(csvContent).toContain('Patient');
    expect.soft(csvContent).toContain('Date');
    expect.soft(csvContent).toContain('Weight (kg)');
    expect.soft(csvContent).toContain('Weight (lbs)');
    expect.soft(csvContent).toContain('BMI');
    expect.soft(csvContent).toContain('Body Fat %');
    expect.soft(csvContent).toContain('Source');

})

test('verify Weight csv  ', async ({
    healthUserListPage,
    userHealthPassportPage,
    basePage
}) => {

    const downloadPath = path.join(
        process.cwd(),
        'downloads',
        'Health_Passport',
        'weight'
    );

    const selectedDays = '30 Days';
    await healthUserListPage.searchUser(userEmail);
    await healthUserListPage.selectUser(userEmail);
    await userHealthPassportPage.clickOnTab('Weight');
    await basePage.waitForDomLoad();
    await userHealthPassportPage.selectDays(selectedDays);

    const filePath = await userHealthPassportPage.downloadCsv('Weight', downloadPath);

    await basePage.waitForDomLoad();
    const csvContent = fs.readFileSync(filePath, 'utf-8');
    const rows = csvContent
        .split(/\r?\n/)
        .map(row => row.trim())
        .filter(row => row.length > 0);

    const expectedHeader =
        'Patient,Date,Weight (kg),Weight (lbs),BMI,Body Fat %,Source';
    const headerIndex = rows.findIndex(
        row => row === expectedHeader
    );
    expect.soft(
        headerIndex,
        'Weight CSV header should exist'
    ).toBeGreaterThanOrEqual(0);

    if (headerIndex === -1) {
        throw new Error(
            `Expected CSV header was not found.\nActual CSV:\n${csvContent}`
        );
    }

    console.log(`CSV Header found at row: ${headerIndex + 1}`);

    expect.soft(
        rows[0],
        'CSV should contain Weight title'
    ).toBe('Weight');
    const patientRegex =
        /^[A-Za-z]+(?: [A-Za-z]+)+$/;

    const dateRegex =
        /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

    const optionalNumberRegex =
        /^$|^\d+(\.\d{1,2})?$/;

    const sourceRegex =
        /^(manual|health_connect|body_scan|ai_agent)$/;

    const dataRows = rows.slice(headerIndex + 1);

    console.log(
        `Total Weight records found: ${dataRows.length}`
    );

    expect.soft(
        dataRows.length,
        'Weight CSV should contain at least one data record'
    ).toBeGreaterThan(0);

    const csvDates: Date[] = [];
    const dateStrings: string[] = [];

    for (let i = 0; i < dataRows.length; i++) {
        const rowNumber = headerIndex + i + 2;
        const row = dataRows[i];
        const columns = row.split(',');

        expect.soft(
            columns.length,
            `Row ${rowNumber}: Expected 7 columns`
        ).toBe(7);

        const [patient, date, weightKg, weightLbs, bmi, bodyFat, source] = columns;

        expect.soft(
            patient,
            `Row ${rowNumber}: Invalid Patient`
        ).toMatch(patientRegex);

        expect.soft(
            date,
            `Row ${rowNumber}: Invalid Date`
        ).toMatch(dateRegex);

        if (date.match(dateRegex)) {

            const [month, day, year] =
                date.split('/').map(Number);

            const csvDate = new Date(
                year,
                month - 1,
                day
            );

            csvDates.push(csvDate);
            dateStrings.push(date);
        }

        expect.soft(
            weightKg,
            `Row ${rowNumber}: Invalid Weight (kg)`
        ).toMatch(optionalNumberRegex);

        expect.soft(
            weightLbs,
            `Row ${rowNumber}: Invalid Weight (lbs)`
        ).toMatch(optionalNumberRegex);


        expect.soft(
            bmi,
            `Row ${rowNumber}: Invalid BMI`
        ).toMatch(optionalNumberRegex);

        expect.soft(
            bodyFat, `Row ${rowNumber}: Invalid Body Fat %`).toMatch(optionalNumberRegex);

        expect.soft(source, `Row ${rowNumber}: Invalid Source`).toMatch(sourceRegex);
    }

    for (let i = 1; i < csvDates.length; i++) {
        expect.soft(
            csvDates[i].getTime(),
            `CSV date ${dateStrings[i]} should not be before ${dateStrings[i - 1]}`
        ).toBeGreaterThanOrEqual(
            csvDates[i - 1].getTime()
        );
    }

    const uniqueDates = new Set(dateStrings);

    expect.soft(
        uniqueDates.size, 'CSV should not contain duplicate dates').toBe(dateStrings.length);

    expect.soft(csvContent).toContain('Weight');
    expect.soft(csvContent).toContain('Patient');
    expect.soft(csvContent).toContain('Date');
    expect.soft(csvContent).toContain('Weight (kg)');
    expect.soft(csvContent).toContain('Weight (lbs)');
    expect.soft(csvContent).toContain('BMI');
    expect.soft(csvContent).toContain('Body Fat %');
    expect.soft(csvContent).toContain('Source');
});

test('verify Glucose csv for 30 days ', async ({ healthUserListPage, userHealthPassportPage, basePage }) => {

    const downloadPath = path.join(
        process.cwd(),
        'downloads',
        'Health_Passport',
        'Glucose'
    );
    await healthUserListPage.searchUser(userEmail);
    await healthUserListPage.selectUser(userEmail);
    await userHealthPassportPage.clickOnTab('Glucose');

    await userHealthPassportPage.selectDays('30 Days');
    const filePath = await userHealthPassportPage.downloadCsv('Glucose', downloadPath);

    const csvContent = fs.readFileSync(filePath, 'utf-8');
    const rows = csvContent
        .split(/\r?\n/)
        .map(row => row.trim())
        .filter(row => row.length > 0);

    const expectedHeader =
        'Patient,Date,Avg Glucose,Min Glucose,Max Glucose,Sample Count';

    const headerIndex = rows.findIndex(
        row => row === expectedHeader
    );

    expect.soft(
        headerIndex,
        'Glucose CSV header should exist'
    ).toBeGreaterThanOrEqual(0);

    if (headerIndex === -1) {
        throw new Error(
            `Glucose CSV header was not found.\nActual CSV:\n${csvContent}`
        );
    }

    expect.soft(
        rows[0],
        'CSV should contain Glucose title'
    ).toBe('Glucose');

    const patientRegex = /^[A-Za-z]+(?: [A-Za-z]+)+$/;
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    const optionalNumberRegex = /^(?:\d+(?:\.\d{1,2})?)?$/;
    const dataRows = rows.slice(headerIndex + 1);

    console.log(`Total Glucose records found: ${dataRows.length}`);

    expect.soft(dataRows.length, 'Glucose CSV should contain at least one record').toBeGreaterThan(0);

    const glucoseDates: string[] = [];

    for (let i = 0; i < dataRows.length; i++) {
        const rowNumber = headerIndex + i + 2;
        const row = dataRows[i];
        const columns = row.split(',');

        expect.soft(
            columns.length,
            `Row ${rowNumber}: Expected 6 columns`
        ).toBe(6);

        const [patient, date, avgGlucose, minGlucose, maxGlucose, sampleCount] = columns;

        expect.soft(
            patient,
            `Row ${rowNumber}: Invalid Patient`
        ).toMatch(patientRegex);

        expect.soft(
            date,
            `Row ${rowNumber}: Invalid Date`
        ).toMatch(dateRegex);

        expect.soft(
            avgGlucose,
            `Row ${rowNumber}: Invalid Avg Glucose`
        ).toMatch(optionalNumberRegex);

        expect.soft(
            minGlucose,
            `Row ${rowNumber}: Invalid Min Glucose`
        ).toMatch(optionalNumberRegex);

        expect.soft(
            maxGlucose,
            `Row ${rowNumber}: Invalid Max Glucose`
        ).toMatch(optionalNumberRegex);

        expect.soft(
            sampleCount,
            `Row ${rowNumber}: Invalid Sample Count`
        ).toMatch(optionalNumberRegex);


        if (date.match(dateRegex)) {
            glucoseDates.push(date);
        }
    }

    const uniqueDates = new Set(glucoseDates);

    expect.soft(
        uniqueDates.size,
        'Glucose CSV should not contain duplicate dates'
    ).toBe(glucoseDates.length);

    expect.soft(csvContent).toContain('Glucose');
    expect.soft(csvContent).toContain('Patient');
    expect.soft(csvContent).toContain('Date');
    expect.soft(csvContent).toContain('Avg Glucose');
    expect.soft(csvContent).toContain('Min Glucose');
    expect.soft(csvContent).toContain('Max Glucose');
    expect.soft(csvContent).toContain('Sample Count');

});

test('verify 90 days of data for Glucose ', async ({ healthUserListPage, userHealthPassportPage, basePage }) => {

    const downloadPath = path.join(
        process.cwd(),
        'downloads',
        'Health_Passport',
        'Glucose'
    );
    await healthUserListPage.searchUser(userEmail);
    await healthUserListPage.selectUser(userEmail);
    await userHealthPassportPage.clickOnTab('Glucose');

    await userHealthPassportPage.selectDays('90 Days');
    const filePath = await userHealthPassportPage.downloadCsv('Glucose', downloadPath);

    const csvContent = fs.readFileSync(filePath, 'utf-8');
    const rows = csvContent
        .split(/\r?\n/)
        .map(row => row.trim())
        .filter(row => row.length > 0);

    const expectedHeader =
        'Patient,Date,Avg Glucose,Min Glucose,Max Glucose,Sample Count';

    const headerIndex = rows.findIndex(
        row => row === expectedHeader
    );

    expect.soft(
        headerIndex,
        'Glucose CSV header should exist'
    ).toBeGreaterThanOrEqual(0);

    if (headerIndex === -1) {
        throw new Error(
            `Glucose CSV header was not found.\nActual CSV:\n${csvContent}`
        );
    }

    expect.soft(
        rows[0],
        'CSV should contain Glucose title'
    ).toBe('Glucose');

    const patientRegex = /^[A-Za-z]+(?: [A-Za-z]+)+$/;
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    const optionalNumberRegex = /^(?:\d+(?:\.\d{1,2})?)?$/;
    const dataRows = rows.slice(headerIndex + 1);

    console.log(`Total Glucose records found: ${dataRows.length}`);

    expect.soft(dataRows.length, 'Glucose CSV should contain at least one record').toBeGreaterThan(0);

    const glucoseDates: string[] = [];

    for (let i = 0; i < dataRows.length; i++) {
        const rowNumber = headerIndex + i + 2;
        const row = dataRows[i];
        const columns = row.split(',');

        expect.soft(
            columns.length,
            `Row ${rowNumber}: Expected 6 columns`
        ).toBe(6);

        const [patient, date, avgGlucose, minGlucose, maxGlucose, sampleCount] = columns;

        expect.soft(
            patient,
            `Row ${rowNumber}: Invalid Patient`
        ).toMatch(patientRegex);

        expect.soft(
            date,
            `Row ${rowNumber}: Invalid Date`
        ).toMatch(dateRegex);

        expect.soft(
            avgGlucose,
            `Row ${rowNumber}: Invalid Avg Glucose`
        ).toMatch(optionalNumberRegex);

        expect.soft(
            minGlucose,
            `Row ${rowNumber}: Invalid Min Glucose`
        ).toMatch(optionalNumberRegex);

        expect.soft(
            maxGlucose,
            `Row ${rowNumber}: Invalid Max Glucose`
        ).toMatch(optionalNumberRegex);

        expect.soft(
            sampleCount,
            `Row ${rowNumber}: Invalid Sample Count`
        ).toMatch(optionalNumberRegex);


        if (date.match(dateRegex)) {
            glucoseDates.push(date);
        }
    }

    const uniqueDates = new Set(glucoseDates);

    expect.soft(
        uniqueDates.size,
        'Glucose CSV should not contain duplicate dates'
    ).toBe(glucoseDates.length);

    expect.soft(csvContent).toContain('Glucose');
    expect.soft(csvContent).toContain('Patient');
    expect.soft(csvContent).toContain('Date');
    expect.soft(csvContent).toContain('Avg Glucose');
    expect.soft(csvContent).toContain('Min Glucose');
    expect.soft(csvContent).toContain('Max Glucose');
    expect.soft(csvContent).toContain('Sample Count');
});

test('verify 30 days of data for Glucose ', async ({ healthUserListPage, userHealthPassportPage }) => {

    const downloadPath = path.join(
        process.cwd(),
        'downloads',
        'Health_Passport',
        'Glucose'
    );
    await healthUserListPage.searchUser(userEmail);
    await healthUserListPage.selectUser(userEmail);
    await userHealthPassportPage.clickOnTab('Glucose');

    await userHealthPassportPage.selectDays('30 Days');
    const filePath = await userHealthPassportPage.downloadCsv('Glucose', downloadPath);

    const csvContent = fs.readFileSync(filePath, 'utf-8');

    const rows = csvContent
        .split(/\r?\n/)
        .map(row => row.trim())
        .filter(row => row.length > 0);

    const expectedHeader =
        'Patient,Date,Avg Glucose,Min Glucose,Max Glucose,Sample Count';

    const headerIndex = rows.findIndex(
        row => row === expectedHeader
    );

    expect.soft(
        headerIndex,
        'Glucose CSV header should exist'
    ).toBeGreaterThanOrEqual(0);

    if (headerIndex === -1) {
        throw new Error(
            `Glucose CSV header was not found.\nActual CSV:\n${csvContent}`
        );
    }

    expect.soft(
        rows[0],
        'CSV should contain Glucose title'
    ).toBe('Glucose');

    const patientRegex = /^[A-Za-z]+(?: [A-Za-z]+)+$/;
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    const optionalNumberRegex = /^(?:\d+(?:\.\d{1,2})?)?$/;
    const dataRows = rows.slice(headerIndex + 1);

    console.log(`Total Glucose records found: ${dataRows.length}`);

    expect.soft(dataRows.length, 'Glucose CSV should contain at least one record').toBeGreaterThan(0);

    const glucoseDates: string[] = [];

    for (let i = 0; i < dataRows.length; i++) {
        const rowNumber = headerIndex + i + 2;
        const row = dataRows[i];
        const columns = row.split(',');

        expect.soft(
            columns.length,
            `Row ${rowNumber}: Expected 6 columns`
        ).toBe(6);

        const [patient, date, avgGlucose, minGlucose, maxGlucose, sampleCount] = columns;

        expect.soft(
            patient,
            `Row ${rowNumber}: Invalid Patient`
        ).toMatch(patientRegex);

        expect.soft(
            date,
            `Row ${rowNumber}: Invalid Date`
        ).toMatch(dateRegex);

        expect.soft(
            avgGlucose,
            `Row ${rowNumber}: Invalid Avg Glucose`
        ).toMatch(optionalNumberRegex);

        expect.soft(
            minGlucose,
            `Row ${rowNumber}: Invalid Min Glucose`
        ).toMatch(optionalNumberRegex);

        expect.soft(
            maxGlucose,
            `Row ${rowNumber}: Invalid Max Glucose`
        ).toMatch(optionalNumberRegex);

        expect.soft(
            sampleCount,
            `Row ${rowNumber}: Invalid Sample Count`
        ).toMatch(optionalNumberRegex);


        if (date.match(dateRegex)) {
            glucoseDates.push(date);
        }
    }

    const uniqueDates = new Set(glucoseDates);

    expect.soft(
        uniqueDates.size,
        'Glucose CSV should not contain duplicate dates'
    ).toBe(glucoseDates.length);

    expect.soft(csvContent).toContain('Glucose');
    expect.soft(csvContent).toContain('Patient');
    expect.soft(csvContent).toContain('Date');
    expect.soft(csvContent).toContain('Avg Glucose');
    expect.soft(csvContent).toContain('Min Glucose');
    expect.soft(csvContent).toContain('Max Glucose');
    expect.soft(csvContent).toContain('Sample Count');

});


test('verify 90 days of data for Sleep', async ({ healthUserListPage, userHealthPassportPage }) => {
    const downloadPath = path.join(
        process.cwd(),
        'downloads',
        'Health_Passport',
        'Sleep'
    );
    await healthUserListPage.searchUser(userEmail);
    await healthUserListPage.selectUser(userEmail);
    await userHealthPassportPage.clickOnTab('Sleep');
    await userHealthPassportPage.selectDays('90 Days');
    const filePath = await userHealthPassportPage.downloadCsv('Sleep', downloadPath);
    const csvContent = fs.readFileSync(filePath, 'utf-8');
    const rows = csvContent
        .split(/\r?\n/)
        .map(row => row.trim())
        .filter(row => row.length > 0);

    const expectedHeader =
        'Patient,Date,Metric,Value,Unit';

    const headerIndex = rows.findIndex(
        row => row === expectedHeader
    );

    expect.soft(headerIndex, 'Sleep CSV header should exist').toBeGreaterThanOrEqual(0);
    if (headerIndex === -1) {
        throw new Error(
            `Sleep CSV header was not found.\nActual CSV:\n${csvContent}`
        );
    }

    expect.soft(
        rows[0],
        'CSV should contain Sleep title'
    ).toBe('Sleep');

    const patientRegex = /^[A-Za-z]+(?: [A-Za-z]+)+$/;
    const dateRegex = /^(0[1-9]|1[0-2])[\/-](0[1-9]|[12]\d|3[01])[\/-]\d{4}$/;
    const sleepMetricRegex =
        /^(?:awake_min|time_in_bed_min|rem_sleep_min|light_sleep_min|deep_sleep_min|sleep_duration_hrs)$/;
    const valueRegex = /^\d+(?:\.\d+)?$/;
    const unitRegex = /^(?:min|hrs)$/;
    const dataRows = rows.slice(headerIndex + 1);

    expect.soft(dataRows.length, 'Sleep CSV should contain at least one record').toBeGreaterThan(0);
    const sleepDateMetricKeys: string[] = [];
    for (let i = 0; i < dataRows.length; i++) {
        const rowNumber = headerIndex + i + 2;
        const row = dataRows[i];
        const columns = row.split(',');
        expect.soft(columns.length, `Row ${rowNumber}: Expected 5 columns`).toBe(5);
        const [patient, date, metric, value, unit] = columns;
        expect.soft(
            patient,
            `Row ${rowNumber}: Invalid Patient`
        ).toMatch(patientRegex);


        expect.soft(
            date,
            `Row ${rowNumber}: Invalid Date`
        ).toMatch(dateRegex);

        expect.soft(
            metric,
            `Row ${rowNumber}: Invalid Sleep Metric`
        ).toMatch(sleepMetricRegex);


        expect.soft(
            value,
            `Row ${rowNumber}: Invalid Sleep Value`
        ).toMatch(valueRegex);

        expect.soft(
            unit,
            `Row ${rowNumber}: Invalid Sleep Unit`
        ).toMatch(unitRegex);


        if (
            date.match(dateRegex) &&
            metric.match(sleepMetricRegex)
        ) {
            sleepDateMetricKeys.push(
                `${date}-${metric}`
            );
        }
    }
    const uniqueDateMetricKeys =
        new Set(sleepDateMetricKeys);

    expect.soft(uniqueDateMetricKeys.size, 'Sleep CSV should not contain duplicate date and metric combinations'
    ).toBe(sleepDateMetricKeys.length);
    expect.soft(csvContent, 'CSV should contain Sleep data').toContain('Sleep');
    expect.soft(csvContent, 'CSV should contain Patient').toContain('Patient');
    expect.soft(csvContent, 'CSV should contain Date').toContain('Date');
    expect.soft(csvContent, 'CSV should contain Sleep Metric').toContain('Metric');
    expect.soft(csvContent, 'CSV should contain Value').toContain('Value');
    expect.soft(csvContent, 'CSV should contain Unit').toContain('Unit');
});


test('verify 90 days of data for Nutrition ', async ({ healthUserListPage, userHealthPassportPage }) => {

    const downloadPath = path.join(
        process.cwd(),
        'downloads',
        'Health_Passport',
        'Nutrition'
    );
    await healthUserListPage.searchUser(userEmail);
    await healthUserListPage.selectUser(userEmail);
    await userHealthPassportPage.clickOnTab('Nutrition');

    await userHealthPassportPage.selectDays('90 Days');
    const filePath = await userHealthPassportPage.downloadCsv('Nutrition', downloadPath);
    const csvContent = fs.readFileSync(filePath, 'utf-8');

    const rows = csvContent
        .split(/\r?\n/)
        .map(row => row.trim())
        .filter(row => row.length > 0);

    const expectedHeader =
        'Patient,Date,Calories,Protein (g),Carbohydrates (g),Fat (g),Fiber (g)';

    const headerIndex = rows.findIndex(row => row === expectedHeader);

    expect.soft(headerIndex, 'Nutrition CSV header should exist').toBeGreaterThanOrEqual(0);
    if (headerIndex === -1) {
        throw new Error(
            `Nutrition CSV header was not found.\nActual CSV:\n${csvContent}`
        );
    }

    expect.soft(
        rows[0],
        'CSV should contain Nutrition title'
    ).toBe('Nutrition');

    const patientRegex =
        /^[A-Za-z]+(?: [A-Za-z]+)+$/;


    const dateRegex =
        /^(0[1-9]|1[0-2])[\/-](0[1-9]|[12]\d|3[01])[\/-]\d{4}$/;

    const numericRegex =
        /^-?\d+(?:\.\d+)?$/;

    const dataRows = rows.slice(headerIndex + 1);

    console.log(
        `Total Nutrition records found: ${dataRows.length}`
    );

    expect.soft(dataRows.length, 'Nutrition CSV should contain at least one record').toBeGreaterThan(0);
    for (let i = 0; i < dataRows.length; i++) {
        const rowNumber = headerIndex + i + 2;
        const row = dataRows[i];

        const columns = row.split(',');
        expect.soft(columns.length, `Row ${rowNumber}: Expected 7 columns`).toBe(7);

        if (columns.length !== 7) {
            continue;
        }

        const [
            patient, date, calories, protein, carbohydrates, fat, fiber
        ] = columns.map(column => column.trim());

        expect.soft(
            patient,
            `Row ${rowNumber}: Invalid Patient`
        ).toMatch(patientRegex);

        expect.soft(date, `Row ${rowNumber}: Invalid Date`).toMatch(dateRegex);

        if (calories !== '') {

            expect.soft(calories,
                `Row ${rowNumber}: Invalid Calories value`
            ).toMatch(numericRegex);

        } else {

            console.log(
                `Row ${rowNumber}: Calories is blank - skipping validation`
            );
        }

        if (protein !== '') {

            expect.soft(
                protein,
                `Row ${rowNumber}: Invalid Protein value`
            ).toMatch(numericRegex);

        } else {
            console.log(
                `Row ${rowNumber}: Protein is blank - skipping validation`
            );
        }

        if (carbohydrates !== '') {

            expect.soft(
                carbohydrates,
                `Row ${rowNumber}: Invalid Carbohydrates value`
            ).toMatch(numericRegex);

        } else {

            console.log(
                `Row ${rowNumber}: Carbohydrates is blank - skipping validation`
            );
        }

        if (fat !== '') {

            expect.soft(
                fat,
                `Row ${rowNumber}: Invalid Fat value`
            ).toMatch(numericRegex);

        } else {

            console.log(
                `Row ${rowNumber}: Fat is blank - skipping validation`
            );
        }
        if (fiber !== '') {
            expect.soft(fiber, `Row ${rowNumber}: Invalid Fiber value`).toMatch(numericRegex);
        } else {
            console.log(`Row ${rowNumber}: Fiber is blank - skipping validation`
            );
        }
    }
    expect.soft(csvContent, 'CSV should contain Nutrition').toContain('Nutrition');
    expect.soft(csvContent, 'CSV should contain Patient').toContain('Patient');
    expect.soft(csvContent, 'CSV should contain Date').toContain('Date');
    expect.soft(csvContent, 'CSV should contain Calories').toContain('Calories');
    expect.soft(csvContent, 'CSV should contain Protein').toContain('Protein (g)');
    expect.soft(csvContent, 'CSV should contain Carbohydrates').toContain('Carbohydrates (g)');
    expect.soft(csvContent, 'CSV should contain Fat').toContain('Fat (g)');
    expect.soft(csvContent, 'CSV should contain Fiber').toContain('Fiber (g)');
});

test('verify 90 days of data for Water Intake', async ({
    healthUserListPage,
    userHealthPassportPage
}) => {

    const downloadPath = path.join(
        process.cwd(),
        'downloads',
        'Health_Passport',
        'Water Intake'
    );

    await healthUserListPage.searchUser(userEmail);
    await healthUserListPage.selectUser(userEmail);
    await userHealthPassportPage.clickOnTab('Water Intake');
    await userHealthPassportPage.selectDays('90 Days');
    const filePath = await userHealthPassportPage.downloadCsv('Water Intake', downloadPath);

    const csvContent = fs.readFileSync(filePath, 'utf-8');

    const rows = csvContent
        .split(/\r?\n/)
        .map(row => row.trim())
        .filter(row => row.length > 0);

    const expectedHeader =
        'Patient,Date,Water (ml)';

    const headerIndex = rows.findIndex(
        row => row === expectedHeader
    );

    expect.soft(
        headerIndex,
        'Water Intake CSV header should exist'
    ).toBeGreaterThanOrEqual(0);

    if (headerIndex === -1) {
        throw new Error(
            `Water Intake CSV header was not found.\nActual CSV:\n${csvContent}`
        );
    }

    expect.soft(
        rows[0],
        'CSV should contain Water Intake title'
    ).toBe('Water Intake');

    const patientRegex =
        /^[A-Za-z]+(?: [A-Za-z]+)+$/;

    const dateRegex =
        /^(0[1-9]|1[0-2])[\/-](0[1-9]|[12]\d|3[01])[\/-]\d{4}$/;
    const waterRegex =
        /^\d+(?:\.\d+)?$/;

    const dataRows = rows.slice(headerIndex + 1);
    console.log(
        `Total Water Intake records found: ${dataRows.length}`
    );

    expect.soft(dataRows.length, 'Water Intake CSV should contain at least one record').toBeGreaterThan(0);

    for (let i = 0; i < dataRows.length; i++) {
        const rowNumber = headerIndex + i + 2;
        const row = dataRows[i];
        const columns = row.split(',');

        expect.soft(columns.length, `Row ${rowNumber}: Expected 3 columns`).toBe(3);

        if (columns.length !== 3) {
            continue;
        }

        const [patient, date, water] = columns.map(column => column.trim());

        expect.soft(patient, `Row ${rowNumber}: Invalid Patient`).toMatch(patientRegex);
        expect.soft(date, `Row ${rowNumber}: Invalid Date`).toMatch(dateRegex);

        if (water !== '') {
            expect.soft(
                water,
                `Row ${rowNumber}: Invalid Water (ml) value`
            ).toMatch(waterRegex);

        } else {
            console.log(
                `Row ${rowNumber}: Water (ml) is blank - validation skipped`
            );
        }
    }
    expect.soft(csvContent, 'CSV should contain Water Intake').toContain('Water Intake');
    expect.soft(csvContent, 'CSV should contain Patient').toContain('Patient');
    expect.soft(csvContent, 'CSV should contain Date').toContain('Date');
    expect.soft(csvContent, 'CSV should contain Water (ml)').toContain('Water (ml)');
});


test('verify 90 days of data for Cardiac', async ({
    healthUserListPage,
    userHealthPassportPage
}) => {

    const downloadPath = path.join(
        process.cwd(),
        'downloads',
        'Health_Passport',
        'Cardiac'
    );

    await healthUserListPage.searchUser(userEmail);
    await healthUserListPage.selectUser(userEmail);
    await userHealthPassportPage.clickOnTab('Cardiac');
    await userHealthPassportPage.selectDays('90 Days');

    const filePath = await userHealthPassportPage.downloadCsv(
        'Cardiac',
        downloadPath
    );
    const csvContent = fs.readFileSync(filePath, 'utf-8');

    const rows = csvContent
        .split(/\r?\n/)
        .map(row => row.trim())
        .filter(row => row.length > 0);

    const expectedTitle = 'Cardiac';
    const expectedHeader ='Patient,Date,Metric,Value';

    expect.soft( rows[0], 'CSV should contain Cardiac title' ).toBe(expectedTitle);

    const headerIndex = rows.findIndex(row => row === expectedHeader);

    expect.soft( headerIndex,'Cardiac CSV header should exist').toBeGreaterThanOrEqual(0);

    if (headerIndex === -1) {
        throw new Error(
            `Cardiac CSV header was not found.\n\nActual CSV:\n${csvContent}`
        );
    }

    const patientRegex =/^[A-Za-z]+(?: [A-Za-z]+)+$/;
    const dateRegex =/^(0[1-9]|1[0-2])[\/-](0[1-9]|[12]\d|3[01])[\/-]\d{4}$/;
    const cardiacMetricRegex =/^(?:Resting Heart Rate|Heart Rate Variability \(RMSSD\)|Respiratory Rate)$/;
    const valueRegex =/^-?\d+(?:\.\d+)?$/;
    const dataRows = rows.slice(headerIndex + 1);

    expect.soft( dataRows.length,'Cardiac CSV should contain at least one record').toBeGreaterThan(0);

    const foundMetrics = new Set<string>();
    const dateMetricKeys: string[] = [];

    for (let i = 0; i < dataRows.length; i++) {
        const rowNumber = headerIndex + i + 2;
        const row = dataRows[i];
        console.log(`Validating Cardiac CSV row ${rowNumber}: ${row}`);
        const columns = row.split(',');

        expect.soft( columns.length, `Row ${rowNumber}: Expected 4 columns` ).toBe(4);

        if (columns.length !== 4) {
            continue;
        }

        const [ patient, date, metric, value] = columns.map(column => column.trim());

        expect.soft( patient,`Row ${rowNumber}: Invalid Patient "${patient}"`).toMatch(patientRegex);
        expect.soft( date, `Row ${rowNumber}: Invalid Date "${date}"`).toMatch(dateRegex);
        expect.soft( metric, `Row ${rowNumber}: Invalid Cardiac Metric "${metric}"` ).toMatch(cardiacMetricRegex);

        expect.soft( value,`Row ${rowNumber}: Invalid Cardiac Value "${value}"`).toMatch(valueRegex);

        expect.soft( value, `Row ${rowNumber}: Cardiac Value should not be empty`).not.toBe('');

        if (cardiacMetricRegex.test(metric)) {
            foundMetrics.add(metric);
        }

        if (
            dateRegex.test(date) &&
            cardiacMetricRegex.test(metric)
        ) {
            dateMetricKeys.push(
                `${date}-${metric}`
            );
        }
    }

    const expectedMetrics = [
        'Resting Heart Rate',
        'Heart Rate Variability (RMSSD)',
        'Respiratory Rate'
    ];

    for (const expectedMetric of expectedMetrics) {
        expect.soft(
            foundMetrics.has(expectedMetric),
            `Cardiac CSV should contain metric: ${expectedMetric}`
        ).toBe(true);
    }

    expect.soft(foundMetrics.size,
        'Cardiac CSV should contain exactly 3 different metrics').toBe(3);

    const uniqueDateMetricKeys =new Set(dateMetricKeys);
    expect.soft(uniqueDateMetricKeys.size, 'Cardiac CSV should not contain duplicate Date + Metric combinations'
    ).toBe(dateMetricKeys.length);

    expect.soft(csvContent,
        'CSV should contain Cardiac').toContain('Cardiac');

    expect.soft( csvContent, 'CSV should contain Patient').toContain('Patient');
    expect.soft( csvContent,'CSV should contain Date').toContain('Date');
    expect.soft(csvContent,'CSV should contain Metric').toContain('Metric');
    expect.soft( csvContent, 'CSV should contain Value').toContain('Value');

    expect.soft(csvContent, 'CSV should contain Resting Heart Rate').toContain('Resting Heart Rate');
    expect.soft(csvContent, 'CSV should contain Heart Rate Variability (RMSSD)' ).toContain('Heart Rate Variability (RMSSD)');
    expect.soft(csvContent,
        'CSV should contain Respiratory Rate'
    ).toContain('Respiratory Rate');

    console.log( 'Cardiac metrics found:',  [...foundMetrics] );
    console.log( 'Unique Date + Metric records:', uniqueDateMetricKeys.size );

});







