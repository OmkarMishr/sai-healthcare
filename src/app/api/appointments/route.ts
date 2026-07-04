import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

// Persist to a JSON file on the server so the clinic can see booking requests.
export const runtime = "nodejs";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "appointments.json");

type Appointment = {
  id: string;
  service: string;
  serviceLabel: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  createdAt: string;
};

async function readAll(): Promise<Appointment[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as Appointment[];
  } catch {
    return [];
  }
}

async function writeAll(list: Appointment[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf8");
}

export async function POST(req: Request) {
  let body: Partial<Appointment>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").toString().trim();
  const phone = (body.phone ?? "").toString().trim();
  const service = (body.service ?? "").toString().trim();
  const date = (body.date ?? "").toString().trim();
  const time = (body.time ?? "").toString().trim();

  // Server-side validation
  if (!name || !service || !date || !time) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }
  if (!/^[+\d][\d\s-]{7,}$/.test(phone)) {
    return NextResponse.json(
      { error: "Invalid phone number" },
      { status: 400 },
    );
  }

  const appointment: Appointment = {
    id: randomUUID(),
    service,
    serviceLabel: (body.serviceLabel ?? "").toString().trim(),
    date,
    time,
    name,
    phone,
    email: (body.email ?? "").toString().trim(),
    notes: (body.notes ?? "").toString().trim(),
    createdAt: new Date().toISOString(),
  };

  const list = await readAll();
  list.push(appointment);
  await writeAll(list);

  return NextResponse.json({ ok: true, id: appointment.id }, { status: 201 });
}

// Simple record retrieval so the clinic can review booking requests.
export async function GET() {
  const list = await readAll();
  return NextResponse.json({ count: list.length, appointments: list });
}
