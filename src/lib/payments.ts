import { isDbConfigured, query } from "@/lib/db";

// Clinic payment details managed from the admin panel and shown to patients
// while booking. No third-party gateway — patients pay via UPI/bank transfer
// and the clinic confirms the payment manually.

export type PaymentSettings = {
  enabled: boolean;
  amount: number | null;
  upiId: string | null;
  qrImage: string | null; // base64 data URL
  accountName: string | null;
  accountNumber: string | null;
  ifsc: string | null;
  bankName: string | null;
  branch: string | null;
  instructions: string | null;
};

type Row = {
  enabled: boolean;
  amount: number | null;
  upi_id: string | null;
  qr_image: string | null;
  account_name: string | null;
  account_number: string | null;
  ifsc: string | null;
  bank_name: string | null;
  branch: string | null;
  instructions: string | null;
};

export async function getPaymentSettings(): Promise<PaymentSettings | null> {
  if (!isDbConfigured()) return null;
  const rows = await query<Row>(`SELECT * FROM payment_settings WHERE id = 1`);
  const r = rows[0];
  if (!r) return null;
  return {
    enabled: r.enabled,
    amount: r.amount ?? null,
    upiId: r.upi_id ?? null,
    qrImage: r.qr_image ?? null,
    accountName: r.account_name ?? null,
    accountNumber: r.account_number ?? null,
    ifsc: r.ifsc ?? null,
    bankName: r.bank_name ?? null,
    branch: r.branch ?? null,
    instructions: r.instructions ?? null,
  };
}

// True when at least one way to pay has been configured.
export function hasAnyMethod(s: PaymentSettings): boolean {
  return Boolean(s.upiId || s.qrImage || s.accountNumber);
}
