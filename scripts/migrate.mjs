// Applies db/schema.sql to the database in DATABASE_URL.
// Usage:  npm run db:setup
// Reads DATABASE_URL from the environment or from .env.local (no extra deps).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// --- load .env.local if DATABASE_URL isn't already set ---
function loadEnvLocal() {
  if (process.env.DATABASE_URL) return;
  try {
    const raw = readFileSync(join(root, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (!m) continue;
      const key = m[1];
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    /* no .env.local — rely on process env */
  }
}

loadEnvLocal();

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✗ DATABASE_URL is not set. Add it to .env.local first.");
  process.exit(1);
}

const isLocal = /@(localhost|127\.0\.0\.1)/.test(url);
const sql = readFileSync(join(root, "db", "schema.sql"), "utf8");

const client = new pg.Client({
  connectionString: url,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

try {
  await client.connect();
  await client.query(sql);
  const { rows } = await client.query("SELECT count(*)::int AS n FROM doctors");
  console.log(`✓ Schema applied successfully. Doctors seeded: ${rows[0].n}`);
} catch (err) {
  const detail =
    err.message ||
    (err.errors && err.errors.map((e) => `${e.code || ""} ${e.address || ""}:${e.port || ""}`).join(", ")) ||
    String(err);
  console.error("✗ Migration failed.");
  console.error("  code:", err.code || "(none)");
  console.error("  detail:", detail);
  if (err.code === "ETIMEDOUT" || (err.errors && err.errors.some((e) => e.code === "ETIMEDOUT"))) {
    console.error(
      "\n  → Connection timed out. If this is Supabase, you are likely using the\n" +
        "    IPv6-only 'Direct connection'. Switch DATABASE_URL to the 'Session pooler'\n" +
        "    string (host: aws-0-<region>.pooler.supabase.com, user: postgres.<ref>).",
    );
  }
  process.exitCode = 1;
} finally {
  await client.end();
}
