const features = [
  {
    title: "Natural-First Philosophy",
    body: "We start with the simplest option that can work for you — and only escalate when your body genuinely needs it.",
    icon: "🌿",
  },
  {
    title: "Real Diagnosis, Not Guesses",
    body: "Targeted tests for both partners reveal the actual cause — never a one-size-fits-all assumption.",
    icon: "🔍",
  },
  {
    title: "Same Specialist Every Visit",
    body: "No rotating consults. The senior fertility specialist who sees you first stays with you throughout your journey.",
    icon: "👩‍⚕️",
  },
  {
    title: "Both Partners Cared For",
    body: "Female and male fertility evaluated together. Many 'unexplained' cases are simply sperm-related and easily treated.",
    icon: "🤝",
  },
  {
    title: "Transparent Pricing",
    body: "Clear costs upfront for every step. No upselling, no hidden charges, no surprise bills at the counter.",
    icon: "💳",
  },
  {
    title: "Advanced In-House Lab",
    body: "Our own IVF & embryology lab in Raipur — no samples shipped out, no delays, full control over quality.",
    icon: "🧪",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-gradient-to-b from-plum-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-plum-600">
            Why couples choose Sai Healthcare
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-plum-900 sm:text-4xl">
            Real Doctors. Real Diagnosis. <br className="hidden sm:block" />
            <span className="text-gradient-coral">Real Plan.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-plum-900/65">
            No tablets, no guesswork. Just senior fertility specialists who recommend
            what&apos;s genuinely right for your body.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-plum-100 bg-white p-6 transition-all hover:border-coral-200 hover:shadow-lg hover:shadow-plum-500/5"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-coral-50 text-xl">
                {f.icon}
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-plum-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-plum-900/65">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
