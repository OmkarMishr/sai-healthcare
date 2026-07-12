import crypto from "crypto";
import { CONSULTATION_FEE_INR } from "./pricing";

// Thin Razorpay helper using the REST API + Node crypto — no extra npm
// dependency. Secrets stay server-side; only the public Key ID is ever
// returned to the browser.

export { CONSULTATION_FEE_INR };

export function isRazorpayConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

/** Public Key ID — safe to expose to the checkout widget. */
export function razorpayKeyId() {
  return process.env.RAZORPAY_KEY_ID ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";
}

type RazorpayOrder = { id: string; amount: number; currency: string; status: string };

/** Create an order. `amountInr` is rupees; Razorpay expects the smallest unit (paise). */
export async function createOrder(
  amountInr: number,
  receipt: string,
  notes?: Record<string, string>,
): Promise<RazorpayOrder> {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) throw new Error("Razorpay is not configured");

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
    body: JSON.stringify({
      amount: Math.round(amountInr * 100),
      currency: "INR",
      receipt,
      notes,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Razorpay order failed (${res.status}): ${body}`);
  }
  return (await res.json()) as RazorpayOrder;
}

/**
 * Verify a checkout callback. Razorpay signs `${order_id}|${payment_id}`
 * with HMAC-SHA256 keyed by the secret. Compared in constant time.
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
): boolean {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret || !orderId || !paymentId || !signature) return false;

  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
