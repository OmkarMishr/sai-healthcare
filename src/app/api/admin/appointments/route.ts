import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

// GET /api/admin/appointments?date=YYYY-MM-DD | ?from=&to= | ?status= | ?q=
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const status = searchParams.get("status");
  const q = (searchParams.get("q") ?? "").trim();

  const where: string[] = [];
  const args: unknown[] = [];

  if (date) {
    args.push(date);
    where.push(`a.appointment_date = $${args.length}`);
  }
  if (from) {
    args.push(from);
    where.push(`a.appointment_date >= $${args.length}`);
  }
  if (to) {
    args.push(to);
    where.push(`a.appointment_date <= $${args.length}`);
  }
  if (status && status !== "all") {
    args.push(status);
    where.push(`a.status = $${args.length}`);
  }
  if (q) {
    args.push(`%${q.toLowerCase()}%`);
    where.push(`(lower(a.name) LIKE $${args.length} OR a.phone LIKE $${args.length})`);
  }

  const sql = `
    SELECT a.*, d.name AS doctor_name
    FROM appointments a
    LEFT JOIN doctors d ON d.id = a.doctor_id
    ${where.length ? "WHERE " + where.join(" AND ") : ""}
    ORDER BY a.appointment_date DESC, a.appointment_time ASC
    LIMIT 500`;

  const rows = await query(sql, args);
  return NextResponse.json({ appointments: rows });
}

// POST — create a walk-in / manual appointment from the admin panel
export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const name = (b.name ?? "").toString().trim();
  const phone = (b.phone ?? "").toString().trim();
  const appointment_date = (b.appointment_date ?? "").toString().trim();
  const appointment_time = (b.appointment_time ?? "").toString().trim();

  if (!name || !phone || !appointment_date || !appointment_time) {
    return NextResponse.json(
      { error: "Name, phone, date and time are required" },
      { status: 400 },
    );
  }

  const rows = await query(
    `INSERT INTO appointments
       (patient_id, doctor_id, service, service_label, appointment_date, appointment_time,
        name, phone, email, notes, status, source)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'walk-in')
     RETURNING *`,
    [
      b.patient_id || null,
      b.doctor_id || null,
      b.service || null,
      b.service_label || null,
      appointment_date,
      appointment_time,
      name,
      phone,
      b.email || null,
      b.notes || null,
      b.status || "confirmed",
    ],
  );
  return NextResponse.json({ appointment: rows[0] }, { status: 201 });
}
