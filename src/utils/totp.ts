import { createHash, createHmac } from "crypto";
import fs from "fs";
import os from "os";
import path from "path";

// CareHub staff 2FA is Firebase TOTP (RFC 6238): SHA-1, 6 digits, 30-second steps.
const STEP_MS = 30_000;
const DIGITS = 6;
const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Decode(input: string): Buffer {
    const clean = input.replace(/[\s=]/g, "").toUpperCase();
    let bits = 0;
    let value = 0;
    const out: number[] = [];
    for (const ch of clean) {
        const idx = BASE32_ALPHABET.indexOf(ch);
        // Never echo the secret, or any part of it, in an error.
        if (idx < 0) throw new Error("TOTP secret is not valid base32");
        value = ((value << 5) | idx) & 0xffff;
        bits += 5;
        if (bits >= 8) {
            out.push((value >>> (bits - 8)) & 0xff);
            bits -= 8;
        }
    }
    return Buffer.from(out);
}

/** The 6-digit code an authenticator app shows for `secret` at time `now` (ms). */
export function totp(secret: string, now: number = Date.now()): string {
    const counter = Buffer.alloc(8);
    counter.writeBigUInt64BE(BigInt(Math.floor(now / STEP_MS)));
    const hmac = createHmac("sha1", base32Decode(secret)).update(counter).digest();
    const offset = hmac[hmac.length - 1] & 0x0f;
    const code = (hmac.readUInt32BE(offset) & 0x7fffffff) % 10 ** DIGITS;
    return code.toString().padStart(DIGITS, "0");
}

/**
 * How long to wait so a code is not typed in the last `minMsLeft` of its
 * 30-second window (it could expire before CareHub checks it). 0 = use it now.
 */
export function msToWaitForFreshCode(now: number = Date.now(), minMsLeft = 3_000): number {
    const msLeft = STEP_MS - (now % STEP_MS);
    return msLeft < minMsLeft ? msLeft + 250 : 0;
}

/** A code with at least 3 seconds of its window left. */
export async function freshTotp(secret: string): Promise<string> {
    const wait = msToWaitForFreshCode();
    if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
    return totp(secret);
}

export interface ClaimOptions {
    /** Where claims are kept. Default: $TOTP_CLAIM_DIR, else a folder in the OS temp dir. */
    dir?: string;
    now?: () => number;
    sleep?: (ms: number) => Promise<void>;
    /** Told how long it is about to wait, so the caller can add that to its timeout. */
    onWait?: (ms: number) => void;
}

/**
 * A code for `account` that no other test worker on this machine has typed.
 *
 * CareHub accepts each code ONCE per account. Workers signing in as the same
 * account in the same 30-second window compute the same code, and all but the
 * first are refused ("That code didn't match"). So each worker first claims the
 * window with an exclusive-create file; one that finds the window taken waits
 * for the next. Another computer, or CI, signing in as the same account at the
 * same moment can still collide: the claims are only seen on this machine.
 */
export async function claimTotp(secret: string, account: string, opts: ClaimOptions = {}): Promise<string> {
    const dir = opts.dir ?? process.env.TOTP_CLAIM_DIR ?? path.join(os.tmpdir(), "carehub-totp-claims");
    const now = opts.now ?? Date.now;
    const sleep = opts.sleep ?? ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));
    const wait = async (ms: number) => {
        opts.onWait?.(ms);
        await sleep(ms);
    };
    // Hashed: the account's email is never written to disk.
    const id = createHash("sha256").update(account.trim().toLowerCase()).digest("hex").slice(0, 16);
    fs.mkdirSync(dir, { recursive: true });

    for (;;) {
        const fresh = msToWaitForFreshCode(now());
        if (fresh > 0) await wait(fresh);
        const step = Math.floor(now() / STEP_MS);
        let claimed = false;
        try {
            fs.writeFileSync(path.join(dir, `${id}-${step}`), "", { flag: "wx" });
            claimed = true;
        } catch (e) {
            if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
        }
        if (claimed) {
            pruneClaims(dir, step);
            return totp(secret, step * STEP_MS);
        }
        await wait(STEP_MS - (now() % STEP_MS) + 250);
    }
}

/** Drops claims more than ~10 minutes old, for every account. */
function pruneClaims(dir: string, step: number): void {
    for (const name of fs.readdirSync(dir)) {
        const claimStep = Number(name.split("-")[1]);
        if (claimStep < step - 20) fs.rmSync(path.join(dir, name), { force: true });
    }
}

/**
 * The TOTP secret for the account whose email is `username`. Each role's email
 * lives in its own env var (ORG_ADMIN, PHYSICIAN_ROLE, ...); its secret goes
 * next to it as `<that var>_TOTP_SECRET` (ORG_ADMIN_TOTP_SECRET, ...).
 */
export function totpSecretFor(username: string, env: NodeJS.ProcessEnv = process.env): string {
    const roleVar = Object.keys(env).find(
        (key) => env[key] === username && !!env[`${key}_TOTP_SECRET`],
    );
    if (!roleVar) {
        throw new Error(
            "CareHub asked for a 2FA code, but no TOTP secret is set for this account. " +
                "Add <ROLE>_TOTP_SECRET next to the env var that holds its email " +
                "(e.g. ORG_ADMIN_TOTP_SECRET) in config/.env.<ENV> or the CI secrets.",
        );
    }
    return env[`${roleVar}_TOTP_SECRET`]!;
}

/**
 * The key as CareHub's set-up page shows it ("JBSW Y3DP EHPK …") → the bare
 * base32 key. Throws, without echoing any of the input, if it is not one.
 */
export function normalizeTotpKey(raw: string): string {
    const key = raw.replace(/[\s=]/g, "").toUpperCase();
    if (key.length < 16) throw new Error("Not a TOTP key: too short");
    base32Decode(key); // throws "TOTP secret is not valid base32"
    return key;
}
