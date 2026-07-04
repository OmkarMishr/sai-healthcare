"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can I really have a baby without IVF?",
    a: "Very often, yes. A large share of couples conceive with timed intercourse, ovulation induction, or IUI once the real cause is diagnosed. IVF is one tool — not the only one — and we only recommend it when it genuinely gives you the best chance.",
  },
  {
    q: "How is this different from over-the-counter fertility tablets?",
    a: "Tablets treat everyone the same, with no diagnosis and no doctor. We run targeted tests for both partners, identify the actual cause, and build a plan specific to your body — supervised by a senior specialist at every step.",
  },
  {
    q: "Will you push me toward IVF?",
    a: "No. Our philosophy is natural-first: we begin with the least invasive option that can work for your diagnosis and step up only if needed. You'll always know why each step is recommended, with transparent costs upfront.",
  },
  {
    q: "What does the free consultation include?",
    a: "A 20–30 minute sit-down with a senior fertility specialist to understand your history, review any past reports, answer your questions, and outline the likely next steps. There's no obligation and no pressure to proceed.",
  },
  {
    q: "I have PCOS / low AMH — is IVF my only option?",
    a: "Not necessarily. Many PCOS patients conceive naturally with the right ovulation and lifestyle plan. Low AMH needs an honest, individual assessment — we'll tell you your real chances with each option so you can decide with clarity.",
  },
  {
    q: "Where are you located and what are your timings?",
    a: "Sai Healthcare Fertility & IVF Centre is in Raipur, Chhattisgarh, open Monday to Saturday, 9:00 AM – 7:00 PM. Book an appointment online and our team will confirm your preferred slot within a few hours.",
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-500">
            Honest answers
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-plum-900 sm:text-4xl">
            Questions couples actually ask us
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-plum-900/65">
            No medical jargon. Just clear answers from real fertility specialists.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? "border-coral-200 bg-cream-50" : "border-plum-100 bg-white"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-plum-900">{f.q}</span>
                  <span
                    className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg font-bold transition-all ${
                      isOpen
                        ? "rotate-45 bg-coral-500 text-white"
                        : "bg-coral-50 text-coral-600"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-plum-900/70">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
