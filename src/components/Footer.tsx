"use client";

import Logo from "./Logo";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useT } from "./LanguageProvider";

const content = {
  en: {
    blurb:
      "An Ayurvedic Panchkarma & infertility clinic in Avanti Vihar, Raipur, led by Dr. S.S. Soni — helping couples across Chhattisgarh build their families the natural way.",
    treatmentsH: "Treatments",
    treatments: ["Panchkarma Therapy", "Infertility Care", "Uttar Basti", "Nadi Pariksha"],
    clinicH: "Clinic",
    clinic: [
      { label: "Dr. S.S. Soni", href: "#doctor" },
      { label: "Why Us", href: "#why-us" },
      { label: "Success Stories", href: "#stories" },
      { label: "FAQs", href: "#faq" },
    ],
    reachH: "Reach Us",
    address:
      "158, Basant Corner, Sita Vihar Colony, Behind Shristi Plaza, Avanti Vihar, Raipur, Chhattisgarh",
    timing: "Mon–Sat · 10 AM – 8 PM",
    rights: "All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
    award: "Govt.-Recognised Ayurvedic Care · Chhattisgarh",
  },
  hi: {
    blurb:
      "अवंती विहार, रायपुर स्थित एक आयुर्वेदिक पंचकर्म एवं निःसंतानता क्लिनिक, डॉ. एस.एस. सोनी के नेतृत्व में — छत्तीसगढ़ भर के दंपतियों को प्राकृतिक रूप से परिवार बसाने में सहायता।",
    treatmentsH: "उपचार",
    treatments: ["पंचकर्म चिकित्सा", "निःसंतानता उपचार", "उत्तर बस्ति", "नाड़ी परीक्षा"],
    clinicH: "क्लिनिक",
    clinic: [
      { label: "डॉ. एस.एस. सोनी", href: "#doctor" },
      { label: "क्यों चुनें", href: "#why-us" },
      { label: "सफलता की कहानियाँ", href: "#stories" },
      { label: "सामान्य प्रश्न", href: "#faq" },
    ],
    reachH: "संपर्क करें",
    address:
      "158, बसंत कॉर्नर, सीता विहार कॉलोनी, सृष्टि प्लाज़ा के पीछे, अवंती विहार, रायपुर, छत्तीसगढ़",
    timing: "सोम–शनि · सुबह 10 – रात 8 बजे",
    rights: "सर्वाधिकार सुरक्षित।",
    privacy: "गोपनीयता",
    terms: "नियम",
    award: "शासन-मान्य आयुर्वेदिक चिकित्सा · छत्तीसगढ़",
  },
};

export default function Footer() {
  const c = useT(content);
  return (
    <footer className="bg-plum-900 text-white/70">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{c.blurb}</p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-white">{c.treatmentsH}</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.treatments.map((t) => (
                <li key={t}>
                  <a href="#treatments" className="hover:text-coral-300">
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-white">{c.clinicH}</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.clinic.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-coral-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-white">{c.reachH}</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral-300" />
                <span>{c.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-coral-300" />
                <a href="tel:+919770130255" className="hover:text-coral-300">
                  097701 30255
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-coral-300" />
                <a href="tel:+919770130255" className="hover:text-coral-300">
                  09229693191
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-coral-300" />
                <a href="mailto:shivsai81@gmail.com" className="hover:text-coral-300">
                  shivsai81@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-coral-300" />
                <span>{c.timing}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Shri Sai Ayurvedic Panchkarma &amp; Infertility
            Clinic, Raipur. {c.rights}
          </p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/70">
              {c.privacy}
            </a>
            <a href="#" className="hover:text-white/70">
              {c.terms}
            </a>
            <span>{c.award}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
