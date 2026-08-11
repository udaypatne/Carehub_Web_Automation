import { test as baseTest } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { CareProgramPage } from "../pages/CareProgramPage"
import { DashboardPage } from "../pages/DashboardPage"
import { BasePage } from "../pages/BasePage"

//define type for page fixtures:

type pageFixtures = {
    basePage: BasePage,
    loginPage: LoginPage,
    dashboardPage: DashboardPage,
    careProgramPage: CareProgramPage;
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

});

export { expect } from '@playwright/test';