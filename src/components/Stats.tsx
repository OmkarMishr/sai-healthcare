"use client";

import { useT } from "./LanguageProvider";

const content = {
  en: [
    { value: "20+", label: "Years of Experience" },
    { value: "1,000+", label: "Couples Helped" },
    { value: "100%", label: "Natural & Herbal" },
    { value: "4.8★", label: "Patient Rating" },
  ],
  hi: [
    { value: "20+", label: "वर्षों का अनुभव" },
    { value: "1,000+", label: "दंपतियों की सहायता" },
    { value: "100%", label: "प्राकृतिक व हर्बल" },
    { value: "4.8★", label: "रोगी रेटिंग" },
  ],
};

export default function Stats() {
  const stats = useT(content);
  return (
    <section className="bg-gradient-to-r from-plum-800 via-plum-700 to-plum-800">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-4 py-8 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center">
            <span className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              {s.value}
            </span>
            <span className="mt-1 text-xs font-medium uppercase tracking-wide text-coral-200">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
