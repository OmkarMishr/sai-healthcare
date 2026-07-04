"use client";

import { useBooking } from "./BookingProvider";

const rows = [
  { param: "Diagnosis", us: "Real tests, real cause", them: "One remedy for everyone" },
  { param: "Doctor Access", us: "Senior specialist, first call", them: "Chemist or agent, no doctor" },
  { param: "Treatment Plan", us: "Custom plan for your body", them: "Same course for PCOS, low AMH, all" },
  { param: "Male Partner Care", us: "Semen analysis included", them: "Female-only focus" },
  { param: "If First Step Fails", us: "Step up to IUI / IVF in-house", them: "You start over elsewhere" },
  { param: "Time to Pregnancy", us: "Targeted protocol, faster results", them: "6–12 months, often unsuccessful" },
  { param: "Cost Transparency", us: "Clear costs, no upselling", them: "Recurring monthly charges" },
];

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
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-500">
            How we compare
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-plum-900 sm:text-4xl">
            Real Fertility Care vs.{" "}
            <span className="text-gradient-coral">Quick-Fix Tablets</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-plum-900/65">
            Why a senior specialist beats a one-size-fits-all supplement — every time.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto">
          <div className="min-w-[560px] overflow-hidden rounded-3xl border border-plum-100 shadow-sm">
            {/* header */}
            <div className="grid grid-cols-[1.2fr_1fr_1fr]">
              <div className="bg-plum-50 px-5 py-4 text-xs font-bold uppercase tracking-wider text-plum-600">
                Parameter
              </div>
              <div className="bg-gradient-to-br from-coral-500 to-coral-600 px-5 py-4 text-center">
                <p className="font-display text-sm font-bold text-white">Sai Healthcare</p>
                <p className="text-[11px] font-medium text-coral-100">Senior Specialists</p>
              </div>
              <div className="bg-plum-50 px-5 py-4 text-center">
                <p className="font-display text-sm font-bold text-plum-900/70">Tablet Remedies</p>
                <p className="text-[11px] font-medium text-plum-900/45">Over-the-counter</p>
              </div>
            </div>
            {/* rows */}
            {rows.map((r, i) => (
              <div
                key={r.param}
                className={`grid grid-cols-[1.2fr_1fr_1fr] items-center ${
                  i % 2 ? "bg-cream-50" : "bg-white"
                }`}
              >
                <div className="px-5 py-4 text-sm font-semibold text-plum-900">
                  {r.param}
                </div>
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
            className="rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-coral-500/30 transition-transform hover:scale-[1.03] active:scale-95"
          >
            📞 Talk to a real doctor — Free
          </button>
        </div>
      </div>
    </section>
  );
}
