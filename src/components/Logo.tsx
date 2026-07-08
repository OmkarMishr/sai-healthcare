"use client";

import Image from "next/image";
import { useT } from "./LanguageProvider";

const content = {
  en: { name: "Shri Sai Ayurveda", tag: "Panchkarma & Infertility · Raipur" },
  hi: { name: "श्री साई आयुर्वेद", tag: "पंचकर्म एवं निःसंतानता · रायपुर" },
};

export default function Logo({ light = false }: { light?: boolean }) {
  const c = useT(content);
  return (
    <div className="flex shrink-0 items-center gap-2.5">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black shadow-md ring-2 ring-coral-500/40 sm:h-12 sm:w-12">
        <Image
          src="/logo.png"
          alt="Shri Sai Ayurveda logo"
          width={48}
          height={48}
          className="h-full w-full scale-110 object-cover"
          priority
        />
      </span>
      <span className="leading-tight">
        <span
          className={`block whitespace-nowrap font-display text-[15px] font-extrabold tracking-tight sm:text-lg ${
            light ? "text-white" : "text-plum-900"
          }`}
        >
          {c.name}
        </span>
        <span
          className={`hidden whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] sm:block ${
            light ? "text-coral-200" : "text-coral-600"
          }`}
        >
          {c.tag}
        </span>
      </span>
    </div>
  );
}
