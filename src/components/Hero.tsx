"use client";

import Image from "next/image";
import { Leaf, MapPin } from "lucide-react";
import { useBooking } from "./BookingProvider";
import { useT } from "./LanguageProvider";

const content = {
  en: {
    badge: "Raipur's trusted Ayurvedic Panchkarma & infertility clinic",
    h1a: "The natural path to",
    h1b: "parenthood,",
    h1c: "rooted in Ayurveda.",
    body: (
      <>
        Struggling to conceive? Ancient <strong>Panchkarma</strong> therapies treat the
        root cause — not just the symptom. Led by <strong>Dr. S.S. Soni</strong> (BAMS, MD,
        Ph.D.), we help couples conceive naturally, gently, and without IVF.
      </>
    ),
    cta: "Book a Consultation →",
    explore: "Explore Panchkarma",
    social: (
      <>
        <strong className="text-plum-900">1,000+ couples</strong> guided to parenthood, 100%
        naturally
      </>
    ),
    caption: "Our Hospital · Avanti Vihar, Raipur",
  },
  hi: {
    badge: "रायपुर का विश्वसनीय आयुर्वेदिक पंचकर्म एवं निःसंतानता क्लिनिक",
    h1a: "संतान सुख की",
    h1b: "प्राकृतिक राह,",
    h1c: "आयुर्वेद से।",
    body: (
      <>
        गर्भधारण में कठिनाई? प्राचीन <strong>पंचकर्म</strong> चिकित्सा केवल लक्षण नहीं, मूल
        कारण का उपचार करती है। <strong>डॉ. एस.एस. सोनी</strong> (BAMS, MD, Ph.D.) के मार्गदर्शन
        में हम दंपतियों को बिना IVF के, प्राकृतिक रूप से संतान सुख पाने में सहायता करते हैं।
      </>
    ),
    cta: "परामर्श बुक करें →",
    explore: "पंचकर्म जानें",
    social: (
      <>
        <strong className="text-plum-900">1,000+ दंपति</strong> — 100% प्राकृतिक रूप से संतान सुख
      </>
    ),
    caption: "हमारा क्लिनिक · अवंती विहार, रायपुर",
  },
};

export default function Hero() {
  const { open } = useBooking();
  const c = useT(content);

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-coral-50 via-cream-100 to-white"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-coral-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-plum-200/40 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        {/* Copy */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-coral-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-coral-600">
            <Leaf className="h-3.5 w-3.5" />
            {c.badge}
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-plum-900 sm:text-5xl">
            {c.h1a}
            <br />
            {c.h1b} <span className="text-gradient-coral">{c.h1c}</span>
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-plum-900/70">{c.body}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={() => open()}
              className="rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-coral-500/30 transition-transform hover:scale-[1.03] active:scale-95"
            >
              {c.cta}
            </button>
            <a
              href="#treatments"
              className="rounded-full border border-plum-200 bg-white px-6 py-3.5 text-sm font-semibold text-plum-800 transition-colors hover:border-coral-300 hover:text-coral-600"
            >
              {c.explore}
            </a>
          </div>

          <div className="mt-7 flex items-center gap-5 text-sm text-plum-900/70">
            <div className="flex -space-x-2">
              {["#1f9d68", "#2c6b48", "#34ad78", "#157a50"].map((col, i) => (
                <span
                  key={i}
                  className="inline-block h-8 w-8 rounded-full border-2 border-white"
                  style={{ background: col }}
                />
              ))}
            </div>
            <span>{c.social}</span>
          </div>
        </div>

        {/* Visual */}
        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div className="relative mx-auto max-w-md">
            <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-plum-600 via-plum-500 to-coral-500 p-1 shadow-2xl shadow-plum-900/20">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-plum-100">
                <Image
                  src="/hospital_front_view.png"
                  alt="Shri Sai Ayurvedic Panchkarma & Infertility Hospital, Avanti Vihar, Raipur"
                  fill
                  sizes="(max-width: 768px) 90vw, 400px"
                  className="object-cover"
                  priority
                />
                {/* subtle gradient for depth & badge legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-plum-900/55 via-plum-900/5 to-transparent" />
                {/* caption */}
                <div className="absolute inset-x-4 bottom-4">
                  <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-white/95">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-coral-300" />
                    {c.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
