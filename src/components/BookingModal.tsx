"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Flower, User, Leaf, Flower2, Sprout, Phone } from "lucide-react";
import { useT } from "./LanguageProvider";
import { sendAppointmentEmail } from "@/lib/email";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  presetService?: string;
};

const services = [
  { id: "consult", en: "Free Consultation", hi: "नि:शुल्क परामर्श", icon: MessageCircle },
  { id: "infertility", en: "Female Infertility", hi: "स्त्री निःसंतानता", icon: Flower },
  { id: "male", en: "Male Infertility", hi: "पुरुष निःसंतानता", icon: User },
  { id: "panchkarma", en: "Panchkarma Detox", hi: "पंचकर्म शुद्धिकरण", icon: Leaf },
  { id: "pcos", en: "PCOS / PCOD Care", hi: "PCOS / PCOD उपचार", icon: Flower2 },
  { id: "general", en: "General Ayurveda", hi: "सामान्य आयुर्वेद", icon: Sprout },
];

const timeSlots = ["10:00 AM", "11:30 AM", "01:00 PM", "04:00 PM", "06:00 PM", "07:30 PM"];

const ui = {
  en: {
    title: "Book Your Appointment",
    subtitle: "With Dr. S.S. Soni · Panchkarma & Infertility",
    q1: "What can we help you with?",
    dateL: "Preferred date",
    timeL: "Preferred time",
    nameL: "Full name *",
    namePh: "e.g. Priya Sharma",
    phoneL: "Phone number *",
    phonePh: "+91 98xxxxxxxx",
    emailL: "Email (optional)",
    emailPh: "you@example.com",
    notesL: "Anything you'd like us to know? (optional)",
    notesPh: "Briefly describe your concern or history…",
    errService: "Please choose a service",
    errDate: "Please pick a date",
    errTime: "Please pick a time slot",
    errName: "Please enter your name",
    errPhone: "Enter a valid phone number",
    errEmail: "Enter a valid email",
    errSubmit: "Something went wrong. Please try again or call us directly.",
    continue: "Continue →",
    back: "← Back",
    confirm: "Confirm Appointment",
    booking: "Booking…",
    done: "Done",
    successTitle: "Appointment requested!",
    callSooner: "Need us sooner? Call",
  },
  hi: {
    title: "अपना अपॉइंटमेंट बुक करें",
    subtitle: "डॉ. एस.एस. सोनी के साथ · पंचकर्म एवं निःसंतानता",
    q1: "हम आपकी किस प्रकार सहायता करें?",
    dateL: "पसंदीदा तारीख",
    timeL: "पसंदीदा समय",
    nameL: "पूरा नाम *",
    namePh: "जैसे प्रिया शर्मा",
    phoneL: "फ़ोन नंबर *",
    phonePh: "+91 98xxxxxxxx",
    emailL: "ईमेल (वैकल्पिक)",
    emailPh: "you@example.com",
    notesL: "कुछ बताना चाहेंगे? (वैकल्पिक)",
    notesPh: "अपनी समस्या या इतिहास संक्षेप में बताएँ…",
    errService: "कृपया एक सेवा चुनें",
    errDate: "कृपया तारीख चुनें",
    errTime: "कृपया समय चुनें",
    errName: "कृपया अपना नाम दर्ज करें",
    errPhone: "मान्य फ़ोन नंबर दर्ज करें",
    errEmail: "मान्य ईमेल दर्ज करें",
    errSubmit: "कुछ गड़बड़ी हुई। कृपया पुनः प्रयास करें या हमें सीधे कॉल करें।",
    continue: "आगे बढ़ें →",
    back: "← पीछे",
    confirm: "अपॉइंटमेंट पक्का करें",
    booking: "बुक हो रहा है…",
    done: "पूर्ण",
    successTitle: "अपॉइंटमेंट का अनुरोध मिल गया!",
    callSooner: "जल्दी चाहिए? कॉल करें",
  },
};

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
  const t = useT(ui);
  const svcLang = useT({ en: "en" as const, hi: "hi" as const });

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setForm({ ...emptyForm, service: presetService ?? "" });
      setErrors({});
      setStatus("idle");
    }
  }, [isOpen, presetService]);

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

  // English label is stored in the DB for the clinic; localized label shown in UI.
  const serviceLabel = useMemo(
    () => services.find((s) => s.id === form.service)?.en ?? "",
    [form.service],
  );

  if (!isOpen) return null;

  const validateStep1 = () => {
    const e: typeof errors = {};
    if (!form.service) e.service = t.errService;
    if (!form.date) e.date = t.errDate;
    if (!form.time) e.time = t.errTime;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = t.errName;
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) e.phone = t.errPhone;
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = t.errEmail;
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
      const data = await res.json().catch(() => ({}));

      // Best-effort clinic notification email — never blocks the booking.
      sendAppointmentEmail({
        name: form.name,
        phone: form.phone,
        email: form.email,
        service: serviceLabel,
        date: form.date,
        time: form.time,
        notes: form.notes,
        meetLink: data.meetLink ?? null,
      }).catch((err) => console.warn("Appointment email failed:", err));

      setStatus("success");
      setStep(3);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-plum-900/50 backdrop-blur-sm" onClick={onClose} />

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
          <h3 className="font-display text-xl font-bold">{t.title}</h3>
          <p className="mt-0.5 text-sm text-coral-100">{t.subtitle}</p>

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
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-plum-900">{t.q1}</label>
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
                      <s.icon className="h-4 w-4 shrink-0" />
                      {s[svcLang]}
                    </button>
                  ))}
                </div>
                {errors.service && (
                  <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.service}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-plum-900">{t.dateL}</label>
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
                <label className="text-sm font-semibold text-plum-900">{t.timeL}</label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => set("time", time)}
                      className={`rounded-lg border px-2 py-2.5 text-sm font-medium transition-all ${
                        form.time === time
                          ? "border-coral-500 bg-coral-500 text-white"
                          : "border-plum-100 text-plum-900/80 hover:border-coral-200"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                {errors.time && (
                  <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.time}</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="rounded-xl bg-cream-50 px-4 py-3 text-sm text-plum-900/70">
                <span className="font-semibold text-plum-900">
                  {services.find((s) => s.id === form.service)?.[svcLang]}
                </span>{" "}
                · {form.date} · {form.time}
              </div>

              <Field label={t.nameL} value={form.name} onChange={(v) => set("name", v)} error={errors.name} placeholder={t.namePh} />
              <Field label={t.phoneL} value={form.phone} onChange={(v) => set("phone", v)} error={errors.phone} placeholder={t.phonePh} type="tel" />
              <Field label={t.emailL} value={form.email} onChange={(v) => set("email", v)} error={errors.email} placeholder={t.emailPh} type="email" />
              <div>
                <label className="text-sm font-semibold text-plum-900">{t.notesL}</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  rows={3}
                  placeholder={t.notesPh}
                  className="mt-2 w-full resize-none rounded-xl border border-plum-100 px-4 py-3 text-sm text-plum-900 outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                />
              </div>

              {status === "error" && (
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">
                  {t.errSubmit}
                </p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-emerald-500">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="mt-5 font-display text-xl font-bold text-plum-900">
                {t.successTitle}
              </h4>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-plum-900/65">
                {svcLang === "hi" ? (
                  <>
                    धन्यवाद, <strong>{form.name.split(" ")[0]}</strong>। हमें{" "}
                    <strong>{form.date}</strong> को <strong>{form.time}</strong> बजे{" "}
                    <strong>{services.find((s) => s.id === form.service)?.hi}</strong> के लिए आपका
                    अनुरोध मिल गया है। हमारी टीम कुछ ही घंटों में <strong>{form.phone}</strong> पर कॉल
                    करके पुष्टि करेगी।
                  </>
                ) : (
                  <>
                    Thank you, <strong>{form.name.split(" ")[0]}</strong>. We&apos;ve received your
                    request for{" "}
                    <strong>{services.find((s) => s.id === form.service)?.en}</strong> on{" "}
                    <strong>{form.date}</strong> at <strong>{form.time}</strong>. Our team will call
                    you on <strong>{form.phone}</strong> within a few hours to confirm.
                  </>
                )}
              </p>
              <div className="mx-auto mt-5 flex max-w-xs items-center gap-2 rounded-xl bg-cream-50 px-4 py-3 text-left text-xs text-plum-900/60">
                <Phone className="h-4 w-4 shrink-0 text-coral-600" />
                <span>
                  {t.callSooner}{" "}
                  <a href="tel:+919770130255" className="font-semibold text-coral-600">
                    097701 30255
                  </a>
                </span>
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
              {t.continue}
            </button>
          )}
          {step === 2 && (
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="rounded-full border border-plum-200 px-6 py-3.5 text-sm font-semibold text-plum-800 hover:border-coral-300"
              >
                {t.back}
              </button>
              <button
                onClick={submit}
                disabled={status === "loading"}
                className="flex-1 rounded-full bg-gradient-to-r from-coral-500 to-coral-600 py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-60"
              >
                {status === "loading" ? t.booking : t.confirm}
              </button>
            </div>
          )}
          {step === 3 && (
            <button
              onClick={onClose}
              className="w-full rounded-full bg-plum-800 py-3.5 text-sm font-bold text-white transition-colors hover:bg-plum-900"
            >
              {t.done}
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
