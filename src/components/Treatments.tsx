"use client";

import { useBooking } from "./BookingProvider";

const steps = [
  {
    step: "Step 01",
    title: "Fertility Evaluation & Diagnosis",
    body: "Both partners assessed together — hormone panels, ultrasound, semen analysis and ovarian reserve testing to find the real cause, not a guess.",
    tag: "Root-cause first",
    icon: "🔬",
  },
  {
    step: "Step 02",
    title: "Ovulation Induction & IUI",
    body: "Gentle, timed medication to help your body release a healthy egg, tracked by scan. When needed, we step up to intrauterine insemination.",
    tag: "Minimally invasive",
    icon: "🌱",
  },
  {
    step: "Step 03",
    title: "IVF & ICSI",
    body: "For complex cases, our world-class embryology lab offers IVF, ICSI, blastocyst culture and freezing — with senior embryologists at every step.",
    tag: "Advanced care",
    icon: "🧬",
  },
];

export default function Treatments() {
  const { open } = useBooking();
  return (
    <section id="treatments" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-500">
            The right treatment, for you
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-plum-900 sm:text-4xl">
            There&apos;s usually a{" "}
            <span className="text-gradient-coral">simpler path</span> to conceive.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-plum-900/65">
            Many couples conceive without IVF. We begin with the least invasive option
            that fits your diagnosis, and step up only if your body needs it.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.step}
              className="group relative rounded-3xl border border-coral-100 bg-cream-50 p-7 transition-all hover:-translate-y-1 hover:border-coral-200 hover:shadow-xl hover:shadow-coral-500/10"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                  {s.icon}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-plum-400">
                  {s.step}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-plum-900">
                {s.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-plum-900/65">{s.body}</p>
              <span className="mt-5 inline-block rounded-full bg-coral-100 px-3 py-1 text-xs font-semibold text-coral-700">
                {s.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => open()}
            className="rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-coral-500/30 transition-transform hover:scale-[1.03] active:scale-95"
          >
            Find out what&apos;s right for you →
          </button>
        </div>
      </div>
    </section>
  );
}
