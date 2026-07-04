import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-plum-900 text-white/70">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              A dedicated fertility &amp; IVF centre in Raipur, helping couples across
              Chhattisgarh build their families with honest diagnosis and personalised
              care.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-white">Treatments</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#treatments" className="hover:text-coral-300">IVF &amp; ICSI</a></li>
              <li><a href="#treatments" className="hover:text-coral-300">IUI</a></li>
              <li><a href="#treatments" className="hover:text-coral-300">Ovulation Induction</a></li>
              <li><a href="#treatments" className="hover:text-coral-300">Fertility Evaluation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-white">Clinic</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#why-us" className="hover:text-coral-300">Why Us</a></li>
              <li><a href="#stories" className="hover:text-coral-300">Success Stories</a></li>
              <li><a href="#faq" className="hover:text-coral-300">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-white">Reach Us</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>📍 Pandri, Raipur, Chhattisgarh</li>
              <li>📞 <a href="tel:+917712000000" className="hover:text-coral-300">+91 771 200 0000</a></li>
              <li>✉️ <a href="mailto:care@saihealthcare.in" className="hover:text-coral-300">care@saihealthcare.in</a></li>
              <li>🕘 Mon–Sat · 9 AM – 7 PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Sai Healthcare Fertility &amp; IVF Centre, Raipur. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/70">Privacy</a>
            <a href="#" className="hover:text-white/70">Terms</a>
            <span>Awarded Fertility Care · Chhattisgarh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
