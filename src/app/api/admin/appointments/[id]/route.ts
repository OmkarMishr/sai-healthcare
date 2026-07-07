import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

// PUT — update status / assign doctor / link patient / reschedule
export async function PUT(req: Request, { params }: Ctx) {
  const { id } = await params;
  const b = await req.json().catch(() => ({}));

  if (b.status && !STATUSES.includes(b.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const rows = await query(
    `UPDATE appointments SET
       status = COALESCE($1, status),
       doctor_id = COALESCE($2, doctor_id),
       patient_id = COALESCE($3, patient_id),
       appointment_date = COALESCE($4, appointment_date),
       appointment_time = COALESCE($5, appointment_time),
       notes = COALESCE($6, notes)
     WHERE id = $7 RETURNING *`,
    [
      b.status || null,
      b.doctor_id || null,
      b.patient_id || null,
      b.appointment_date || null,
      b.appointment_time || null,
      b.notes ?? null,
      id,
    ],
  );
  if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ appointment: rows[0] });
}

// DELETE appointment
export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const rows = await query(`DELETE FROM appointments WHERE id=$1 RETURNING id`, [id]);
  if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
