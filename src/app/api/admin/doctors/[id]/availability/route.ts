import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

// GET weekly availability for a doctor
export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const rows = await query(
    `SELECT * FROM doctor_availability WHERE doctor_id = $1 ORDER BY weekday ASC`,
    [id],
  );
  return NextResponse.json({ availability: rows });
}

// PUT — replace the doctor's weekly availability with the provided rows.
// body: { slots: [{ weekday, start_time, end_time, slot_minutes, active }] }
export async function PUT(req: Request, { params }: Ctx) {
  const { id } = await params;
  const b = await req.json().catch(() => ({}));
  const slots: Array<{
    weekday: number;
    start_time: string;
    end_time: string;
    slot_minutes?: number;
    active?: boolean;
  }> = Array.isArray(b.slots) ? b.slots : [];

  await query(`DELETE FROM doctor_availability WHERE doctor_id = $1`, [id]);

  for (const s of slots) {
    if (s.weekday == null || !s.start_time || !s.end_time) continue;
    await query(
      `INSERT INTO doctor_availability (doctor_id, weekday, start_time, end_time, slot_minutes, active)
       VALUES ($1,$2,$3,$4,$5,$6)
       ON CONFLICT (doctor_id, weekday) DO UPDATE
         SET start_time = EXCLUDED.start_time,
             end_time = EXCLUDED.end_time,
             slot_minutes = EXCLUDED.slot_minutes,
             active = EXCLUDED.active`,
      [id, s.weekday, s.start_time, s.end_time, s.slot_minutes || 30, s.active ?? true],
    );
  }

  const rows = await query(
    `SELECT * FROM doctor_availability WHERE doctor_id = $1 ORDER BY weekday ASC`,
    [id],
  );
  return NextResponse.json({ availability: rows });
}
