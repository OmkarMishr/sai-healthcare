import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

// GET one patient
export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const patient = await queryOne(`SELECT * FROM patients WHERE id = $1`, [id]);
  if (!patient) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ patient });
}

// PUT update patient
export async function PUT(req: Request, { params }: Ctx) {
  const { id } = await params;
  const b = await req.json().catch(() => ({}));
  const full_name = (b.full_name ?? "").toString().trim();
  const phone = (b.phone ?? "").toString().trim();
  if (!full_name || !phone) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
  }

  const rows = await query(
    `UPDATE patients SET
       full_name=$1, phone=$2, email=$3, gender=$4, dob=$5,
       address=$6, blood_group=$7, marital_status=$8, notes=$9
     WHERE id=$10 RETURNING *`,
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
      id,
    ],
  );
  if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ patient: rows[0] });
}

// DELETE patient
export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const rows = await query(`DELETE FROM patients WHERE id=$1 RETURNING id`, [id]);
  if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
