import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

// GET patient visit history
export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const rows = await query(
    `SELECT h.*, d.name AS doctor_name
     FROM patient_history h
     LEFT JOIN doctors d ON d.id = h.doctor_id
     WHERE h.patient_id = $1
     ORDER BY h.visit_date DESC, h.created_at DESC`,
    [id],
  );
  return NextResponse.json({ history: rows });
}

// POST add a visit record
export async function POST(req: Request, { params }: Ctx) {
  const { id } = await params;
  const b = await req.json().catch(() => ({}));

  const rows = await query(
    `INSERT INTO patient_history (patient_id, doctor_id, visit_date, diagnosis, treatment, prescription, notes)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [
      id,
      b.doctor_id || null,
      b.visit_date || new Date().toISOString().slice(0, 10),
      b.diagnosis || null,
      b.treatment || null,
      b.prescription || null,
      b.notes || null,
    ],
  );
  return NextResponse.json({ visit: rows[0] }, { status: 201 });
}
