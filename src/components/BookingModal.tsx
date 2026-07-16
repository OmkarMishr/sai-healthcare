"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { MessageCircle, Flower, User, Leaf, Flower2, Sprout, Phone, Video, Building2, Stethoscope, QrCode, Landmark, Copy, Check } from "lucide-react";
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
    modeL: "How would you like to consult?",
    modeOnline: "Online consult",
    modeOnlineHint: "Video call over Google Meet",
    modeVisit: "Visit hospital",
    modeVisitHint: "In-person at our Raipur centre",
    q1: "What can we help you with?",
    doctorL: "Choose your doctor",
    dateL: "Preferred date",
    timeL: "Preferred time",
    pickDoctorFirst: "Select a doctor to see available times.",
    slotLoading: "Loading available times…",
    noAvail: "Not available on this date. Please pick another date.",
    errDoctor: "Please choose a doctor",
    nameL: "Full name *",
    namePh: "e.g. Priya Sharma",
    phoneL: "Phone number *",
    phonePh: "+91 98xxxxxxxx",
    emailL: "Email *",
    emailPh: "you@example.com",
    notesL: "Anything you'd like us to know? (optional)",
    notesPh: "Briefly describe your concern or history…",
    errService: "Please choose a service",
    errDate: "Please pick a date",
    errTime: "Please pick a time slot",
    errName: "Please enter your name",
    errPhone: "Enter a valid phone number",
    errEmail: "Please enter a valid email",
    errRef: "Please enter the payment reference / UTR",
    errSubmit: "Something went wrong. Please try again or call us directly.",
    continue: "Continue →",
    back: "← Back",
    confirm: "Confirm Appointment",
    booking: "Booking…",
    done: "Done",
    successTitle: "Appointment requested!",
    callSooner: "Need us sooner? Call",
    feeNote: "Consultation fee",
    payTitle: "Payment",
    payHow: "How would you like to pay?",
    payNow: "Pay now",
    payAtHospital: "Pay at hospital",
    scanToPay: "Scan with any UPI app to pay",
    upiIdL: "UPI ID",
    bankL: "Bank transfer",
    acName: "Account name",
    acNumber: "Account number",
    ifscL: "IFSC",
    bankName: "Bank",
    branchL: "Branch",
    copy: "Copy",
    copied: "Copied",
    refL: "Payment reference / UTR *",
    refPh: "e.g. UPI transaction ID",
    confirmPaid: "I've paid — Confirm",
    confirmBooking: "Confirm appointment",
    pendingNote: "We'll verify your payment and confirm your appointment shortly.",
    hospitalNote: "Please pay at the hospital reception.",
  },
  hi: {
    title: "अपना अपॉइंटमेंट बुक करें",
    subtitle: "डॉ. एस.एस. सोनी के साथ · पंचकर्म एवं निःसंतानता",
    modeL: "आप परामर्श कैसे लेना चाहेंगे?",
    modeOnline: "ऑनलाइन परामर्श",
    modeOnlineHint: "Google Meet पर वीडियो कॉल",
    modeVisit: "अस्पताल आएँ",
    modeVisitHint: "हमारे रायपुर केंद्र पर व्यक्तिगत रूप से",
    q1: "हम आपकी किस प्रकार सहायता करें?",
    doctorL: "अपना चिकित्सक चुनें",
    dateL: "पसंदीदा तारीख",
    timeL: "पसंदीदा समय",
    pickDoctorFirst: "उपलब्ध समय देखने के लिए चिकित्सक चुनें।",
    slotLoading: "उपलब्ध समय लोड हो रहा है…",
    noAvail: "इस तारीख को उपलब्ध नहीं। कृपया दूसरी तारीख चुनें।",
    errDoctor: "कृपया एक चिकित्सक चुनें",
    nameL: "पूरा नाम *",
    namePh: "जैसे प्रिया शर्मा",
    phoneL: "फ़ोन नंबर *",
    phonePh: "+91 98xxxxxxxx",
    emailL: "ईमेल *",
    emailPh: "you@example.com",
    notesL: "कुछ बताना चाहेंगे? (वैकल्पिक)",
    notesPh: "अपनी समस्या या इतिहास संक्षेप में बताएँ…",
    errService: "कृपया एक सेवा चुनें",
    errDate: "कृपया तारीख चुनें",
    errTime: "कृपया समय चुनें",
    errName: "कृपया अपना नाम दर्ज करें",
    errPhone: "मान्य फ़ोन नंबर दर्ज करें",
    errEmail: "कृपया मान्य ईमेल दर्ज करें",
    errRef: "कृपया भुगतान संदर्भ / UTR दर्ज करें",
    errSubmit: "कुछ गड़बड़ी हुई। कृपया पुनः प्रयास करें या हमें सीधे कॉल करें।",
    continue: "आगे बढ़ें →",
    back: "← पीछे",
    confirm: "अपॉइंटमेंट पक्का करें",
    booking: "बुक हो रहा है…",
    done: "पूर्ण",
    successTitle: "अपॉइंटमेंट का अनुरोध मिल गया!",
    callSooner: "जल्दी चाहिए? कॉल करें",
    feeNote: "परामर्श शुल्क",
    payTitle: "भुगतान",
    payHow: "आप भुगतान कैसे करना चाहेंगे?",
    payNow: "अभी भुगतान करें",
    payAtHospital: "अस्पताल में भुगतान करें",
    scanToPay: "भुगतान हेतु किसी भी UPI ऐप से स्कैन करें",
    upiIdL: "UPI आईडी",
    bankL: "बैंक ट्रांसफर",
    acName: "खाता नाम",
    acNumber: "खाता संख्या",
    ifscL: "IFSC",
    bankName: "बैंक",
    branchL: "शाखा",
    copy: "कॉपी",
    copied: "कॉपी हुआ",
    refL: "भुगतान संदर्भ / UTR *",
    refPh: "जैसे UPI ट्रांज़ैक्शन आईडी",
    confirmPaid: "मैंने भुगतान कर दिया — पक्का करें",
    confirmBooking: "अपॉइंटमेंट पक्का करें",
    pendingNote: "हम आपके भुगतान की पुष्टि कर शीघ्र ही अपॉइंटमेंट निश्चित करेंगे।",
    hospitalNote: "कृपया अस्पताल रिसेप्शन पर भुगतान करें।",
  },
};

// Clinic payment details configured in the admin panel.
type PaymentMethods = {
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

type FormState = {
  mode: "online" | "visit";
  service: string;
  doctorId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const emptyForm: FormState = {
  mode: "online",
  service: "",
  doctorId: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

type Doctor = { id: string; name: string; specialization: string | null };

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
  // How the confirmed booking was settled — drives the success screen copy.
  const [settledAs, setSettledAs] = useState<"submitted" | "hospital" | null>(null);
  const [meetLink, setMeetLink] = useState<string | null>(null);

  // Doctors + availability-driven time slots.
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsConfigured, setSlotsConfigured] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);

  // Payment methods configured by the clinic.
  const [pm, setPm] = useState<PaymentMethods | null>(null);
  const [payChoice, setPayChoice] = useState<"now" | "hospital">("now");
  const [reference, setReference] = useState("");
  const [refError, setRefError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setForm({ ...emptyForm, service: presetService ?? "" });
      setErrors({});
      setStatus("idle");
      setSettledAs(null);
      setMeetLink(null);
      setSlots([]);
      setSlotsConfigured(true);
      setPayChoice("now");
      setReference("");
      setRefError("");
      setCopied(null);
    }
  }, [isOpen, presetService]);

  // Load clinic payment methods when the modal opens.
  useEffect(() => {
    if (!isOpen) return;
    let alive = true;
    fetch("/api/payment-methods")
      .then((r) => r.json())
      .then((d) => alive && setPm(d && d.enabled ? d : null))
      .catch(() => alive && setPm(null));
    return () => {
      alive = false;
    };
  }, [isOpen]);

  // Load bookable doctors once the modal opens.
  useEffect(() => {
    if (!isOpen) return;
    let alive = true;
    fetch("/api/doctors")
      .then((r) => r.json())
      .then((d) => alive && setDoctors(Array.isArray(d.doctors) ? d.doctors : []))
      .catch(() => alive && setDoctors([]));
    return () => {
      alive = false;
    };
  }, [isOpen]);

  const hasDoctors = doctors.length > 0;

  // Fetch the chosen doctor's slots whenever doctor or date changes.
  useEffect(() => {
    if (!isOpen || !hasDoctors || !form.doctorId || !form.date) {
      setSlots([]);
      setSlotsConfigured(true);
      return;
    }
    let alive = true;
    setSlotsLoading(true);
    fetch(`/api/doctors/${form.doctorId}/slots?date=${form.date}`)
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        setSlots(Array.isArray(d.slots) ? d.slots : []);
        setSlotsConfigured(d.configured !== false);
      })
      .catch(() => {
        if (!alive) return;
        setSlots([]);
        setSlotsConfigured(true);
      })
      .finally(() => alive && setSlotsLoading(false));
    return () => {
      alive = false;
    };
  }, [isOpen, hasDoctors, form.doctorId, form.date]);

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

  // Slots actually offered: availability-driven when a doctor with a configured
  // schedule is chosen, otherwise fall back to the default clinic slots so the
  // site still works before availability is set up (or without a database).
  const displaySlots = useMemo(() => {
    if (!hasDoctors) return timeSlots;
    if (!slotsConfigured) return timeSlots;
    return slots;
  }, [hasDoctors, slotsConfigured, slots]);

  // Reset doctor/date/time together so a stale time can't survive a change.
  const setDoctor = (id: string) => setForm((f) => ({ ...f, doctorId: id, time: "" }));
  const setDate = (date: string) => setForm((f) => ({ ...f, date, time: "" }));

  if (!isOpen) return null;

  const validateStep1 = () => {
    const e: typeof errors = {};
    if (!form.service) e.service = t.errService;
    if (hasDoctors && !form.doctorId) e.doctorId = t.errDoctor;
    if (!form.date) e.date = t.errDate;
    if (!form.time) e.time = t.errTime;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = t.errName;
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) e.phone = t.errPhone;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = t.errEmail;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  // Whether the patient is paying online now (vs. paying at the hospital).
  // Online consults always pay now; visits can choose. Only relevant when the
  // clinic has configured payment methods.
  const payingNow = !!pm && (form.mode === "online" || payChoice === "now");

  const copyText = (key: string, text: string) => {
    navigator.clipboard
      ?.writeText(text)
      .then(() => {
        setCopied(key);
        setTimeout(() => setCopied(null), 1500);
      })
      .catch(() => {});
  };

  // Persist the appointment. Patients pay by UPI/bank and the clinic confirms
  // manually, so a booking is 'pending' unless the patient pays at the hospital.
  const finalizeBooking = async (payAtHospital: boolean) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          serviceLabel,
          consultationMode: form.mode,
          payAtHospital,
          paymentReference: payAtHospital ? "" : reference.trim(),
        }),
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

      setMeetLink(data.meetLink ?? null);
      setSettledAs(payAtHospital ? "hospital" : "submitted");
      setStatus("success");
      setStep(3);
    } catch {
      setStatus("error");
    }
  };

  const confirm = () => {
    const okForm = validateStep2();
    // Reference is required whenever the patient is paying online now.
    const okRef = !payingNow || reference.trim().length > 0;
    setRefError(okRef ? "" : t.errRef);
    if (!okForm || !okRef) return;
    const payAtHospital = form.mode === "visit" && !!pm && payChoice === "hospital";
    finalizeBooking(payAtHospital);
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
                <label className="text-sm font-semibold text-plum-900">{t.modeL}</label>
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  {([
                    { id: "online" as const, icon: Video, label: t.modeOnline, hint: t.modeOnlineHint },
                    { id: "visit" as const, icon: Building2, label: t.modeVisit, hint: t.modeVisitHint },
                  ]).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setForm((f) => ({ ...f, mode: m.id }))}
                      className={`flex flex-col items-start gap-1 rounded-xl border px-3.5 py-3 text-left transition-all ${
                        form.mode === m.id
                          ? "border-coral-500 bg-coral-50 ring-1 ring-coral-500"
                          : "border-plum-100 hover:border-coral-200"
                      }`}
                    >
                      <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${form.mode === m.id ? "text-coral-700" : "text-plum-900/80"}`}>
                        <m.icon className="h-4 w-4 shrink-0" />
                        {m.label}
                      </span>
                      <span className="text-[11px] leading-snug text-plum-900/55">{m.hint}</span>
                    </button>
                  ))}
                </div>
              </div>

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

              {hasDoctors && (
                <div>
                  <label className="text-sm font-semibold text-plum-900">{t.doctorL}</label>
                  <div className="mt-3 space-y-2">
                    {doctors.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => setDoctor(doc.id)}
                        className={`flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-all ${
                          form.doctorId === doc.id
                            ? "border-coral-500 bg-coral-50 ring-1 ring-coral-500"
                            : "border-plum-100 hover:border-coral-200"
                        }`}
                      >
                        <Stethoscope
                          className={`h-4 w-4 shrink-0 ${form.doctorId === doc.id ? "text-coral-600" : "text-plum-900/50"}`}
                        />
                        <span>
                          <span className={`block text-sm font-semibold ${form.doctorId === doc.id ? "text-coral-700" : "text-plum-900/80"}`}>
                            {doc.name}
                          </span>
                          {doc.specialization && (
                            <span className="block text-[11px] leading-snug text-plum-900/55">{doc.specialization}</span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                  {errors.doctorId && (
                    <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.doctorId}</p>
                  )}
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-plum-900">{t.dateL}</label>
                <input
                  type="date"
                  min={todayISO()}
                  value={form.date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={hasDoctors && !form.doctorId}
                  className="mt-2 w-full rounded-xl border border-plum-100 px-4 py-3 text-sm text-plum-900 outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400 disabled:cursor-not-allowed disabled:bg-plum-50 disabled:text-plum-900/40"
                />
                {errors.date && (
                  <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-plum-900">{t.timeL}</label>
                {hasDoctors && !form.doctorId ? (
                  <p className="mt-2 rounded-xl bg-cream-50 px-4 py-3 text-sm text-plum-900/55">{t.pickDoctorFirst}</p>
                ) : slotsLoading ? (
                  <p className="mt-2 rounded-xl bg-cream-50 px-4 py-3 text-sm text-plum-900/55">{t.slotLoading}</p>
                ) : displaySlots.length === 0 ? (
                  <p className="mt-2 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">{t.noAvail}</p>
                ) : (
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {displaySlots.map((time) => (
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
                )}
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
                · {form.mode === "online" ? t.modeOnline : t.modeVisit} · {form.date} · {form.time}
                {form.doctorId && (
                  <div className="mt-1 text-xs text-plum-900/60">
                    {doctors.find((d) => d.id === form.doctorId)?.name}
                  </div>
                )}
              </div>

              {pm?.amount != null && (
                <div className="flex items-center justify-between rounded-xl border border-coral-100 bg-coral-50/60 px-4 py-3">
                  <span className="text-sm font-medium text-plum-900/75">{t.feeNote}</span>
                  <span className="font-display text-base font-bold text-coral-700">₹{pm.amount}</span>
                </div>
              )}

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

              {/* Payment details from the clinic (admin-managed) */}
              {pm && (
                <div className="space-y-3 rounded-2xl border border-plum-100 bg-cream-50/60 p-4">
                  <h4 className="flex items-center gap-1.5 font-display text-sm font-bold text-plum-900">
                    <QrCode className="h-4 w-4 text-coral-600" /> {t.payTitle}
                  </h4>

                  {form.mode === "visit" && (
                    <div className="grid grid-cols-2 gap-2">
                      {(["now", "hospital"] as const).map((c) => (
                        <button
                          key={c}
                          onClick={() => setPayChoice(c)}
                          className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all ${
                            payChoice === c
                              ? "border-coral-500 bg-coral-50 text-coral-700 ring-1 ring-coral-500"
                              : "border-plum-100 text-plum-900/70 hover:border-coral-200"
                          }`}
                        >
                          {c === "now" ? t.payNow : t.payAtHospital}
                        </button>
                      ))}
                    </div>
                  )}

                  {payingNow && (
                    <div className="space-y-3">
                      {pm.qrImage && (
                        <div className="flex flex-col items-center gap-2 rounded-xl bg-white p-3">
                          <div className="relative h-44 w-44">
                            <Image src={pm.qrImage} alt="UPI QR" fill className="object-contain" unoptimized />
                          </div>
                          <p className="text-xs text-plum-900/55">{t.scanToPay}</p>
                        </div>
                      )}

                      {pm.upiId && (
                        <CopyRow label={t.upiIdL} value={pm.upiId} copied={copied === "upi"} onCopy={() => copyText("upi", pm.upiId!)} copyLabel={copied === "upi" ? t.copied : t.copy} />
                      )}

                      {pm.accountNumber && (
                        <div className="rounded-xl bg-white p-3 text-sm">
                          <p className="flex items-center gap-1.5 font-semibold text-plum-900">
                            <Landmark className="h-4 w-4 text-coral-600" /> {t.bankL}
                          </p>
                          <dl className="mt-2 space-y-1 text-xs text-plum-900/70">
                            {pm.accountName && <Row k={t.acName} v={pm.accountName} />}
                            <Row k={t.acNumber} v={pm.accountNumber} />
                            {pm.ifsc && <Row k={t.ifscL} v={pm.ifsc} />}
                            {pm.bankName && <Row k={t.bankName} v={pm.bankName} />}
                            {pm.branch && <Row k={t.branchL} v={pm.branch} />}
                          </dl>
                        </div>
                      )}

                      {pm.instructions && (
                        <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800">
                          {pm.instructions}
                        </p>
                      )}

                      <div>
                        <label className="text-sm font-semibold text-plum-900">{t.refL}</label>
                        <input
                          value={reference}
                          onChange={(e) => {
                            setReference(e.target.value);
                            if (refError) setRefError("");
                          }}
                          placeholder={t.refPh}
                          className="mt-2 w-full rounded-xl border border-plum-100 px-4 py-3 text-sm text-plum-900 outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
                        />
                        {refError && (
                          <p className="mt-1.5 text-xs font-medium text-rose-500">{refError}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

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

              {settledAs === "submitted" && (
                <p className="mx-auto mt-4 max-w-xs rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700">
                  {t.pendingNote}
                </p>
              )}
              {settledAs === "hospital" && (
                <p className="mx-auto mt-4 max-w-xs rounded-xl bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-700">
                  {t.hospitalNote}
                </p>
              )}
              {meetLink && (
                <a
                  href={meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-auto mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  <Video className="h-4 w-4" /> Join Google Meet
                </a>
              )}

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
                onClick={confirm}
                disabled={status === "loading"}
                className="flex-1 rounded-full bg-gradient-to-r from-coral-500 to-coral-600 py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-60"
              >
                {status === "loading" ? t.booking : payingNow ? t.confirmPaid : t.confirmBooking}
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

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-plum-900/55">{k}</dt>
      <dd className="text-right font-medium text-plum-900">{v}</dd>
    </div>
  );
}

function CopyRow({
  label,
  value,
  copied,
  onCopy,
  copyLabel,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
  copyLabel: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-2.5">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-plum-900/45">{label}</p>
        <p className="truncate text-sm font-semibold text-plum-900">{value}</p>
      </div>
      <button
        onClick={onCopy}
        className="inline-flex shrink-0 items-center gap-1 rounded-full border border-plum-200 px-3 py-1.5 text-xs font-semibold text-plum-800 hover:border-coral-300"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
        {copyLabel}
      </button>
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
