import { test, expect } from '../src/fixtures/page'
import { CsvHelperr } from "../src/utils/CsvHelper";



let csvLoginData = CsvHelperr.readCsv('src/testData/loginData.csv');
for (let row of csvLoginData) {
    test(`@sanity @regression invalid user login JsonData - ${row.username}- ${row.password}`, async ({ loginPage }) => {
        await loginPage.navToLoginPage();
        await loginPage.login(row.username, row.password);
        expect(await loginPage.isLoginErrorDisplayed).toBeTruthy();
    })
};