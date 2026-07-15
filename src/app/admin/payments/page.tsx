"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { QrCode, Upload, Trash2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { apiGet, apiSend } from "@/lib/adminApi";

type Settings = {
  enabled: boolean;
  amount: number | null;
  upiId: string | null;
  qrImage: string | null;
  accountName: string | null;
  accountNumber: string | null;
  ifsc: string | null;
  bankName: string | null;
  branch: string | null;
  instructions: string | null;
};

const EMPTY: Settings = {
  enabled: true,
  amount: null,
  upiId: null,
  qrImage: null,
  accountName: null,
  accountNumber: null,
  ifsc: null,
  bankName: null,
  branch: null,
  instructions: null,
};

const MAX_QR_BYTES = 1_500_000; // ~1.5 MB source file

export default function PaymentsPage() {
  const [s, setS] = useState<Settings>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    apiGet<{ settings: Settings | null }>("/api/admin/payment-settings")
      .then((d) => setS(d.settings ?? EMPTY))
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoaded(true));
  }, []);

  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => {
    setS((p) => ({ ...p, [k]: v }));
    setOk(false);
  };

  const onFile = (file?: File | null) => {
    setError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (PNG/JPG).");
      return;
    }
    if (file.size > MAX_QR_BYTES) {
      setError("QR image is too large. Please use an image under 1.5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => set("qrImage", reader.result as string);
    reader.readAsDataURL(file);
  };

  const save = async () => {
    setSaving(true);
    setError("");
    setOk(false);
    try {
      const d = await apiSend<{ settings: Settings }>("/api/admin/payment-settings", "PUT", s);
      setS(d.settings);
      setOk(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) {
    return (
      <AdminShell title="Payments">
        <p className="text-sm text-plum-900/50">Loading…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Payments">
      <div className="mx-auto max-w-3xl space-y-5">
        <p className="text-sm text-plum-900/60">
          These details are shown to patients while they book an appointment so they can pay by
          UPI or bank transfer. Payments are confirmed manually from the Appointments page.
        </p>

        {/* Enable + amount */}
        <Card>
          <div className="flex items-center justify-between gap-4">
            <span>
              <span className="block text-sm font-semibold text-plum-900">Show payment details to patients</span>
              <span className="block text-xs text-plum-900/55">Turn off to hide all payment info while booking.</span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={s.enabled}
              onClick={() => set("enabled", !s.enabled)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${s.enabled ? "bg-coral-500" : "bg-plum-200"}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${s.enabled ? "translate-x-[1.4rem]" : "translate-x-0.5"}`}
              />
            </button>
          </div>
          <div className="mt-4">
            <L>Consultation fee (₹)</L>
            <input
              type="number"
              min={0}
              value={s.amount ?? ""}
              onChange={(e) => set("amount", e.target.value === "" ? null : Number(e.target.value))}
              placeholder="e.g. 400"
              className="inp"
            />
          </div>
        </Card>

        {/* UPI + QR */}
        <Card>
          <h3 className="flex items-center gap-2 font-display text-sm font-bold text-plum-900">
            <QrCode className="h-4 w-4 text-coral-600" /> UPI
          </h3>
          <div className="mt-3">
            <L>UPI ID</L>
            <input
              value={s.upiId ?? ""}
              onChange={(e) => set("upiId", e.target.value)}
              placeholder="clinic@okicici"
              className="inp"
            />
          </div>

          <div className="mt-4">
            <L>UPI QR code</L>
            <div className="mt-2 flex items-start gap-4">
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-plum-100 bg-plum-50">
                {s.qrImage ? (
                  <Image src={s.qrImage} alt="UPI QR" fill className="object-contain" unoptimized />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-xs text-plum-900/40">
                    No QR
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => onFile(e.target.files?.[0])}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-plum-200 px-4 py-2 text-sm font-semibold text-plum-800 hover:border-coral-300"
                >
                  <Upload className="h-4 w-4" /> Upload QR
                </button>
                {s.qrImage && (
                  <button
                    type="button"
                    onClick={() => set("qrImage", null)}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                )}
                <p className="text-xs text-plum-900/50">PNG or JPG, under 1.5 MB.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Bank details */}
        <Card>
          <h3 className="font-display text-sm font-bold text-plum-900">Bank account (optional)</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <L>Account holder name</L>
              <input value={s.accountName ?? ""} onChange={(e) => set("accountName", e.target.value)} className="inp" />
            </div>
            <div>
              <L>Account number</L>
              <input value={s.accountNumber ?? ""} onChange={(e) => set("accountNumber", e.target.value)} className="inp" />
            </div>
            <div>
              <L>IFSC code</L>
              <input value={s.ifsc ?? ""} onChange={(e) => set("ifsc", e.target.value)} className="inp" />
            </div>
            <div>
              <L>Bank name</L>
              <input value={s.bankName ?? ""} onChange={(e) => set("bankName", e.target.value)} className="inp" />
            </div>
            <div className="sm:col-span-2">
              <L>Branch</L>
              <input value={s.branch ?? ""} onChange={(e) => set("branch", e.target.value)} className="inp" />
            </div>
          </div>
        </Card>

        {/* Instructions */}
        <Card>
          <L>Note for patients (optional)</L>
          <textarea
            value={s.instructions ?? ""}
            onChange={(e) => set("instructions", e.target.value)}
            rows={3}
            placeholder="e.g. After paying, share the transaction reference to confirm your slot."
            className="inp resize-none"
          />
        </Card>

        {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">{error}</p>}
        {ok && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">Saved.</p>}

        <div className="flex justify-end">
          <button
            onClick={save}
            disabled={saving}
            className="rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-8 py-3 text-sm font-bold text-white shadow-md disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      <style jsx global>{`
        .inp {
          margin-top: 0.35rem;
          width: 100%;
          border: 1px solid var(--color-plum-200);
          border-radius: 0.75rem;
          padding: 0.6rem 0.85rem;
          font-size: 0.875rem;
          outline: none;
        }
        .inp:focus {
          border-color: var(--color-coral-400);
        }
      `}</style>
    </AdminShell>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-plum-100 bg-white p-5">{children}</div>;
}

function L({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold text-plum-900/70">{children}</label>;
}
