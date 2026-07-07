import { Pool, type QueryResultRow } from "pg";

// Reuse a single pool across hot reloads in dev.
const globalForDb = globalThis as unknown as { _pgPool?: Pool };

export function isDbConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

function getPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local and run db/schema.sql (see README).",
    );
  }
  if (!globalForDb._pgPool) {
    const url = process.env.DATABASE_URL;
    const isLocal = /@(localhost|127\.0\.0\.1)/.test(url);
    globalForDb._pgPool = new Pool({
      connectionString: url,
      // Hosted providers (Supabase/Neon/RDS) generally require SSL.
      ssl: isLocal ? false : { rejectUnauthorized: false },
      max: 10,
      connectionTimeoutMillis: 10000, // fail fast instead of hanging ~25s
    });
  }
  return globalForDb._pgPool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<T[]> {
  const pool = getPool();
  const res = await pool.query<T>(text, params as never[]);
  return res.rows;
}

export async function queryOne<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows[0] ?? null;
}
