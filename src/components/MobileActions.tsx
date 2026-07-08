"use client";

import { useEffect, useState } from "react";
import { useBooking } from "./BookingProvider";
import { useT } from "./LanguageProvider";

const WHATSAPP_NUMBER = "919770130255";

const content = {
  en: {
    whatsapp: "WhatsApp",
    book: "Book Appointment",
    prefill: "Hello Shri Sai Ayurveda, I would like to book an appointment.",
  },
  hi: {
    whatsapp: "व्हाट्सएप",
    book: "अपॉइंटमेंट बुक करें",
    prefill: "नमस्ते श्री साई आयुर्वेद, मैं एक अपॉइंटमेंट बुक करना चाहता/चाहती हूँ।",
  },
};

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.82.74 5.47 2.03 7.77L.5 31.5l7.9-2.06A15.4 15.4 0 0016 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28.2c-2.5 0-4.85-.67-6.87-1.84l-.49-.29-4.69 1.22 1.25-4.57-.32-.5A12.6 12.6 0 013.3 16C3.3 9 8.99 3.3 16 3.3S28.7 9 28.7 16 23.01 28.7 16 28.7zm7.2-9.5c-.39-.2-2.32-1.14-2.68-1.27-.36-.13-.62-.2-.88.2-.26.39-1.01 1.27-1.24 1.53-.23.26-.46.29-.85.1-.39-.2-1.65-.61-3.14-1.94-1.16-1.03-1.95-2.31-2.18-2.7-.23-.39-.02-.6.17-.8.18-.18.39-.46.59-.69.2-.23.26-.39.39-.65.13-.26.07-.49-.03-.69-.1-.2-.88-2.12-1.2-2.9-.32-.75-.64-.65-.88-.66h-.75c-.26 0-.68.1-1.04.49-.36.39-1.36 1.33-1.36 3.24 0 1.91 1.39 3.76 1.59 4.02.2.26 2.74 4.18 6.64 5.86.93.4 1.65.64 2.22.82.93.3 1.78.25 2.45.15.75-.11 2.32-.95 2.64-1.86.33-.91.33-1.69.23-1.86-.1-.16-.36-.26-.75-.46z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" strokeLinecap="round" />
    </svg>
  );
}

export default function MobileActions() {
  const { open } = useBooking();
  const c = useT(content);
  const [top, setTop] = useState(112);

  // Sit just below the navbar, re-measuring when it changes height
  // (e.g. the announcement bar wrapping, or a language switch).
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const update = () => setTop(header.getBoundingClientRect().height + 10);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(header);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(c.prefill)}`;

  return (
    <div
      className="fixed right-3 z-40 flex flex-col items-end gap-2 xl:hidden"
      style={{ top }}
    >
      {/* Book Appointment */}
      <button
        onClick={() => open()}
        aria-label={c.book}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-coral-500 to-coral-600 py-2.5 pl-3.5 pr-4 text-xs font-bold text-white shadow-lg shadow-coral-500/40 active:scale-95"
      >
        <CalendarIcon />
        {c.book}
      </button>

      {/* WhatsApp */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={c.whatsapp}
        className="flex items-center gap-2 rounded-full bg-[#25D366] py-2.5 pl-3.5 pr-4 text-xs font-bold text-white shadow-lg shadow-[#25D366]/40 active:scale-95"
      >
        <WhatsAppIcon />
        {c.whatsapp}
      </a>
    </div>
  );
}
