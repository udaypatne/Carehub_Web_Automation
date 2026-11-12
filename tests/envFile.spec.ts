import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';
import { readEnvValue, setEnvValue } from '../src/utils/envFile';

// Synthetic values only.
const BASE = [
    '# comment stays',
    'BASE_URL=https://carehub.test/',
    'ORG_ADMIN=orgadmin@example.test',
    '',
    '# 2FA',
    'ORG_ADMIN_TOTP_SECRET=',
    'NURSE_ROLE_TOTP_SECRET=',
    '',
].join('\n');

function envFile(content = BASE): string {
    const file = test.info().outputPath('.env.test');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
    return file;
}

test('replaces the value in place and keeps every other line, comment and the trailing newline', () => {
    const file = envFile();
    setEnvValue(file, 'ORG_ADMIN_TOTP_SECRET', 'JBSWY3DPEHPK3PXP');
    expect(fs.readFileSync(file, 'utf8')).toBe(BASE.replace('ORG_ADMIN_TOTP_SECRET=', 'ORG_ADMIN_TOTP_SECRET=JBSWY3DPEHPK3PXP'));
});

test('does not touch a key that merely starts with the same name', () => {
    const file = envFile();
    setEnvValue(file, 'ORG_ADMIN', 'other@example.test');
    expect(readEnvValue(file, 'ORG_ADMIN')).toBe('other@example.test');
    expect(readEnvValue(file, 'ORG_ADMIN_TOTP_SECRET')).toBe('');
});

test('appends a missing key, keeping the trailing newline', () => {
    const file = envFile();
    setEnvValue(file, 'SUPER_ADMIN_TOTP_SECRET', 'JBSWY3DPEHPK3PXP');
    expect(fs.readFileSync(file, 'utf8')).toBe(`${BASE}SUPER_ADMIN_TOTP_SECRET=JBSWY3DPEHPK3PXP\n`);
});

test('appends to a file with no trailing newline', () => {
    const file = envFile('A=1');
    setEnvValue(file, 'B', '2');
    expect(fs.readFileSync(file, 'utf8')).toBe('A=1\nB=2');
});

test('replaces every duplicate line, and returns the value dotenv was using (the last)', () => {
    const file = envFile('K=first\nX=1\nK=second\n');
    expect(setEnvValue(file, 'K', 'new')).toBe('second');
    expect(fs.readFileSync(file, 'utf8')).toBe('K=new\nX=1\nK=new\n');
});

test('returns undefined for a missing key and "" for an empty one', () => {
    const file = envFile();
    expect(setEnvValue(file, 'NURSE_ROLE_TOTP_SECRET', 'X')).toBe('');
    expect(setEnvValue(file, 'NOT_THERE', 'X')).toBeUndefined();
});

test('keeps Windows line endings', () => {
    const file = envFile('A=1\r\nB=2\r\n');
    setEnvValue(file, 'A', '9');
    expect(fs.readFileSync(file, 'utf8')).toBe('A=9\r\nB=2\r\n');
});

test('leaves the file readable by its owner only, and no temp file behind', () => {
    const file = envFile();
    fs.chmodSync(file, 0o644);
    setEnvValue(file, 'ORG_ADMIN_TOTP_SECRET', 'JBSWY3DPEHPK3PXP');
    expect(fs.statSync(file).mode & 0o777).toBe(0o600);
    expect(fs.readdirSync(path.dirname(file))).toEqual(['.env.test']);
});

test('refuses an invalid key name', () => {
    const file = envFile();
    expect(() => setEnvValue(file, 'bad-name', 'x')).toThrow('Not a valid env var name');
    expect(fs.readFileSync(file, 'utf8')).toBe(BASE);
});

for (const [label, value] of [
    ['a newline (would inject a line)', 'ABC\nPASSWORD=evil'],
    ["a '#' (dotenv reads it as a comment)", 'ABC #DEF'],
    ['a quote', 'ABC"DEF'],
    ['surrounding spaces', ' ABC '],
] as const) {
    test(`refuses a value with ${label}, without echoing it, and leaves the file alone`, () => {
        const file = envFile();
        let error: unknown;
        try { setEnvValue(file, 'ORG_ADMIN_TOTP_SECRET', value); } catch (e) { error = e; }
        expect(String(error)).toContain('Refusing to write ORG_ADMIN_TOTP_SECRET');
        expect(String(error)).not.toContain(value.trim());
        expect(fs.readFileSync(file, 'utf8')).toBe(BASE);
    });
}
