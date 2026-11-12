import { test } from '@playwright/test';
import path from 'path';
import { enrollTotp } from '../src/utils/enrollTotp';

// Sets up CareHub two-step verification for test accounts and saves each
// account's authenticator key as <ROLE>_TOTP_SECRET in config/.env.<ENV>:
//
//   ROLE=ORG_ADMIN npm run setup:2fa
//   ROLE=PHYSICIAN_ROLE,NURSE_ROLE npm run setup:2fa
//   FORCE=1 ROLE=ORG_ADMIN npm run setup:2fa    (replace a saved key)
//
// ROLE is the env var holding the account's email. Its password is
// <ROLE>_PASSWORD if set, else PASSWORD. An account that already has an
// authenticator app needs an org admin to reset its two-step verification
// in CareHub first.

const ENV = process.env.ENV || 'qa';
const envFile = path.join(__dirname, '..', 'config', `.env.${ENV}`);
const roles = (process.env.ROLE ?? '').split(',').map((r) => r.trim()).filter(Boolean);

if (roles.length === 0) {
    test('ROLE is required', () => {
        throw new Error('Say which account to set up, e.g.  ROLE=ORG_ADMIN npm run setup:2fa  (comma-separate several).');
    });
}

for (const role of roles) {
    test(`set up two-step verification for ${role}`, async ({ page }) => {
        await enrollTotp(page, { role, envFile, force: process.env.FORCE === '1' });
    });
}
