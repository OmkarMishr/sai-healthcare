"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  presetService?: string;
};

const services = [
  { id: "consult", label: "Free First Consultation", icon: "💬" },
  { id: "evaluation", label: "Fertility Evaluation", icon: "🔬" },
  { id: "iui", label: "Ovulation Induction / IUI", icon: "🌱" },
  { id: "ivf", label: "IVF / ICSI", icon: "🧬" },
  { id: "pcos", label: "PCOS / Hormonal Care", icon: "🌸" },
  { id: "male", label: "Male Fertility", icon: "👨" },
];

const timeSlots = [
  "09:30 AM",
  "11:00 AM",
  "12:30 PM",
  "03:00 PM",
  "04:30 PM",
  "06:00 PM",
];

type FormState = {
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const emptyForm: FormState = {
  service: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function BookingModal({ isOpen, onClose, presetService }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // reset when opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setForm({ ...emptyForm, service: presetService ?? "" });
      setErrors({});
      setStatus("idle");
    }
  }, [isOpen, presetService]);

  // lock scroll + escape to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const set = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const serviceLabel = useMemo(
    () => services.find((s) => s.id === form.service)?.label ?? "",
    [form.service],
  );

  if (!isOpen) return null;

  const validateStep1 = () => {
    const e: typeof errors = {};
    if (!form.service) e.service = "Please choose a service";
    if (!form.date) e.date = "Please pick a date";
    if (!form.time) e.time = "Please pick a time slot";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim()))
      e.phone = "Enter a valid phone number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  const submit = async () => {
    if (!validateStep2()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, serviceLabel }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setStep(3);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-plum-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* panel */}
      <div className="animate-fade-up relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        {/* header */}
        <div className="relative bg-gradient-to-r from-coral-500 to-coral-600 px-6 py-5 text-white">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
          >
            ✕
          </button>
          <h3 className="font-display text-xl font-bold">Book Your Appointment</h3>
          <p className="mt-0.5 text-sm text-coral-100">
            Senior specialist · Free first consultation
          </p>

          {status !== "success" && (
            <div className="mt-4 flex items-center gap-2">
              {[1, 2].map((s) => (
                <div key={s} className="flex flex-1 items-center gap-2">
                  <div
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      step >= s ? "bg-white" : "bg-white/30"
                    }`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* body */}
        <div className="thin-scroll flex-1 overflow-y-auto px-6 py-6">
          {/* STEP 1 — service + date + time */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-plum-900">
                  What can we help you with?
                </label>
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => set("service", s.id)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm font-medium transition-all ${
                        form.service === s.id
                          ? "border-coral-500 bg-coral-50 text-coral-700 ring-1 ring-coral-500"
                          : "border-plum-100 text-plum-900/80 hover:border-coral-200"
                      }`}
                    >
                      <span className="text-lg">{s.icon}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
                {errors.service && (
                  <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.service}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-plum-900">
                  Preferred date
                </label>
                <input
                  type="date"
                  min={todayISO()}
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-plum-100 px-4 py-3 text-sm text-plum-900 outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                />
                {errors.date && (
                  <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-plum-900">
                  Preferred time
                </label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => set("time", t)}
                      className={`rounded-lg border px-2 py-2.5 text-sm font-medium transition-all ${
                        form.time === t
                          ? "border-coral-500 bg-coral-500 text-white"
                          : "border-plum-100 text-plum-900/80 hover:border-coral-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {errors.time && (
                  <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.time}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2 — contact details */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="rounded-xl bg-cream-50 px-4 py-3 text-sm text-plum-900/70">
                <span className="font-semibold text-plum-900">{serviceLabel}</span> ·{" "}
                {form.date} · {form.time}
              </div>

              <Field
                label="Full name *"
                value={form.name}
                onChange={(v) => set("name", v)}
                error={errors.name}
                placeholder="e.g. Priya Sharma"
              />
              <Field
                label="Phone number *"
                value={form.phone}
                onChange={(v) => set("phone", v)}
                error={errors.phone}
                placeholder="+91 98xxxxxxx"
                type="tel"
              />
              <Field
                label="Email (optional)"
                value={form.email}
                onChange={(v) => set("email", v)}
                error={errors.email}
                placeholder="you@example.com"
                type="email"
              />
              <div>
                <label className="text-sm font-semibold text-plum-900">
                  Anything you&apos;d like us to know? (optional)
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  rows={3}
                  placeholder="Briefly describe your concern or history…"
                  className="mt-2 w-full resize-none rounded-xl border border-plum-100 px-4 py-3 text-sm text-plum-900 outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                />
              </div>

              {status === "error" && (
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">
                  Something went wrong. Please try again or call us directly.
                </p>
              )}
            </div>
          )}

          {/* STEP 3 — success */}
          {step === 3 && (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-emerald-500">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="mt-5 font-display text-xl font-bold text-plum-900">
                Appointment requested! 🎉
              </h4>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-plum-900/65">
                Thank you, <strong>{form.name.split(" ")[0]}</strong>. We&apos;ve received
                your request for <strong>{serviceLabel}</strong> on{" "}
                <strong>{form.date}</strong> at <strong>{form.time}</strong>. Our care team
                will call you on <strong>{form.phone}</strong> within a few hours to confirm.
              </p>
              <div className="mx-auto mt-5 max-w-xs rounded-xl bg-cream-50 px-4 py-3 text-left text-xs text-plum-900/60">
                📞 Need us sooner? Call{" "}
                <a href="tel:+917712000000" className="font-semibold text-coral-600">
                  +91 771 200 0000
                </a>
              </div>
            </div>
          )}
        </div>

        {/* footer actions */}
        <div className="border-t border-plum-100 px-6 py-4">
          {step === 1 && (
            <button
              onClick={next}
              className="w-full rounded-full bg-gradient-to-r from-coral-500 to-coral-600 py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.01] active:scale-95"
            >
              Continue →
            </button>
          )}
          {step === 2 && (
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="rounded-full border border-plum-200 px-6 py-3.5 text-sm font-semibold text-plum-800 hover:border-coral-300"
              >
                ← Back
              </button>
              <button
                onClick={submit}
                disabled={status === "loading"}
                className="flex-1 rounded-full bg-gradient-to-r from-coral-500 to-coral-600 py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-60"
              >
                {status === "loading" ? "Booking…" : "Confirm Appointment"}
              </button>
            </div>
          )}
          {step === 3 && (
            <button
              onClick={onClose}
              className="w-full rounded-full bg-plum-800 py-3.5 text-sm font-bold text-white transition-colors hover:bg-plum-900"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-plum-900">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-plum-100 px-4 py-3 text-sm text-plum-900 outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
      />
      {error && <p className="mt-1.5 text-xs font-medium text-rose-500">{error}</p>}
    </div>
  );
}
