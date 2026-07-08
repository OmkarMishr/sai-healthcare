"use client";

import { Phone } from "lucide-react";
import { useBooking } from "./BookingProvider";
import { useT } from "./LanguageProvider";

const content = {
  en: {
    eyebrow: "How we compare",
    titleA: "Holistic Ayurveda vs.",
    titleB: "Quick-Fix Treatments",
    sub: "Why treating the root cause works better — and lasts longer — than masking the symptom.",
    us: "Shri Sai Ayurveda",
    usSub: "Panchkarma & Herbs",
    them: "Symptomatic Care",
    themSub: "Pills & Procedures",
    param: "Parameter",
    rows: [
      { param: "Approach", us: "Treats the root cause (dosha balance)", them: "Masks the symptom only" },
      { param: "Method", us: "Natural Panchkarma & herbs", them: "Hormones or invasive procedures" },
      { param: "Side Effects", us: "None — gentle & safe", them: "Common and often harsh" },
      { param: "Both Partners", us: "Male & female both treated", them: "Usually female-only focus" },
      { param: "Whole-Body Health", us: "Restores overall wellness", them: "Temporary, isolated relief" },
      { param: "Cost", us: "Affordable, transparent", them: "Expensive, repeated cycles" },
    ],
    cta: "Consult Dr. Soni — Free",
  },
  hi: {
    eyebrow: "हमारी तुलना",
    titleA: "समग्र आयुर्वेद बनाम",
    titleB: "तात्कालिक उपचार",
    sub: "मूल कारण का उपचार, लक्षण छिपाने की तुलना में क्यों बेहतर — और अधिक टिकाऊ — है।",
    us: "श्री साई आयुर्वेद",
    usSub: "पंचकर्म व औषधियाँ",
    them: "लक्षणात्मक उपचार",
    themSub: "गोलियाँ व प्रक्रियाएँ",
    param: "मापदंड",
    rows: [
      { param: "दृष्टिकोण", us: "मूल कारण का उपचार (दोष संतुलन)", them: "केवल लक्षण छिपाना" },
      { param: "विधि", us: "प्राकृतिक पंचकर्म व औषधियाँ", them: "हार्मोन या इनवेसिव प्रक्रियाएँ" },
      { param: "दुष्प्रभाव", us: "कोई नहीं — कोमल व सुरक्षित", them: "आम और अक्सर कठोर" },
      { param: "दोनों साथी", us: "पुरुष व स्त्री दोनों का उपचार", them: "प्रायः केवल स्त्री पर केंद्रित" },
      { param: "संपूर्ण स्वास्थ्य", us: "समग्र स्वास्थ्य की पुनर्स्थापना", them: "अस्थायी, सीमित राहत" },
      { param: "लागत", us: "किफायती, पारदर्शी", them: "महँगे, बार-बार के चक्र" },
    ],
    cta: "डॉ. सोनी से परामर्श — नि:शुल्क",
  },
};

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-emerald-500">
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.12" />
      <path d="M7 12.5l3 3 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Cross() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-rose-400">
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.12" />
      <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function Comparison() {
  const { open } = useBooking();
  const c = useT(content);
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-500">
            {c.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-plum-900 sm:text-4xl">
            {c.titleA} <span className="text-gradient-coral">{c.titleB}</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-plum-900/65">{c.sub}</p>
        </div>

        <div className="mt-12 overflow-x-auto">
          <div className="min-w-[560px] overflow-hidden rounded-3xl border border-plum-100 shadow-sm">
            <div className="grid grid-cols-[1.2fr_1fr_1fr]">
              <div className="bg-plum-50 px-5 py-4 text-xs font-bold uppercase tracking-wider text-plum-600">
                {c.param}
              </div>
              <div className="bg-gradient-to-br from-coral-500 to-coral-600 px-5 py-4 text-center">
                <p className="font-display text-sm font-bold text-white">{c.us}</p>
                <p className="text-[11px] font-medium text-coral-100">{c.usSub}</p>
              </div>
              <div className="bg-plum-50 px-5 py-4 text-center">
                <p className="font-display text-sm font-bold text-plum-900/70">{c.them}</p>
                <p className="text-[11px] font-medium text-plum-900/45">{c.themSub}</p>
              </div>
            </div>
            {c.rows.map((r, i) => (
              <div
                key={r.param}
                className={`grid grid-cols-[1.2fr_1fr_1fr] items-center ${
                  i % 2 ? "bg-cream-50" : "bg-white"
                }`}
              >
                <div className="px-5 py-4 text-sm font-semibold text-plum-900">{r.param}</div>
                <div className="flex items-center gap-2 border-x border-coral-100/60 bg-coral-50/40 px-5 py-4 text-sm text-plum-900/80">
                  <Check />
                  <span>{r.us}</span>
                </div>
                <div className="flex items-center gap-2 px-5 py-4 text-sm text-plum-900/55">
                  <Cross />
                  <span>{r.them}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => open()}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-coral-500/30 transition-transform hover:scale-[1.03] active:scale-95"
          >
            <Phone className="h-4 w-4" />
            {c.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
