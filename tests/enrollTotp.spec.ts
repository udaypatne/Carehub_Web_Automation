import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { test, expect, Page } from '@playwright/test';
import { enrollTotp, EnrollOptions } from '../src/utils/enrollTotp';
import { readEnvValue } from '../src/utils/envFile';
import { totp } from '../src/utils/totp';

// enrollTotp (behind `npm run setup:2fa`) against a FAKE CareHub served by
// page.route: offline, every other request is blocked, QA is never touched.
// The set-up page copies the real one (xspan-provider-portal-web
// src/features/auth/mfa-setup/MfaSetupPage.tsx): data-testid="totp-secret-key"
// holding the key in groups of 4, #totp-code, "Turn on two-step verification",
// #totp-code-error, and /provider/login?mfa_set_up=1 once it is on.
// Synthetic accounts, passwords and keys only.

const ORIGIN = 'https://carehub.test';
const KEY = 'JBSWY3DPEHPK3PXPJBSWY3DPEHPK3PXP'; // synthetic
const OTHER_KEY = 'KRSXG5CTMVRXEZLUKRSXG5CTMVRXEZLU'; // synthetic
const PASSWORD = 'synthetic-password';
const grouped = (key: string) => key.replace(/(.{4})(?=.)/g, '$1 ');

test.use({ baseURL: `${ORIGIN}/` });

const fakeCareHub = (shownKey: string) => `<!doctype html><html><body>
<div id="signin">
  <label for="email">Email*</label><input id="email" type="text">
  <label for="password">Password*</label><input id="password" type="text">
  <button type="button" id="go">Sign in</button>
</div>
<div id="view"></div>
<script>
  const $ = (id) => document.getElementById(id);
  const show = (path, html) => { if (path) history.pushState({}, '', path); $('signin').hidden = true; $('view').innerHTML = html; };
  const SETUP = '<form id="f"><p>Can\\'t scan it? Enter this key instead:<br>'
    + '<code data-testid="totp-secret-key">${grouped(shownKey)}</code></p>'
    + '<label for="totp-code">6-digit code</label><input id="totp-code" type="text"><span id="slot"></span>'
    + '<button type="submit" id="on" disabled>Turn on two-step verification</button></form>';
  $('go').onclick = () => {
    const email = $('email').value;
    if ($('password').value !== '${PASSWORD}') { $('view').textContent = 'Invalid email or password.'; return; }
    if (email.startsWith('setup@')) { show('/provider/mfa-setup', SETUP); wireSetup(); }
    else if (email.startsWith('already-on@')) show('/provider/mfa-setup', '<div role="status" class="auth-banner">'
      + '<strong>Two-step verification is already on.</strong> Sign in again and enter the code from your authenticator app.</div>');
    else if (email.startsWith('has-app@')) show(null, '<label for="totp-code">6-digit code</label>'
      + '<input id="totp-code" type="text"><button type="button">Verify & sign in</button>');
    else if (email.startsWith('no-mfa@')) show('/dashboard', 'Signed in successfully.');
    else $('view').textContent = 'Invalid email or password.';
  };
  function wireSetup() {
    const input = $('totp-code'), button = $('on');
    input.oninput = () => {
      input.value = input.value.replace(/\\D/g, '').slice(0, 6);
      button.disabled = input.value.length !== 6;
      $('slot').innerHTML = '';
    };
    $('f').onsubmit = async (e) => {
      e.preventDefault();
      const res = await fetch('/enroll', { method: 'POST', body: input.value });
      if (res.ok) { location.href = '/provider/login?mfa_set_up=1'; return; }
      $('slot').innerHTML = '<span id="totp-code-error" role="alert">That code didn\\'t match. Check the app and try the current code.</span>';
    };
  }
</script></body></html>`;

interface FakeOptions {
    shownKey?: string; // the key the set-up page shows
    validKey?: string; // the key whose codes CareHub accepts (default: the shown one)
    rejectFirst?: boolean; // reject the first code whatever it is
    hang?: boolean; // never answer the enrolment
}

/** Serves the fake; returns every code it was sent to turn 2FA on. */
async function serveFakeCareHub(page: Page, opts: FakeOptions = {}): Promise<string[]> {
    const shownKey = opts.shownKey ?? KEY;
    const validKey = opts.validKey ?? shownKey;
    const codes: string[] = [];
    await page.route('**/*', async (route) => {
        const url = new URL(route.request().url());
        if (url.origin !== ORIGIN) return route.abort();
        if (url.pathname === '/enroll') {
            const code = route.request().postData() ?? '';
            codes.push(code);
            if (opts.hang) return;
            const ok = !(opts.rejectFirst && codes.length === 1) && code === totp(validKey);
            return route.fulfill({ status: ok ? 200 : 400 });
        }
        return route.fulfill({ contentType: 'text/html', body: fakeCareHub(shownKey) });
    });
    return codes;
}

/** Runs enrollTotp for TEST_ROLE with a fresh synthetic env file. */
async function enroll(page: Page, email: string, fileVars: Record<string, string> = {}, opts: Partial<EnrollOptions> = {}) {
    const file = test.info().outputPath('.env.test');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const vars = { TEST_ROLE: email, PASSWORD, TEST_ROLE_TOTP_SECRET: '', ...fileVars };
    fs.writeFileSync(file, Object.entries(vars).map(([k, v]) => `${k}=${v}`).join('\n') + '\n');

    const logs: string[] = [];
    const error: unknown = await enrollTotp(page, {
        role: 'TEST_ROLE',
        envFile: file,
        env: dotenv.parse(fs.readFileSync(file)),
        log: (line) => logs.push(line),
        signInTimeoutMs: 10_000,
        confirmTimeoutMs: 10_000,
        ...opts,
    }).then(() => undefined, (e) => e);
    return { error, logs, saved: readEnvValue(file, 'TEST_ROLE_TOTP_SECRET') };
}

function expectNoKeyIn(...texts: unknown[]): void {
    for (const key of [KEY, OTHER_KEY]) {
        for (const text of texts) {
            expect(String(text)).not.toContain(key);
            expect(String(text)).not.toContain(grouped(key));
        }
    }
}

test('reads the key, turns 2FA on with its code, and saves it, never logging it', async ({ page }) => {
    const codes = await serveFakeCareHub(page);

    const { error, logs, saved } = await enroll(page, 'setup@example.test');

    expect(error).toBeUndefined();
    expect(saved).toBe(KEY);
    expect(codes).toHaveLength(1);
    expect(codes[0]).toMatch(/^\d{6}$/);
    expect(page.url()).toContain('mfa_set_up=1');
    expect(logs.join('\n')).toContain('two-step verification is on; key saved as TEST_ROLE_TOTP_SECRET');
    expectNoKeyIn(logs.join('\n'));
});

test('uses <ROLE>_PASSWORD over PASSWORD when set (e.g. SUPER_ADMIN_PASSWORD)', async ({ page }) => {
    await serveFakeCareHub(page);

    const { error, saved } = await enroll(page, 'setup@example.test', { PASSWORD: 'not-this-one', TEST_ROLE_PASSWORD: PASSWORD });

    expect(error).toBeUndefined();
    expect(saved).toBe(KEY);
});

test('code rejected once (expired in flight): retries once with a fresh code and saves', async ({ page }) => {
    const codes = await serveFakeCareHub(page, { rejectFirst: true });

    const { error, logs, saved } = await enroll(page, 'setup@example.test');

    expect(error).toBeUndefined();
    expect(codes).toHaveLength(2);
    expect(saved).toBe(KEY);
    expect(logs.join('\n')).toContain('trying once more');
});

test('code rejected twice: fails with CareHub\'s message and puts the env file back', async ({ page }) => {
    const codes = await serveFakeCareHub(page, { validKey: OTHER_KEY });

    const { error, logs, saved } = await enroll(page, 'setup@example.test');

    expect(String(error)).toContain('did not accept the code');
    expect(String(error)).toContain("That code didn't match");
    expect(codes).toHaveLength(2);
    expect(saved).toBe('');
    expectNoKeyIn(error, logs.join('\n'));
});

test('CareHub never answers: keeps the saved key (it may be on) and says so', async ({ page }) => {
    await serveFakeCareHub(page, { hang: true });

    const { error, logs, saved } = await enroll(page, 'setup@example.test', {}, { confirmTimeoutMs: 1_500 });

    expect(String(error)).toContain('did not confirm in time');
    expect(saved).toBe(KEY);
    expectNoKeyIn(error, logs.join('\n'));
});

test('account already has an authenticator (sign-in asks for a code): says to reset, saves nothing', async ({ page }) => {
    const codes = await serveFakeCareHub(page);

    const { error, saved } = await enroll(page, 'has-app@example.test');

    expect(String(error)).toContain('already has an authenticator app');
    expect(String(error)).toContain('Reset two-step verification');
    expect(codes).toHaveLength(0);
    expect(saved).toBe('');
});

test('set-up page says 2FA is already on: says to reset, saves nothing', async ({ page }) => {
    await serveFakeCareHub(page);

    const { error, saved } = await enroll(page, 'already-on@example.test');

    expect(String(error)).toContain('already has an authenticator app');
    expect(saved).toBe('');
});

test('signed in without being asked to set up: nothing to do, saves nothing', async ({ page }) => {
    await serveFakeCareHub(page);

    const { error, saved } = await enroll(page, 'no-mfa@example.test');

    expect(String(error)).toContain('without asking to set up two-step verification');
    expect(saved).toBe('');
});

test('wrong password: says so, saves nothing', async ({ page }) => {
    await serveFakeCareHub(page);

    const { error, saved } = await enroll(page, 'setup@example.test', { PASSWORD: 'wrong-password' });

    expect(String(error)).toContain('rejected the email or password');
    expect(saved).toBe('');
});

test('a key is already saved: refuses before opening CareHub, file untouched, key not echoed', async ({ page }) => {
    await serveFakeCareHub(page);

    const { error, saved } = await enroll(page, 'setup@example.test', { TEST_ROLE_TOTP_SECRET: OTHER_KEY });

    expect(String(error)).toContain('TEST_ROLE_TOTP_SECRET is already saved');
    expect(String(error)).toContain('FORCE=1');
    expect(page.url()).toBe('about:blank');
    expect(saved).toBe(OTHER_KEY);
    expectNoKeyIn(error);
});

test('FORCE replaces a saved key', async ({ page }) => {
    await serveFakeCareHub(page);

    const { error, saved } = await enroll(page, 'setup@example.test', { TEST_ROLE_TOTP_SECRET: OTHER_KEY }, { force: true });

    expect(error).toBeUndefined();
    expect(saved).toBe(KEY);
});

test('role var not in the env file: says which, without opening CareHub', async ({ page }) => {
    const { error } = await enroll(page, 'setup@example.test', {}, { role: 'MISSING_ROLE' });

    expect(String(error)).toContain('MISSING_ROLE (the account\'s email) is not set');
    expect(page.url()).toBe('about:blank');
});
