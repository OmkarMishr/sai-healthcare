"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useBooking } from "./BookingProvider";
import { useLanguage, useT } from "./LanguageProvider";

const content = {
  en: {
    announce: "Now booking this week — Consult Dr. S.S. Soni · 20 years in Ayurvedic infertility care",
    links: [
      { label: "Treatments", href: "#treatments" },
      { label: "Dr. Soni", href: "#doctor" },
      { label: "Why Us", href: "#why-us" },
      { label: "Stories", href: "#stories" },
      { label: "FAQs", href: "#faq" },
    ],
    book: "Book Appointment",
  },
  hi: {
    announce: "इस सप्ताह अपॉइंटमेंट बुक करें — डॉ. एस.एस. सोनी से परामर्श · आयुर्वेदिक निःसंतानता में 20 वर्षों का अनुभव",
    links: [
      { label: "उपचार", href: "#treatments" },
      { label: "डॉ. सोनी", href: "#doctor" },
      { label: "क्यों चुनें", href: "#why-us" },
      { label: "अनुभव", href: "#stories" },
      { label: "सामान्य प्रश्न", href: "#faq" },
    ],
    book: "अपॉइंटमेंट बुक करें",
  },
};

function LangToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center rounded-full border border-plum-200 bg-white p-0.5 text-xs font-bold">
      <button
        onClick={() => setLang("en")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "en" ? "bg-coral-500 text-white" : "text-plum-900/60"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        onClick={() => setLang("hi")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "hi" ? "bg-coral-500 text-white" : "text-plum-900/60"
        }`}
        aria-pressed={lang === "hi"}
      >
        हिं
      </button>
    </div>
  );
}

export default function Navbar() {
  const { open } = useBooking();
  const c = useT(content);
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
          {c.announce}
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
          <a href="#top" aria-label="Shri Sai Ayurveda home">
            <Logo />
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {c.links.map((l) => (
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
            <LangToggle />
            <button
              onClick={() => open()}
              className="hidden rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-coral-500/25 transition-transform hover:scale-[1.03] active:scale-95 sm:block"
            >
              {c.book}
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
              {c.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-plum-900/85 hover:bg-coral-50"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  open();
                }}
                className="mt-1 rounded-lg bg-coral-500 px-3 py-2.5 text-left text-sm font-semibold text-white"
              >
                {c.book}
              </button>
              <a
                href="tel:+919770130255"
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-coral-600"
              >
                📞 097701 30255
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
