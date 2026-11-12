import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Runs scripts/setup-2fa.ts only. Not part of the test suite (playwright.config.ts
// runs ./tests). The set-up page shows each account's key, so nothing is
// recorded: no video, trace, screenshots or HTML/Allure reports.
const ENV = process.env.ENV || 'qa';
dotenv.config({ path: path.join(__dirname, '..', 'config', `.env.${ENV}`), quiet: true });

export default defineConfig({
    testDir: __dirname,
    testMatch: 'setup-2fa.ts',
    outputDir: path.join(__dirname, '..', 'test-results', 'setup-2fa'),
    workers: 1,
    retries: 0,
    timeout: 3 * 60_000,
    reporter: [['list']],
    use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL,
        headless: !!process.env.CI,
        video: 'off',
        trace: 'off',
        screenshot: 'off',
    },
});
