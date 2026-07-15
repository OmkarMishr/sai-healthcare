import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getPaymentSettings } from "@/lib/payments";

export const runtime = "nodejs";

// GET current payment settings (admin).
export async function GET() {
  const s = await getPaymentSettings();
  return NextResponse.json({ settings: s });
}

// PUT — save payment settings (admin). Upserts the single settings row.
export async function PUT(req: Request) {
  const b = await req.json().catch(() => ({}));

  const str = (v: unknown) => {
    const s = (v ?? "").toString().trim();
    return s === "" ? null : s;
  };
  const amountRaw = Number(b.amount);
  const amount = Number.isFinite(amountRaw) && amountRaw > 0 ? Math.round(amountRaw) : null;

  // Basic guard: reject oversized QR payloads (~1.5MB of base64).
  const qr = str(b.qrImage);
  if (qr && qr.length > 2_000_000) {
    return NextResponse.json({ error: "QR image is too large" }, { status: 413 });
  }
  if (qr && !/^data:image\/(png|jpe?g|webp|gif);base64,/.test(qr)) {
    return NextResponse.json({ error: "QR must be an image file" }, { status: 400 });
  }

  const rows = await query(
    `UPDATE payment_settings SET
       enabled        = $1,
       amount         = $2,
       upi_id         = $3,
       qr_image       = $4,
       account_name   = $5,
       account_number = $6,
       ifsc           = $7,
       bank_name      = $8,
       branch         = $9,
       instructions   = $10
     WHERE id = 1
     RETURNING *`,
    [
      b.enabled !== false,
      amount,
      str(b.upiId),
      qr,
      str(b.accountName),
      str(b.accountNumber),
      str(b.ifsc),
      str(b.bankName),
      str(b.branch),
      str(b.instructions),
    ],
  );

  if (!rows[0]) {
    return NextResponse.json({ error: "Settings row missing — run db:setup" }, { status: 500 });
  }
  return NextResponse.json({ settings: await getPaymentSettings() });
}
