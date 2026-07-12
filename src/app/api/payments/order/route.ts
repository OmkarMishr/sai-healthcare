import { NextResponse } from "next/server";
import {
  CONSULTATION_FEE_INR,
  createOrder,
  isRazorpayConfigured,
  razorpayKeyId,
} from "@/lib/razorpay";

export const runtime = "nodejs";

// Creates a Razorpay order for the consultation fee. The browser then opens
// the checkout widget with the returned orderId. The actual booking is only
// saved after the payment signature is verified in /api/appointments.
export async function POST(req: Request) {
  if (!isRazorpayConfigured()) {
    return NextResponse.json(
      { error: "Online payment is not available right now. Please call the clinic." },
      { status: 503 },
    );
  }

  const b = await req.json().catch(() => ({}));
  const receipt = `appt_${Date.now()}`;

  try {
    const order = await createOrder(CONSULTATION_FEE_INR, receipt, {
      name: (b.name ?? "").toString().slice(0, 120),
      phone: (b.phone ?? "").toString().slice(0, 20),
      service: (b.service ?? "").toString().slice(0, 120),
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount, // paise
      currency: order.currency,
      keyId: razorpayKeyId(),
    });
  } catch (err) {
    console.error("Razorpay order error:", err);
    return NextResponse.json(
      { error: "Could not start the payment. Please try again." },
      { status: 502 },
    );
  }
}
