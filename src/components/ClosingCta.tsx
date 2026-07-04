"use client";

import { useBooking } from "./BookingProvider";

export default function ClosingCta() {
  const { open } = useBooking();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-plum-800 via-plum-700 to-plum-900">
      <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-coral-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 left-1/4 h-72 w-72 rounded-full bg-plum-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center md:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-coral-100">
          Take the first step
        </span>
        <h2 className="mt-6 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
          Stop guessing. <span className="text-gradient-coral">Start hoping.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-white/75">
          A 20-minute call with a senior fertility specialist could change your entire
          path. It&apos;s free — and it may be the conversation you wish you&apos;d had a
          year ago.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => open()}
            className="rounded-full bg-gradient-to-r from-coral-400 to-coral-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-coral-900/40 transition-transform hover:scale-[1.03] active:scale-95"
          >
            Book Your Free Consultation →
          </button>
          <a
            href="tel:+917712000000"
            className="rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            📞 +91 771 200 0000
          </a>
        </div>
        <p className="mt-6 text-xs text-white/55">
          No obligation · 100% confidential · Our team responds within a few hours
        </p>
      </div>
    </section>
  );
}
