const reviews = [
  {
    name: "Pooja & Rahul",
    initial: "P",
    color: "#1f9d68",
    tag: "Conceived via IUI",
    text: "We were told to go straight for IVF by another clinic. At Sai Healthcare, Dr. Sharma actually ran the tests and found it was a simple hormonal issue. We conceived on the second cycle. Forever grateful.",
  },
  {
    name: "Swati Verma",
    initial: "S",
    color: "#2c6b48",
    tag: "PCOS · natural conception",
    text: "PCOS made my cycles unpredictable for years. Three months of ovulation induction with the right diet plan, and I was pregnant naturally. I only wish I had come here sooner.",
  },
  {
    name: "Reshma & Anil",
    initial: "R",
    color: "#0f5f3e",
    tag: "Male factor infertility",
    text: "Everyone kept pushing my wife for tests. Here they checked me too — a simple semen analysis found the real issue. A short treatment later, our son is now 1 year old.",
  },
  {
    name: "Aishwarya M.",
    initial: "A",
    color: "#34ad78",
    tag: "Low AMH · conceived via IVF",
    text: "With low AMH at 34, other places said IVF or nothing. The team here was honest about my real chances. Two cycles of IVF and I'm 6 months pregnant. The transparency meant everything.",
  },
];

function Stars() {
  return <span className="text-amber-400 text-sm">★★★★★</span>;
}

export default function Testimonials() {
  return (
    <section id="stories" className="bg-gradient-to-b from-white to-plum-50">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-plum-600">
            Real stories from Raipur
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-plum-900 sm:text-4xl">
            Families who found their{" "}
            <span className="text-gradient-coral">happy ending</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            <Stars />
            <span className="font-bold text-plum-900">4.9</span>
            <span className="text-plum-900/55">· 1,800+ verified Google reviews</span>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl border border-plum-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-plum-500/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full font-display text-lg font-bold text-white"
                    style={{ background: r.color }}
                  >
                    {r.initial}
                  </span>
                  <div>
                    <p className="font-semibold text-plum-900">{r.name}</p>
                    <Stars />
                  </div>
                </div>
                <span className="rounded-full bg-coral-50 px-2.5 py-1 text-[11px] font-semibold text-coral-700">
                  {r.tag}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-plum-900/70">
                &ldquo;{r.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
