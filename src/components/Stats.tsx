const stats = [
  { value: "1,200+", label: "Babies Delivered" },
  { value: "68%", label: "IVF Success Rate" },
  { value: "15+", label: "Years of Care" },
  { value: "4.9★", label: "Google · 1.8k Reviews" },
];

export default function Stats() {
  return (
    <section className="bg-gradient-to-r from-plum-800 via-plum-700 to-plum-800">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-4 py-8 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center text-center"
          >
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
