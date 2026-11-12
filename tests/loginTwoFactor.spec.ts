import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { totp } from '../src/utils/totp';

// LoginPage's 2FA step against a FAKE CareHub sign-in page served by page.route,
// so these run offline and never touch QA. The fake copies the real page's
// fields (xspan-provider-portal-web ProviderLogin.tsx): #totp-code,
// "Verify & sign in", #totp-code-error, and /provider/mfa-setup when the
// account has no authenticator app. Synthetic accounts and keys only.

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
<script>
  const $ = (id) => document.getElementById(id);
  const signedIn = () => { $('mfa').hidden = true; $('out').textContent = 'Signed in successfully.'; };
  $('go').onclick = () => {
    const email = $('email').value;
    $('signin').hidden = true;
    if (email.startsWith('mfa')) { $('mfa').hidden = false; return; }
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
    const res = await fetch('/verify', { method: 'POST', body: $('totp-code').value });
    if (res.ok) { signedIn(); return; }
    $('err').innerHTML = '<span id="totp-code-error" role="alert">That code is not valid.</span>';
  };
</script></body></html>`;

/** Serves the fake page and records every code it is sent. */
async function serveFakeCareHub(page: Page): Promise<string[]> {
    const received: string[] = [];
    await page.route(`${ORIGIN}/**`, async (route) => {
        const url = new URL(route.request().url());
        if (url.pathname === '/verify') {
            const code = route.request().postData() ?? '';
            received.push(code);
            await route.fulfill({ status: code === totp(SECRET) ? 200 : 400 });
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

test.afterEach(() => {
    delete process.env.TWOFA_TEST_ROLE;
    delete process.env.TWOFA_TEST_ROLE_TOTP_SECRET;
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
