"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useBooking } from "./BookingProvider";
import { useLanguage, useT } from "./LanguageProvider";

type NavLink = { label: string; href: string; children?: { label: string; href: string }[] };

const content = {
  en: {
    announce: "Now booking this week — Consult Dr. S.S. Soni · 20 years in Ayurvedic infertility care",
    links: [
      { label: "Services", href: "#therapies" },
      { label: "About Us", href: "#about" },
      {
        label: "Doctors",
        href: "#doctor",
        children: [
          { label: "Dr. S.S. Soni", href: "#doctor" },
          { label: "Dr. Varsha Soni", href: "#doctor" },
        ],
      },
      { label: "Health Insurance", href: "#insurance" },
      { label: "Testimonies", href: "#stories" },
      { label: "Gallery", href: "#gallery" },
    ] as NavLink[],
    book: "Book Appointment",
    login: "Login / Sign up",
  },
  hi: {
    announce: "इस सप्ताह अपॉइंटमेंट बुक करें — डॉ. एस.एस. सोनी से परामर्श · आयुर्वेदिक निःसंतानता में 20 वर्षों का अनुभव",
    links: [
      { label: "सेवाएँ", href: "#therapies" },
      { label: "हमारे बारे में", href: "#about" },
      {
        label: "चिकित्सक",
        href: "#doctor",
        children: [
          { label: "डॉ. एस.एस. सोनी", href: "#doctor" },
          { label: "डॉ. वर्षा सोनी", href: "#doctor" },
        ],
      },
      { label: "स्वास्थ्य बीमा", href: "#insurance" },
      { label: "प्रशंसापत्र", href: "#stories" },
      { label: "गैलरी", href: "#gallery" },
    ] as NavLink[],
    book: "अपॉइंटमेंट बुक करें",
    login: "लॉगिन / साइन अप",
  },
};

function LangToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center rounded-full border border-plum-200 bg-white p-0.5 text-xs font-bold">
      <button
        onClick={() => setLang("en")}
        className={`rounded-full px-2.5 py-1 transition-colors ${lang === "en" ? "bg-coral-500 text-white" : "text-plum-900/60"}`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        onClick={() => setLang("hi")}
        className={`rounded-full px-2.5 py-1 transition-colors ${lang === "hi" ? "bg-coral-500 text-white" : "text-plum-900/60"}`}
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
    <header className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-gradient-to-r from-coral-500 via-coral-400 to-coral-500 text-white">
        <p className="mx-auto max-w-6xl px-4 py-2 text-center text-[13px] font-medium">
          {c.announce}
        </p>
      </div>

      {/* Main nav */}
      <div
        className={`border-b transition-all ${
          scrolled ? "border-coral-100 bg-white/90 shadow-sm backdrop-blur" : "border-transparent bg-white"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#top" aria-label="Shri Sai Ayurveda home" className="min-w-0">
            <Logo />
          </a>

          {/* Desktop links — centered & balanced */}
          <div className="hidden flex-1 items-center justify-center gap-6 xl:flex 2xl:gap-8">
            {c.links.map((l) =>
              l.children ? (
                <div key={l.label} className="group relative">
                  <a
                    href={l.href}
                    className="flex items-center gap-1 whitespace-nowrap text-sm font-medium text-plum-900/80 transition-colors hover:text-coral-600"
                  >
                    {l.label}
                    <span className="text-[10px]">▾</span>
                  </a>
                  <div className="invisible absolute left-1/2 top-full z-10 min-w-44 -translate-x-1/2 translate-y-1 rounded-xl border border-plum-100 bg-white p-1.5 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {l.children.map((ch) => (
                      <a
                        key={ch.label}
                        href={ch.href}
                        className="block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-plum-900/80 hover:bg-coral-50 hover:text-coral-600"
                      >
                        {ch.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  className="whitespace-nowrap text-sm font-medium text-plum-900/80 transition-colors hover:text-coral-600"
                >
                  {l.label}
                </a>
              ),
            )}
          </div>

          {/* Right cluster */}
          <div className="flex shrink-0 items-center gap-2.5">
            <LangToggle />

            {/* Desktop actions */}
            <Link
              href="/admin/login"
              className="hidden whitespace-nowrap rounded-full border border-plum-200 px-4 py-2 text-sm font-semibold text-plum-800 transition-colors hover:border-coral-300 hover:text-coral-600 xl:block"
            >
              {c.login}
            </Link>
            <button
              onClick={() => open()}
              className="hidden whitespace-nowrap rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-coral-500/25 transition-transform hover:scale-[1.03] active:scale-95 xl:block"
            >
              {c.book}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-plum-900 xl:hidden"
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-coral-100 bg-white px-4 py-3 lg:hidden">
            <div className="flex flex-col gap-1">
              {c.links.map((l) => (
                <a
                  key={l.label}
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
              <Link
                href="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg border border-plum-200 px-3 py-2.5 text-sm font-semibold text-plum-800"
              >
                {c.login}
              </Link>
              <a href="tel:+919770130255" className="rounded-lg px-3 py-2.5 text-sm font-semibold text-coral-600">
                Call: 097701 30255
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
