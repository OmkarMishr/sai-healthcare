"use client";

import { Phone } from "lucide-react";
import { useBooking } from "./BookingProvider";
import { useT } from "./LanguageProvider";

const content = {
  en: {
    eyebrow: "Take the first step",
    titleA: "Stop waiting.",
    titleB: "Start healing.",
    sub: "A consultation with Dr. S.S. Soni could change your entire journey. Discover the natural, Ayurvedic path to the family you've been hoping for.",
    cta: "Book Your Consultation →",
    trust: "100% natural · Personally guided by Dr. Soni · Confidential",
  },
  hi: {
    eyebrow: "पहला कदम उठाएँ",
    titleA: "प्रतीक्षा छोड़ें,",
    titleB: "उपचार शुरू करें।",
    sub: "डॉ. एस.एस. सोनी से एक परामर्श आपकी पूरी यात्रा बदल सकता है। जिस परिवार की आप आशा कर रहे हैं, उसकी प्राकृतिक आयुर्वेदिक राह खोजें।",
    cta: "अपना परामर्श बुक करें →",
    trust: "100% प्राकृतिक · डॉ. सोनी का व्यक्तिगत मार्गदर्शन · गोपनीय",
  },
};

export default function ClosingCta() {
  const { open } = useBooking();
  const c = useT(content);
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-plum-800 via-plum-700 to-plum-900">
      <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-coral-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 left-1/4 h-72 w-72 rounded-full bg-plum-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center md:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-coral-100">
          {c.eyebrow}
        </span>
        <h2 className="mt-6 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
          {c.titleA} <span className="text-gradient-coral">{c.titleB}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-white/75">{c.sub}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => open()}
            className="rounded-full bg-gradient-to-r from-coral-400 to-coral-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-coral-900/40 transition-transform hover:scale-[1.03] active:scale-95"
          >
            {c.cta}
          </button>
          <a
            href="tel:+919229693191"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            092296 93191
          </a>
        </div>
        <p className="mt-6 text-xs text-white/55">{c.trust}</p>
      </div>
    </section>
  );
}
