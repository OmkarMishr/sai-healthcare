"use client";

import { useBooking } from "./BookingProvider";

export default function Hero() {
  const { open } = useBooking();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-coral-50 via-cream-100 to-white"
    >
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-coral-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-plum-200/40 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        {/* Copy */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-coral-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-coral-600">
            🤍 Raipur&apos;s trusted fertility &amp; IVF centre
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-plum-900 sm:text-5xl">
            Your journey to
            <br />
            parenthood, <span className="text-gradient-coral">guided with care.</span>
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-plum-900/70">
            Struggling to conceive? You&apos;re not alone — and it&apos;s rarely without a
            solution. At Sai Healthcare we start with the <strong>right diagnosis</strong>,
            then build a personalised plan, from natural care to advanced IVF.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={() => open()}
              className="rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-coral-500/30 transition-transform hover:scale-[1.03] active:scale-95"
            >
              Book a Free Consultation →
            </button>
            <a
              href="#treatments"
              className="rounded-full border border-plum-200 bg-white px-6 py-3.5 text-sm font-semibold text-plum-800 transition-colors hover:border-coral-300 hover:text-coral-600"
            >
              Explore treatments
            </a>
          </div>

          <div className="mt-7 flex items-center gap-5 text-sm text-plum-900/70">
            <div className="flex -space-x-2">
              {["#1f9d68", "#2c6b48", "#34ad78", "#157a50"].map((c, i) => (
                <span
                  key={i}
                  className="inline-block h-8 w-8 rounded-full border-2 border-white"
                  style={{ background: c }}
                />
              ))}
            </div>
            <span>
              <strong className="text-plum-900">1,200+ couples</strong> welcomed their
              little ones with us
            </span>
          </div>
        </div>

        {/* Visual */}
        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div className="relative mx-auto max-w-md">
            <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-plum-600 via-plum-500 to-coral-500 p-1 shadow-2xl shadow-plum-900/20">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-coral-100 to-plum-100">
                {/* Illustration */}
                <svg
                  viewBox="0 0 400 500"
                  className="absolute inset-0 h-full w-full"
                  aria-label="Parents holding their newborn"
                >
                  <defs>
                    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#d6e8dc" />
                      <stop offset="1" stopColor="#eef5f0" />
                    </linearGradient>
                    <linearGradient id="p1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#2c6b48" />
                      <stop offset="1" stopColor="#1d5136" />
                    </linearGradient>
                    <linearGradient id="p2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#1f9d68" />
                      <stop offset="1" stopColor="#157a50" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="500" fill="url(#sky)" />
                  <circle cx="300" cy="120" r="60" fill="#cdefdd" opacity="0.6" />
                  {/* parent 1 */}
                  <g>
                    <ellipse cx="150" cy="500" rx="120" ry="180" fill="url(#p1)" />
                    <circle cx="150" cy="180" r="46" fill="#f4c9a8" />
                    <path d="M104 165a46 46 0 0 1 92 0c0-30-20-52-46-52s-46 22-46 52z" fill="#3a2140" />
                  </g>
                  {/* parent 2 */}
                  <g>
                    <ellipse cx="270" cy="510" rx="110" ry="170" fill="url(#p2)" />
                    <circle cx="270" cy="200" r="42" fill="#f6d3b6" />
                    <path d="M228 190a42 42 0 0 1 84 0c0-26-18-46-42-46s-42 20-42 46z" fill="#5a2b1a" />
                  </g>
                  {/* baby bundle */}
                  <g transform="translate(196 300)">
                    <ellipse cx="0" cy="0" rx="46" ry="38" fill="#fff6ef" />
                    <circle cx="0" cy="-6" r="20" fill="#f7d9bd" />
                    <path d="M-20 -8a20 20 0 0 1 40 0z" fill="#1f9d68" opacity="0.85" />
                  </g>
                  {/* floating hearts */}
                  <g fill="#1f9d68" opacity="0.8">
                    <path d="M60 90c-6-8-20-6-20 6 0 8 12 16 20 22 8-6 20-14 20-22 0-12-14-14-20-6z" />
                    <path d="M330 300c-4-6-14-4-14 4 0 6 9 11 14 15 5-4 14-9 14-15 0-8-10-10-14-4z" opacity="0.6" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Floating badge: babies */}
            <div className="absolute -left-4 top-8 animate-floaty rounded-2xl border border-coral-100 bg-white p-3 shadow-xl">
              <p className="font-display text-xl font-extrabold text-coral-600">1,200+</p>
              <p className="text-[11px] font-medium text-plum-900/60">Babies delivered</p>
            </div>

            {/* Floating badge: rating */}
            <div className="absolute -right-3 bottom-10 animate-floaty rounded-2xl border border-plum-100 bg-white p-3 shadow-xl [animation-delay:600ms]">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-lg font-extrabold text-plum-900">4.9</span>
                <span className="text-amber-400">★★★★★</span>
              </div>
              <p className="text-[11px] font-medium text-plum-900/60">1,800+ Google reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
