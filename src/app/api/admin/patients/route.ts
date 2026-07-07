import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

// GET /api/admin/patients?q=search
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();

  let rows;
  if (q) {
    rows = await query(
      `SELECT * FROM patients
       WHERE lower(full_name) LIKE $1 OR phone LIKE $1 OR lower(coalesce(email,'')) LIKE $1
       ORDER BY created_at DESC LIMIT 200`,
      [`%${q.toLowerCase()}%`],
    );
  } else {
    rows = await query(`SELECT * FROM patients ORDER BY created_at DESC LIMIT 200`);
  }
  return NextResponse.json({ patients: rows });
}

// POST /api/admin/patients
export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const full_name = (b.full_name ?? "").toString().trim();
  const phone = (b.phone ?? "").toString().trim();

  if (!full_name || !phone) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
  }

  const rows = await query(
    `INSERT INTO patients (full_name, phone, email, gender, dob, address, blood_group, marital_status, notes)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [
      full_name,
      phone,
      b.email || null,
      b.gender || null,
      b.dob || null,
      b.address || null,
      b.blood_group || null,
      b.marital_status || null,
      b.notes || null,
    ],
  );
  return NextResponse.json({ patient: rows[0] }, { status: 201 });
}
