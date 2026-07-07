import { NextResponse } from "next/server";
import { queryOne } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const row = await queryOne<{
    patients: string;
    doctors: string;
    today: string;
    pending: string;
    upcoming: string;
  }>(`
    SELECT
      (SELECT count(*) FROM patients)                                              AS patients,
      (SELECT count(*) FROM doctors WHERE active)                                  AS doctors,
      (SELECT count(*) FROM appointments WHERE appointment_date = CURRENT_DATE)    AS today,
      (SELECT count(*) FROM appointments WHERE status = 'pending')                 AS pending,
      (SELECT count(*) FROM appointments WHERE appointment_date >= CURRENT_DATE)   AS upcoming
  `);

  return NextResponse.json({
    stats: {
      patients: Number(row?.patients ?? 0),
      doctors: Number(row?.doctors ?? 0),
      today: Number(row?.today ?? 0),
      pending: Number(row?.pending ?? 0),
      upcoming: Number(row?.upcoming ?? 0),
    },
  });
}
