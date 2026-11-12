import { test, expect } from '@playwright/test';
import { msToWaitForFreshCode, totp, totpSecretFor } from '../src/utils/totp';

// RFC 6238 appendix B, SHA-1: the ASCII key "12345678901234567890" in base32.
// A published test vector, not a real account's key.
const RFC_SECRET = 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ';

test.describe('totp()', () => {
    for (const [seconds, code] of [
        [59, '287082'],
        [1111111109, '081804'],
        [1234567890, '005924'],
        [2000000000, '279037'],
    ] as const) {
        test(`matches RFC 6238 at T=${seconds}`, () => {
            expect(totp(RFC_SECRET, seconds * 1000)).toBe(code);
        });
    }

    test('keeps the leading zero (always 6 digits)', () => {
        expect(totp(RFC_SECRET, 1234567890 * 1000)).toMatch(/^\d{6}$/);
    });

    test('accepts the key as CareHub shows it: spaced groups, any case, padding', () => {
        expect(totp('gezd gnbv gy3t qojq gezd gnbv gy3t qojq', 59_000)).toBe('287082');
        expect(totp(`${RFC_SECRET}====`, 59_000)).toBe('287082');
    });

    test('same 30-second window gives the same code; the next window a new one', () => {
        expect(totp(RFC_SECRET, 30_000)).toBe(totp(RFC_SECRET, 59_999));
        expect(totp(RFC_SECRET, 59_999)).not.toBe(totp(RFC_SECRET, 60_000));
    });

    test('rejects a key that is not base32, without echoing it', () => {
        const bad = 'ABCD1EFG'; // 1 is not in the base32 alphabet
        expect(() => totp(bad, 0)).toThrow('TOTP secret is not valid base32');
        try { totp(bad, 0); } catch (e) { expect(String(e)).not.toContain(bad); }
    });
});

test.describe('msToWaitForFreshCode()', () => {
    const windowStart = 30_000 * 1000;

    test('no wait at the start of a window', () => {
        expect(msToWaitForFreshCode(windowStart)).toBe(0);
    });

    test('no wait with just over 3 s left', () => {
        expect(msToWaitForFreshCode(windowStart + 26_999)).toBe(0);
    });

    test('waits into the next window with under 3 s left', () => {
        expect(msToWaitForFreshCode(windowStart + 27_001)).toBe(2_999 + 250);
        expect(msToWaitForFreshCode(windowStart + 29_999)).toBe(1 + 250);
    });
});

test.describe('totpSecretFor()', () => {
    const env = {
        ORG_ADMIN: 'orgadmin@example.test',
        ORG_ADMIN_TOTP_SECRET: 'ORGADMINSECRET',
        NURSE_ROLE: 'nurse@example.test',
        NURSE_ROLE_TOTP_SECRET: '',
        SOME_OTHER_VAR: 'orgadmin@example.test',
    };

    test("finds the secret next to the env var that holds the account's email", () => {
        expect(totpSecretFor('orgadmin@example.test', env)).toBe('ORGADMINSECRET');
    });

    test('an empty secret (an unset CI secret) counts as missing', () => {
        expect(() => totpSecretFor('nurse@example.test', env)).toThrow(/no TOTP secret is set/);
    });

    test('an account with no role var at all is missing, and the error does not name it', () => {
        try {
            totpSecretFor('unknown@example.test', env);
            throw new Error('expected a throw');
        } catch (e) {
            expect(String(e)).toContain('ORG_ADMIN_TOTP_SECRET');
            expect(String(e)).not.toContain('unknown@example.test');
        }
    });
});
