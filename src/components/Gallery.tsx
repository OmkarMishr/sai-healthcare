"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage, useT } from "./LanguageProvider";

// Files live in /public/gallery. Add more here as you upload them.
const photos: { src: string; en: string; hi: string }[] = [
  { src: "/gallery/excm.png", en: "Honoured by Ex-CM Shri Bhupesh Baghel", hi: "पूर्व मुख्यमंत्री श्री भूपेश बघेल द्वारा सम्मानित" },
  { src: "/gallery/ramdevbaba.png", en: "With Yoga Guru Swami Ramdev Ji", hi: "योग गुरु स्वामी रामदेव जी के साथ" },
  { src: "/gallery/phd.png", en: "Ph.D. degree conferred by MP Governor", hi: "पी.एच.डी. उपाधि प्रदान की गई" },
  { src: "/gallery/ddnational.png", en: "Featured on DD Raipur podcast", hi: "डीडी रायपुर पॉडकास्ट में सम्मिलित" },
  { src: "/gallery/foreign.png", en: "Welcoming patients from abroad", hi: "विदेशी रोगियों का स्वागत" },
];

const content = {
  en: { eyebrow: "Our journey in pictures", titleA: "Moments &", titleB: "Recognition", sub: "Milestones, honours and memorable moments from Shri Sai Ayurveda's journey of care." },
  hi: { eyebrow: "तस्वीरों में हमारी यात्रा", titleA: "पल एवं", titleB: "सम्मान", sub: "श्री साई आयुर्वेद की सेवा यात्रा के मील के पत्थर, सम्मान और यादगार पल।" },
};

export default function Gallery() {
  const c = useT(content);
  const { lang } = useLanguage();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-500">{c.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-plum-900 sm:text-4xl">
            {c.titleA} <span className="text-gradient-coral">{c.titleB}</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-plum-900/65">{c.sub}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p, i) => (
            <button
              key={p.src}
              onClick={() => setActive(i)}
              className="group relative overflow-hidden rounded-2xl border border-plum-100 bg-plum-100 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={p.src}
                  alt={p[lang]}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum-900/75 via-plum-900/10 to-transparent" />
              </div>
              <p className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-white">{p[lang]}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-plum-900/80 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            ✕
          </button>
          <div className="relative max-h-[85vh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-plum-900">
              <Image src={photos[active].src} alt={photos[active][lang]} fill sizes="90vw" className="object-contain" />
            </div>
            <p className="mt-3 text-center text-sm font-medium text-white">{photos[active][lang]}</p>
          </div>
        </div>
      )}
    </section>
  );
}
