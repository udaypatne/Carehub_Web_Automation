import { test as baseTest } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { CareProgramPage } from "../pages/CareProgramPage"
import { DashboardPage } from "../pages/DashboardPage"
import { BasePage } from "../pages/BasePage"
import { userhealthpassportpage } from "../pages/HealthPassport/userhealthpassportpage"
import {healthuserlistpage} from "../pages/HealthPassport/healthuserlistpage"

//define type for page fixtures:

type pageFixtures = {
    basePage: BasePage,
    loginPage: LoginPage,
    dashboardPage: DashboardPage,
    careProgramPage: CareProgramPage;
    healthUserListPage: healthuserlistpage;
    userHealthPassportPage: userhealthpassportpage;
}

export let test = baseTest.extend<pageFixtures>({

    basePage: async ({ page }, use) => {
        let basePage = new BasePage(page);
        await use(basePage);
    },

    loginPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    dashboardPage: async ({ page }, use) => {
        let dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },

    careProgramPage: async ({ page }, use) => {
        let careProgramPage = new CareProgramPage(page);
        await use(careProgramPage);
    },

    healthUserListPage: async ({ page }, use) => {
        let healthUserListPage = new healthuserlistpage(page);
        await use(healthUserListPage);
    },

    userHealthPassportPage: async ({ page }, use) => {
        let userHealthPassportPage = new userhealthpassportpage(page);
        await use(userHealthPassportPage);
    },

});

export { expect } from '@playwright/test';