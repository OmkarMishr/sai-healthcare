export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-coral-400 to-coral-600 shadow-sm">
        <svg viewBox="0 0 64 64" className="h-5 w-5" aria-hidden>
          <path
            d="M32 47c-1 0-1.9-.35-2.63-1.02C24.9 41.9 16 33.9 16 26.3 16 21.2 20 17 25 17c3 0 5.5 1.5 7 3.9 1.5-2.4 4-3.9 7-3.9 5 0 9 4.2 9 9.3 0 7.6-8.9 15.6-13.37 19.68C33.9 46.65 33 47 32 47z"
            fill="#fff"
          />
          <circle cx="32" cy="28" r="3.2" fill="#157a50" />
        </svg>
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-lg font-extrabold tracking-tight ${
            light ? "text-white" : "text-plum-900"
          }`}
        >
          Sai Healthcare
        </span>
        <span
          className={`block text-[10px] font-semibold uppercase tracking-[0.18em] ${
            light ? "text-coral-200" : "text-coral-500"
          }`}
        >
          Fertility & IVF · Raipur
        </span>
      </span>
    </div>
  );
}
