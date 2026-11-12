import path from "path";
import { Page } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";

/**
 * Roles that tests/auth.setup.ts signs in once per run and saves. A test file
 * starts signed in as one of them with
 *   test.use({ storageState: authFile('ORG_ADMIN') });
 * To use another role this way, add it here first.
 */
export const SESSION_ROLES = ["ORG_ADMIN", "PHYSICIAN_ROLE"];

const ENV = process.env.ENV || "qa";

/**
 * Where `role`'s saved session lives: playwright/.auth/<env>-<role>.json.
 * Gitignored. It holds live CareHub session tokens: never share or commit it.
 */
export function authFile(role: string): string {
    if (!SESSION_ROLES.includes(role)) {
        throw new Error(`No saved session for ${role}: add it to SESSION_ROLES in src/utils/authState.ts.`);
    }
    return path.join(__dirname, "..", "..", "playwright", ".auth", `${ENV}-${role.toLowerCase()}.json`);
}

/** Opens `url` with the saved session; fails clearly if CareHub has signed it out. */
export async function openSignedIn(page: Page, url = "/dashboard"): Promise<void> {
    await page.goto(url);
    await waitUntilSignedIn(page);
}

/**
 * Waits for CareHub's sidebar; throws if CareHub shows its sign-in page instead.
 * Not for the moment right after a sign-in: CareHub then shows the sign-in form
 * ("Signing in...", then idle) for a moment before it moves to the dashboard, so
 * wait for the URL to leave /provider/ first.
 */
export async function waitUntilSignedIn(page: Page): Promise<void> {
    const menu = new DashboardPage(page).firstMenuTab();
    const signInButton = page.getByRole("button", { name: "Sign in", exact: true });
    await menu.or(signInButton).filter({ visible: true }).first().waitFor({ timeout: 30_000 });
    if (await signInButton.isVisible()) {
        throw new Error(
            "Not signed in: CareHub showed its sign-in page. If this was a saved session, it has " +
            "ended: delete playwright/.auth/ and run again to sign in afresh.",
        );
    }
}
