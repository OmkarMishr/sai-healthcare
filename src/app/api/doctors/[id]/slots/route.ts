import { NextResponse } from "next/server";
import { isDbConfigured, query } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

type AvailRow = {
  weekday: number;
  start_time: string;
  end_time: string;
  slot_minutes: number;
  active: boolean;
};

// "10:00 AM" / "01:30 PM" — matches the format stored in appointments.appointment_time.
function formatSlot(hour: number, minute: number): string {
  const period = hour < 12 ? "AM" : "PM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${String(h12).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`;
}

// GET /api/doctors/:id/slots?date=YYYY-MM-DD
// Returns the bookable time slots for the doctor on that date, derived from
// their weekly availability and with already-booked times removed.
//   { configured: false } → doctor has no availability set up at all
//   { configured: true, slots: [] } → not available on that weekday
export async function GET(req: Request, { params }: Ctx) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const date = (searchParams.get("date") ?? "").trim();

  if (!isDbConfigured()) return NextResponse.json({ configured: false, slots: [] });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  try {
    const avail = await query<AvailRow>(
      `SELECT weekday, start_time, end_time, slot_minutes, active
         FROM doctor_availability
        WHERE doctor_id = $1`,
      [id],
    );

    // No availability configured → let the client fall back to default slots.
    if (avail.length === 0) return NextResponse.json({ configured: false, slots: [] });

    const [y, m, d] = date.split("-").map(Number);
    const weekday = new Date(y, m - 1, d).getDay(); // 0 = Sun … 6 = Sat
    const row = avail.find((r) => Number(r.weekday) === weekday && r.active);
    if (!row) return NextResponse.json({ configured: true, slots: [] });

    const [sh, sm] = String(row.start_time).split(":").map(Number);
    const [eh, em] = String(row.end_time).split(":").map(Number);
    const startMin = sh * 60 + sm;
    const endMin = eh * 60 + em;
    const step = Number(row.slot_minutes) > 0 ? Number(row.slot_minutes) : 30;

    const all: string[] = [];
    for (let t = startMin; t < endMin; t += step) {
      all.push(formatSlot(Math.floor(t / 60), t % 60));
    }

    // Drop times already booked (non-cancelled) for this doctor on this date.
    const booked = await query<{ appointment_time: string }>(
      `SELECT appointment_time
         FROM appointments
        WHERE doctor_id = $1 AND appointment_date = $2 AND status <> 'cancelled'`,
      [id, date],
    );
    const taken = new Set(booked.map((b) => String(b.appointment_time)));
    const slots = all.filter((s) => !taken.has(s));

    return NextResponse.json({ configured: true, slots });
  } catch (err) {
    console.error("Doctor slots failed:", err);
    return NextResponse.json({ configured: false, slots: [] });
  }
}
