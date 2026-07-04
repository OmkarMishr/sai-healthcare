"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useBooking } from "./BookingProvider";

const links = [
  { label: "Your Path", href: "#treatments" },
  { label: "Why Us", href: "#why-us" },
  { label: "Success Stories", href: "#stories" },
  { label: "FAQs", href: "#faq" },
];

export default function Navbar() {
  const { open } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* Announcement bar */}
      <div className="bg-gradient-to-r from-coral-500 via-coral-400 to-coral-500 text-white">
        <p className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center text-[13px] font-medium">
          <span className="animate-floaty">✦</span>
          Limited slots this week — Free first consultation with a senior fertility specialist
        </p>
      </div>

      {/* Main nav */}
      <div
        className={`border-b transition-all ${
          scrolled
            ? "border-coral-100 bg-white/90 shadow-sm backdrop-blur"
            : "border-transparent bg-white"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" aria-label="Sai Healthcare home">
            <Logo />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-plum-900/80 transition-colors hover:text-coral-600"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+917712000000"
              className="hidden text-sm font-semibold text-plum-900 lg:block"
            >
              +91 771 200 0000
            </a>
            <button
              onClick={() => open()}
              className="rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-coral-500/25 transition-transform hover:scale-[1.03] active:scale-95"
            >
              Book Appointment
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-plum-900 md:hidden"
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-coral-100 bg-white px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-plum-900/85 hover:bg-coral-50"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:+917712000000"
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-coral-600"
              >
                📞 +91 771 200 0000
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
