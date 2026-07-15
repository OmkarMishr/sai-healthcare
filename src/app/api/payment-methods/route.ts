import { NextResponse } from "next/server";
import { getPaymentSettings, hasAnyMethod } from "@/lib/payments";

export const runtime = "nodejs";

// Public: the payment details shown to patients in the booking modal.
// Returns { enabled: false } unless the admin has enabled payments AND
// configured at least one method.
export async function GET() {
  try {
    const s = await getPaymentSettings();
    if (!s || !s.enabled || !hasAnyMethod(s)) {
      return NextResponse.json({ enabled: false });
    }
    return NextResponse.json({ ...s, enabled: true });
  } catch (err) {
    console.error("Public payment methods failed:", err);
    return NextResponse.json({ enabled: false });
  }
}
