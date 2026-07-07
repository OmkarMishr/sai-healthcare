import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { isDbConfigured, query } from "@/lib/db";
import { createMeetForAppointment } from "@/lib/googleMeet";

export const runtime = "nodejs";

// Public booking endpoint. Writes to Postgres when DATABASE_URL is set,
// otherwise falls back to a local JSON file so the site works out of the box.

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "appointments.json");

async function fileAppend(record: Record<string, unknown>) {
  let list: unknown[] = [];
  try {
    list = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));
  } catch {
    list = [];
  }
  list.push(record);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf8");
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const name = (b.name ?? "").toString().trim();
  const phone = (b.phone ?? "").toString().trim();
  const date = (b.date ?? "").toString().trim();
  const time = (b.time ?? "").toString().trim();
  const service = (b.service ?? "").toString().trim();

  if (!name || !date || !time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[+\d][\d\s-]{7,}$/.test(phone)) {
    return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
  }

  const email = (b.email ?? "").toString().trim();
  const serviceLabel = (b.serviceLabel ?? "").toString().trim();
  const notes = (b.notes ?? "").toString().trim();

  // Create a Google Meet link (best-effort — skipped if not configured).
  let meetLink: string | null = null;
  try {
    const meet = await createMeetForAppointment({
      name,
      email: email || undefined,
      phone,
      service: serviceLabel || service,
      date,
      time,
      notes,
    });
    meetLink = meet?.meetLink ?? null;
  } catch (err) {
    console.warn("Google Meet creation failed:", err);
  }

  try {
    if (isDbConfigured()) {
      const rows = await query<{ id: string }>(
        `INSERT INTO appointments
           (service, service_label, appointment_date, appointment_time, name, phone, email, notes, status, source, meet_link)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'pending','online',$9)
         RETURNING id`,
        [service || null, serviceLabel || null, date, time, name, phone, email || null, notes || null, meetLink],
      );
      return NextResponse.json({ ok: true, id: rows[0].id, meetLink }, { status: 201 });
    }

    const record = {
      id: randomUUID(),
      service,
      serviceLabel,
      date,
      time,
      name,
      phone,
      email,
      notes,
      meetLink,
      createdAt: new Date().toISOString(),
    };
    await fileAppend(record);
    return NextResponse.json({ ok: true, id: record.id, meetLink }, { status: 201 });
  } catch (err) {
    console.error("Appointment save failed:", err);
    return NextResponse.json({ error: "Could not save appointment" }, { status: 500 });
  }
}
