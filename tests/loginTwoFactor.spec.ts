import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { totp } from '../src/utils/totp';

// LoginPage's 2FA step against a FAKE CareHub sign-in page served by page.route,
// so these run offline and never touch QA. The fake copies the real page's
// fields (xspan-provider-portal-web ProviderLogin.tsx): #totp-code,
// "Verify & sign in", #totp-code-error, and /provider/mfa-setup when the
// account has no authenticator app. Like CareHub, it accepts each code once.
// Synthetic accounts and keys only.

const ORIGIN = 'https://carehub.test';
const SECRET = 'JBSWY3DPEHPK3PXPJBSWY3DPEHPK3PXP'; // synthetic
const WRONG_SECRET = 'KRSXG5CTMVRXEZLUKRSXG5CTMVRXEZLU'; // synthetic

const FAKE_LOGIN_PAGE = `<!doctype html><html><body>
<div id="signin">
  <label for="email">Email*</label><input id="email" type="text">
  <label for="password">Password*</label><input id="password" type="text">
  <button type="button" id="go">Sign in</button>
</div>
<div id="mfa" hidden>
  <label for="totp-code">6-digit code</label><input id="totp-code" type="text">
  <span id="err"></span>
  <button type="button" id="verify">Verify & sign in</button>
</div>
<div id="out"></div>
<section aria-label="Notifications alt+T"><ol id="toasts"></ol></section>
<script>
  const $ = (id) => document.getElementById(id);
  const signedIn = () => { $('mfa').hidden = true; $('out').textContent = 'Signed in successfully.'; };
  $('go').onclick = () => {
    const email = $('email').value;
    $('signin').hidden = true;
    if (email.startsWith('mfa') || email.startsWith('stuck')) { $('mfa').hidden = false; return; }
    if (email.startsWith('nomfa')) { signedIn(); return; }
    if (email.startsWith('unenrolled')) {
      history.pushState({}, '', '/provider/mfa-setup');
      $('mfa').hidden = false; // the set-up page has a #totp-code field too
      return;
    }
    $('signin').hidden = false;
    $('out').textContent = 'Invalid email or password.';
  };
  $('verify').onclick = async () => {
    if ($('email').value.startsWith('stuck')) {
      // What QA showed under load: a toast, and the code page stays up.
      $('toasts').innerHTML = '<li>Firebase: Exceeded quota. (auth/quota-exceeded).</li>';
      return;
    }
    const res = await fetch('/verify', { method: 'POST', body: $('totp-code').value });
    if (res.ok) { signedIn(); return; }
    $('err').innerHTML = '<span id="totp-code-error" role="alert">That code is not valid.</span>';
  };
</script></body></html>`;

/**
 * Serves the fake page and records every code it is sent. `used` is the codes
 * already accepted: share one between pages signing in as the same account.
 */
async function serveFakeCareHub(page: Page, used: Set<string> = new Set()): Promise<string[]> {
    const received: string[] = [];
    await page.route(`${ORIGIN}/**`, async (route) => {
        const url = new URL(route.request().url());
        if (url.pathname === '/verify') {
            const code = route.request().postData() ?? '';
            received.push(code);
            const ok = code === totp(SECRET) && !used.has(code);
            if (ok) used.add(code);
            await route.fulfill({ status: ok ? 200 : 400 });
            return;
        }
        await route.fulfill({ contentType: 'text/html', body: FAKE_LOGIN_PAGE });
    });
    await page.goto(`${ORIGIN}/provider/login`);
    return received;
}

function setRoleEnv(email: string, secret: string | undefined): void {
    process.env.TWOFA_TEST_ROLE = email;
    if (secret === undefined) delete process.env.TWOFA_TEST_ROLE_TOTP_SECRET;
    else process.env.TWOFA_TEST_ROLE_TOTP_SECRET = secret;
}

// Each test claims codes in its own folder, so tests never wait on each other
// or on a real run's claims.
test.beforeEach(({}, testInfo) => {
    process.env.TOTP_CLAIM_DIR = testInfo.outputPath('totp-claims');
});

test.afterEach(() => {
    delete process.env.TWOFA_TEST_ROLE;
    delete process.env.TWOFA_TEST_ROLE_TOTP_SECRET;
    delete process.env.TOTP_CLAIM_DIR;
});

test('2FA asked: types the current code from the role secret and signs in', async ({ page }) => {
    const received = await serveFakeCareHub(page);
    setRoleEnv('mfa@example.test', SECRET);

    await new LoginPage(page).login('mfa@example.test', 'synthetic-password');

    await expect(page.getByText('Signed in successfully')).toBeVisible();
    expect(received).toHaveLength(1);
    expect(received[0]).toMatch(/^\d{6}$/);
});

test('2FA asked, wrong secret: fails fast with a clear error, not a timeout', async ({ page }) => {
    await serveFakeCareHub(page);
    setRoleEnv('mfa@example.test', WRONG_SECRET);

    const error = await new LoginPage(page).login('mfa@example.test', 'synthetic-password').catch((e) => e);

    expect(String(error)).toContain('CareHub rejected the 2FA code');
    expect(String(error)).not.toContain(WRONG_SECRET);
});

test('2FA asked, no secret for the role: says which env var to set, sends no code', async ({ page }) => {
    const received = await serveFakeCareHub(page);
    setRoleEnv('mfa@example.test', undefined);

    const error = await new LoginPage(page).login('mfa@example.test', 'synthetic-password').catch((e) => e);

    expect(String(error)).toMatch(/no TOTP secret is set.*_TOTP_SECRET/);
    expect(received).toHaveLength(0);
});

test('account has no authenticator app (set-up page): fails with a clear error', async ({ page }) => {
    const received = await serveFakeCareHub(page);
    setRoleEnv('unenrolled@example.test', SECRET);

    const error = await new LoginPage(page).login('unenrolled@example.test', 'synthetic-password').catch((e) => e);

    expect(String(error)).toContain('no authenticator app set up');
    expect(received).toHaveLength(0);
});

test('no 2FA (MFA off): signs in exactly as before, no secret needed', async ({ page }) => {
    const received = await serveFakeCareHub(page);
    setRoleEnv('nomfa@example.test', undefined);

    const started = Date.now();
    await new LoginPage(page).login('nomfa@example.test', 'synthetic-password');

    // Regression: the hidden #totp-code in the DOM once made this wait the full 20 s.
    expect(Date.now() - started).toBeLessThan(5_000);
    await expect(page.getByText('Signed in successfully')).toBeVisible();
    expect(received).toHaveLength(0);
});

test('wrong password: returns promptly and leaves the error for the test to check', async ({ page }) => {
    await serveFakeCareHub(page);
    const loginPage = new LoginPage(page);

    const started = Date.now();
    await loginPage.login('wrong@example.test', 'synthetic-password');

    expect(Date.now() - started).toBeLessThan(5_000);
    expect(await loginPage.isLoginErrorDisplayed()).toBe(true);
});

// Regression: parallel workers signing in as one account in the same 30 s typed
// the same code, and CareHub refused all but the first ("That code didn't match").
// Takes up to ~30 s: the second sign-in waits for the next window.
test('two sign-ins as the same account at once: both get in, with different codes', async ({ browser }) => {
    const used = new Set<string>();
    setRoleEnv('mfa-pair@example.test', SECRET);
    const pages = [await browser.newPage(), await browser.newPage()];
    const received = await Promise.all(pages.map((p) => serveFakeCareHub(p, used)));
    const timeoutBefore = test.info().timeout;

    await Promise.all(pages.map((p) => new LoginPage(p).login('mfa-pair@example.test', 'synthetic-password')));

    for (const p of pages) await expect(p.getByText('Signed in successfully')).toBeVisible();
    const codes = received.flat();
    expect(codes).toHaveLength(2);
    expect(codes[0]).not.toBe(codes[1]);
    // The wait for a fresh code is added to the test's timeout, not taken from it.
    expect(test.info().timeout).toBeGreaterThan(timeoutBefore);
    await Promise.all(pages.map((p) => p.close()));
});

// Regression: under load QA showed "auth/quota-exceeded" and stayed on the code
// page; the test then sat at waitForURL('/dashboard') until its 80 s timeout.
test('CareHub stays on the code page (quota exceeded): fails within ~20 s with its notice', async ({ page }) => {
    await serveFakeCareHub(page);
    setRoleEnv('stuck@example.test', SECRET);

    const started = Date.now();
    const error = await new LoginPage(page).login('stuck@example.test', 'synthetic-password').catch((e) => e);

    expect(String(error)).toContain('did not sign in after the 2FA code');
    expect(String(error)).toContain('auth/quota-exceeded');
    expect(Date.now() - started).toBeLessThan(30_000);
});
