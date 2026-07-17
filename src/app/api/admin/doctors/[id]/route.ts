import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

// DELETE a doctor. Their weekly availability is removed via ON DELETE CASCADE,
// and any linked appointments keep their history (doctor_id is set to NULL).
export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const rows = await query(`DELETE FROM doctors WHERE id = $1 RETURNING id`, [id]);
  if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
