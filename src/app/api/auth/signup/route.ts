import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query, queryOne, isDbConfigured } from "@/lib/db";
import { AUTH_COOKIE, signSession } from "@/lib/auth";

export const runtime = "nodejs";

type AdminRow = { id: string; name: string; email: string; role: string };

export async function POST(req: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const name = (body?.name ?? "").toString().trim();
  const email = (body?.email ?? "").toString().trim().toLowerCase();
  const password = (body?.password ?? "").toString();

  if (!name || !email || password.length < 6) {
    return NextResponse.json(
      { error: "Name, email and a 6+ character password are required" },
      { status: 400 },
    );
  }

  const existing = await queryOne("SELECT id FROM admin_users WHERE email = $1", [email]);
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
  }

  const hash = await bcrypt.hash(password, 10);
  const rows = await query<AdminRow>(
    `INSERT INTO admin_users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, role`,
    [name, email, hash],
  );
  const user = rows[0];

  const token = await signSession({ sub: user.id, name: user.name, email: user.email, role: user.role });
  const res = NextResponse.json({ user });
  res.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
