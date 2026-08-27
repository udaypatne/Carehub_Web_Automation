import { test, expect } from '../src/fixtures/page';
import fs from 'fs';
import path from 'path';

const userEmail = 'udaypatneit@gmail.com';

const downloadPath = path.join(
    process.cwd(),
    'downloads',
    'Health_Passport',
    'Water Intake'
);

const patientRegex =
    /^[A-Za-z]+(?: [A-Za-z]+)+$/;

const dateRegex =
    /^(0[1-9]|1[0-2])[\/-](0[1-9]|[12]\d|3[01])[\/-]\d{4}$/;

const waterRegex =
    /^\d+(?:\.\d+)?$/;


// ============================================================
// TEST SUITE
// ============================================================
//
// IMPORTANT:
// Do NOT use test.describe.serial() here.
//
// We want:
// 1. Tests to run sequentially
// 2. But if one test fails, remaining tests should continue.
//
// We achieve sequential execution with:
// --workers=1
//
// Command:
// npx playwright test --grep "Water Intake - 90 Days CSV" --workers=1
//
// ============================================================

test.describe.serial('Water Intake - 90 Days CSV', () => {

    test.beforeEach(async ({
        loginPage,
        dashboardPage,
        page
    }) => {

        await loginPage.navToLoginPage();

        await loginPage.login(
            process.env.ORG_ADMIN!,
            process.env.PASSWORD!
        );
        await page.waitForURL('/dashboard');
        await loginPage.disableTutorial();
        await dashboardPage.selectTab('Health Passport');
    });


    async function openWaterIntakeAndDownload(
        healthUserListPage: any,
        userHealthPassportPage: any
    ): Promise<string> {

        await healthUserListPage.searchUser(userEmail);

        await healthUserListPage.selectUser(userEmail);

        await userHealthPassportPage.clickOnTab(
            'Water Intake'
        );

        await userHealthPassportPage.selectDays(
            '90 Days'
        );

        const filePath =
            await userHealthPassportPage.downloadCsv(
                'Water Intake',
                downloadPath
            );

        const csvContent =
            fs.readFileSync(
                filePath,
                'utf-8'
            );

        console.log(
            '\nWater Intake CSV Content:\n',
            csvContent
        );

        return csvContent;
    }

    function getRows(
        csvContent: string
    ): string[] {

        return csvContent
            .split(/\r?\n/)
            .map(row => row.trim())
            .filter(row => row.length > 0);
    }


    function getColumns(
        row: string
    ): string[] {

        return row
            .split(',')
            .map(column => column.trim());
    }


    function getHeaderIndex(
        rows: string[]
    ): number {

        const expectedHeader =
            'Patient,Date,Water (ml)';

        return rows.findIndex(
            row => row === expectedHeader
        );
    }

    function validateHeader(
        rows: string[],
        csvContent: string
    ): number {

        const headerIndex =
            getHeaderIndex(rows);

        expect(
            headerIndex,
            'Water Intake CSV header should exist'
        ).toBeGreaterThanOrEqual(0);

        if (headerIndex === -1) {

            throw new Error(
                `Water Intake CSV header was not found.\n\n` +
                `Expected:\nPatient,Date,Water (ml)\n\n` +
                `Actual CSV:\n${csvContent}`
            );
        }

        return headerIndex;
    }

    test(
        '01 - Download Water Intake CSV and verify header',
        async ({
            healthUserListPage,
            userHealthPassportPage
        }) => {

            const csvContent =
                await openWaterIntakeAndDownload(
                    healthUserListPage,
                    userHealthPassportPage
                );

            const rows =
                getRows(csvContent);

            validateHeader(
                rows,
                csvContent
            );
        }
    );


    test(
        '02 - Verify Water Intake CSV title',
        async ({
            healthUserListPage,
            userHealthPassportPage
        }) => {

            const csvContent =
                await openWaterIntakeAndDownload(
                    healthUserListPage,
                    userHealthPassportPage
                );

            const rows =
                getRows(csvContent);

            expect(
                rows[0],
                'CSV should contain Water Intake title'
            ).toBe('Water Intake');
        }
    );

    test(
        '03 - Verify Water Intake CSV contains records',
        async ({
            healthUserListPage,
            userHealthPassportPage
        }) => {

            const csvContent =
                await openWaterIntakeAndDownload(
                    healthUserListPage,
                    userHealthPassportPage
                );

            const rows =
                getRows(csvContent);

            const headerIndex =
                validateHeader(
                    rows,
                    csvContent
                );

            const dataRows =
                rows.slice(
                    headerIndex + 1
                );

            console.log(
                `Total Water Intake records found: ${dataRows.length}`
            );

            expect(
                dataRows.length,
                'Water Intake CSV should contain at least one record'
            ).toBeGreaterThan(0);
        }
    );


    test(
        '04 - Verify Water Intake CSV column count',
        async ({
            healthUserListPage,
            userHealthPassportPage
        }) => {

            const csvContent =
                await openWaterIntakeAndDownload(
                    healthUserListPage,
                    userHealthPassportPage
                );

            const rows =
                getRows(csvContent);

            const headerIndex =
                validateHeader(
                    rows,
                    csvContent
                );

            const dataRows =
                rows.slice(
                    headerIndex + 1
                );

            for (
                let i = 0;
                i < dataRows.length;
                i++
            ) {

                const rowNumber =
                    headerIndex + i + 2;

                const columns =
                    getColumns(
                        dataRows[i]
                    );

                expect(
                    columns.length,
                    `Row ${rowNumber}: Expected 3 columns`
                ).toBe(3);
            }
        }
    );


    test(
        '05 - Verify Patient values in Water Intake CSV',
        async ({
            healthUserListPage,
            userHealthPassportPage
        }) => {

            const csvContent =
                await openWaterIntakeAndDownload(
                    healthUserListPage,
                    userHealthPassportPage
                );

            const rows =
                getRows(csvContent);

            const headerIndex =
                validateHeader(
                    rows,
                    csvContent
                );

            const dataRows =
                rows.slice(
                    headerIndex + 1
                );

            for (
                let i = 0;
                i < dataRows.length;
                i++
            ) {

                const rowNumber =
                    headerIndex + i + 2;

                const columns =
                    getColumns(
                        dataRows[i]
                    );

                if (columns.length !== 3) {
                    continue;
                }

                const patient =
                    columns[0];

                expect(
                    patient,
                    `Row ${rowNumber}: Invalid Patient`
                ).toMatch(
                    patientRegex
                );
            }
        }
    );


    test(
        '06 - Verify Date values in Water Intake CSV',
        async ({
            healthUserListPage,
            userHealthPassportPage
        }) => {

            const csvContent =
                await openWaterIntakeAndDownload(
                    healthUserListPage,
                    userHealthPassportPage
                );

            const rows =
                getRows(csvContent);

            const headerIndex =
                validateHeader(
                    rows,
                    csvContent
                );

            const dataRows =
                rows.slice(
                    headerIndex + 1
                );

            for (
                let i = 0;
                i < dataRows.length;
                i++
            ) {

                const rowNumber =
                    headerIndex + i + 2;

                const columns =
                    getColumns(
                        dataRows[i]
                    );

                if (columns.length !== 3) {
                    continue;
                }

                const date =
                    columns[1];

                expect(
                    date,
                    `Row ${rowNumber}: Invalid Date`
                ).toMatch(
                    dateRegex
                );
            }
        }
    );

    test(
        '07 - Verify Water ml values in Water Intake CSV',
        async ({
            healthUserListPage,
            userHealthPassportPage
        }) => {

            const csvContent =
                await openWaterIntakeAndDownload(
                    healthUserListPage,
                    userHealthPassportPage
                );

            const rows =
                getRows(csvContent);

            const headerIndex =
                validateHeader(
                    rows,
                    csvContent
                );

            const dataRows =
                rows.slice(
                    headerIndex + 1
                );

            for (
                let i = 0;
                i < dataRows.length;
                i++
            ) {

                const rowNumber =
                    headerIndex + i + 2;

                const columns =
                    getColumns(
                        dataRows[i]
                    );

                if (columns.length !== 3) {
                    continue;
                }

                const water =
                    columns[2];

                if (water === '') {

                    console.log(
                        `Row ${rowNumber}: ` +
                        `Water (ml) is blank - skipping validation`
                    );

                    continue;
                }

                expect(
                    water,
                    `Row ${rowNumber}: Invalid Water (ml) value`
                ).toMatch(
                    waterRegex
                );
            }
        }
    );

    test(
        '08 - Verify CSV contains Water Intake',
        async ({
            healthUserListPage,
            userHealthPassportPage
        }) => {

            const csvContent =
                await openWaterIntakeAndDownload(
                    healthUserListPage,
                    userHealthPassportPage
                );

            expect(
                csvContent,
                'CSV should contain Water Intake'
            ).toContain(
                'Water Intake'
            );
        }
    );


    test(
        '09 - Verify CSV contains Patient',
        async ({
            healthUserListPage,
            userHealthPassportPage
        }) => {

            const csvContent =
                await openWaterIntakeAndDownload(
                    healthUserListPage,
                    userHealthPassportPage
                );

            expect(
                csvContent,
                'CSV should contain Patient'
            ).toContain(
                'Patient'
            );
        }
    );


    test(
        '10 - Verify CSV contains Date',
        async ({
            healthUserListPage,
            userHealthPassportPage
        }) => {

            const csvContent =
                await openWaterIntakeAndDownload(
                    healthUserListPage,
                    userHealthPassportPage
                );

            expect(
                csvContent,
                'CSV should contain Date'
            ).toContain(
                'Date'
            );
        }
    );


    test(
        '11 - Verify CSV contains Water ml',
        async ({
            healthUserListPage,
            userHealthPassportPage
        }) => {

            const csvContent =
                await openWaterIntakeAndDownload(
                    healthUserListPage,
                    userHealthPassportPage
                );

            expect(
                csvContent,
                'CSV should contain Water (ml)'
            ).toContain(
                'Water (ml)'
            );
        }
    );

});