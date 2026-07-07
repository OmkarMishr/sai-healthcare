import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const rows = await query(`SELECT * FROM doctors ORDER BY created_at ASC`);
  return NextResponse.json({ doctors: rows });
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const name = (b.name ?? "").toString().trim();
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const rows = await query(
    `INSERT INTO doctors (name, qualification, specialization, phone, email, bio, active)
     VALUES ($1,$2,$3,$4,$5,$6,COALESCE($7,true)) RETURNING *`,
    [
      name,
      b.qualification || null,
      b.specialization || null,
      b.phone || null,
      b.email || null,
      b.bio || null,
      b.active ?? true,
    ],
  );
  return NextResponse.json({ doctor: rows[0] }, { status: 201 });
}
