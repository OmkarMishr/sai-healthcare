import { NextResponse } from "next/server";
import { isDbConfigured, query } from "@/lib/db";

export const runtime = "nodejs";

// Public list of bookable doctors (used by the booking modal).
export async function GET() {
  if (!isDbConfigured()) return NextResponse.json({ doctors: [] });
  try {
    const rows = await query(
      `SELECT id, name, qualification, specialization
         FROM doctors
        WHERE active = TRUE
        ORDER BY created_at ASC`,
    );
    return NextResponse.json({ doctors: rows });
  } catch (err) {
    console.error("Public doctors list failed:", err);
    return NextResponse.json({ doctors: [] });
  }
}
