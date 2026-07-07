import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { queryOne, isDbConfigured } from "@/lib/db";
import { AUTH_COOKIE, signSession } from "@/lib/auth";

export const runtime = "nodejs";

type AdminRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  password_hash: string;
};

export async function POST(req: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const email = (body?.email ?? "").toString().trim().toLowerCase();
  const password = (body?.password ?? "").toString();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const user = await queryOne<AdminRow>(
    "SELECT id, name, email, role, password_hash FROM admin_users WHERE email = $1",
    [email],
  );

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = await signSession({ sub: user.id, name: user.name, email: user.email, role: user.role });
  const res = NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
  res.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
