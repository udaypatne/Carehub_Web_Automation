import fs from "fs";
import dotenv from "dotenv";

const KEY_RE = /^[A-Z_][A-Z0-9_]*$/;
// Values written unquoted, which dotenv reads back unchanged. Anything else
// (newlines, '#', quotes) could change other lines' meaning, so it is refused.
const SAFE_VALUE_RE = /^[A-Za-z0-9 _.@+\-=/:]*$/;

/** The value dotenv loads for `key` from `filePath`; undefined if no line sets it. */
export function readEnvValue(filePath: string, key: string): string | undefined {
    return dotenv.parse(fs.readFileSync(filePath))[key];
}

/**
 * Sets `key=value` in a dotenv file and returns the value it had before.
 *
 * Replaces every line that sets `key` (dotenv lets the last one win, so a stale
 * duplicate would quietly override the new value), or appends one. Comments,
 * order and every other line are kept. The file is rewritten atomically and
 * left readable by its owner only, since it holds credentials. Errors never
 * include the value.
 */
export function setEnvValue(filePath: string, key: string, value: string): string | undefined {
    if (!KEY_RE.test(key)) throw new Error(`Not a valid env var name: ${key}`);
    if (!SAFE_VALUE_RE.test(value) || value !== value.trim()) {
        throw new Error(`Refusing to write ${key}: its value has characters this helper does not write safely.`);
    }

    const original = fs.readFileSync(filePath, "utf8");
    const previous = dotenv.parse(original)[key];
    const eol = original.includes("\r\n") ? "\r\n" : "\n";
    const definesKey = new RegExp(`^\\s*(?:export\\s+)?${key}\\s*=`);

    let found = false;
    const lines = original.split(/\r?\n/).map((line) => {
        if (!definesKey.test(line)) return line;
        found = true;
        return `${key}=${value}`;
    });
    if (!found) {
        // Before the final empty element, so a trailing newline stays trailing.
        if (lines[lines.length - 1] === "") lines.splice(lines.length - 1, 0, `${key}=${value}`);
        else lines.push(`${key}=${value}`);
    }

    const tmp = `${filePath}.${process.pid}.tmp`;
    try {
        fs.writeFileSync(tmp, lines.join(eol), { mode: 0o600 });
        fs.renameSync(tmp, filePath);
    } finally {
        fs.rmSync(tmp, { force: true });
    }
    fs.chmodSync(filePath, 0o600);
    return previous;
}
