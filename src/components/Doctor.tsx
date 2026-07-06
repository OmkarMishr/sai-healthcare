"use client";

import Image from "next/image";
import { useBooking } from "./BookingProvider";
import { useT } from "./LanguageProvider";

const content = {
  en: {
    eyebrow: "Meet your Ayurvedic fertility expert",
    name: "Dr. S.S. Soni",
    creds: "BAMS · MD · PGDHHM · Ph.D.",
    role: "Panchkarma & Infertility Specialist",
    p1: "Dr. S.S. Soni is a distinguished Ayurvedic practitioner with 20 years of experience, specialising in Panchkarma and the natural treatment of infertility. A proud alumnus of Pt. Shiv Shakti Lal Sharma Ayurvedic Medical College, Ratlam (Vikram University, Ujjain), he is dedicated to holistic healing through authentic Ayurveda.",
    p2: "He leads Shri Sai Ayurvedic Panchkarma & Infertility Clinic in Avanti Vihar, Raipur, where he provides deeply personal care to every patient. His dedication to community health earned him recognition from the former Chief Minister of Chhattisgarh, Shri Bhupesh Baghel, for his contributions to free health check-up camps.",
    facts: [
      { k: "20+ years", v: "of clinical experience" },
      { k: "Panchkarma", v: "& infertility specialist" },
      { k: "Ph.D.", v: "in Ayurveda" },
      { k: "Govt.-recognised", v: "for free health camps" },
    ],
    cta: "Consult Dr. Soni",
    badge: "Recognised by Ex-CM Bhupesh Baghel",
  },
  hi: {
    eyebrow: "मिलिए आपके आयुर्वेदिक निःसंतानता विशेषज्ञ से",
    name: "डॉ. एस.एस. सोनी",
    creds: "BAMS · MD · PGDHHM · Ph.D.",
    role: "पंचकर्म एवं निःसंतानता विशेषज्ञ",
    p1: "डॉ. एस.एस. सोनी 20 वर्षों के अनुभव वाले प्रतिष्ठित आयुर्वेदिक चिकित्सक हैं, जो पंचकर्म एवं निःसंतानता के प्राकृतिक उपचार में विशेषज्ञ हैं। पं. शिव शक्ति लाल शर्मा आयुर्वेदिक मेडिकल कॉलेज, रतलाम (विक्रम विश्वविद्यालय, उज्जैन) के गौरवशाली स्नातक, वे प्रामाणिक आयुर्वेद द्वारा समग्र उपचार के प्रति समर्पित हैं।",
    p2: "वे अवंती विहार, रायपुर स्थित श्री साई आयुर्वेदिक पंचकर्म एवं निःसंतानता क्लिनिक का नेतृत्व करते हैं, जहाँ वे हर रोगी को अत्यंत व्यक्तिगत देखभाल प्रदान करते हैं। सामुदायिक स्वास्थ्य के प्रति उनके समर्पण के लिए छत्तीसगढ़ के पूर्व मुख्यमंत्री श्री भूपेश बघेल द्वारा नि:शुल्क स्वास्थ्य शिविरों में योगदान हेतु उन्हें सम्मानित किया गया है।",
    facts: [
      { k: "20+ वर्ष", v: "का नैदानिक अनुभव" },
      { k: "पंचकर्म", v: "एवं निःसंतानता विशेषज्ञ" },
      { k: "Ph.D.", v: "आयुर्वेद में" },
      { k: "शासन-सम्मानित", v: "नि:शुल्क स्वास्थ्य शिविर" },
    ],
    cta: "डॉ. सोनी से परामर्श करें",
    badge: "पूर्व मुख्यमंत्री भूपेश बघेल द्वारा सम्मानित",
  },
};

export default function Doctor() {
  const { open } = useBooking();
  const c = useT(content);
  return (
    <section id="doctor" className="bg-gradient-to-b from-white to-plum-50">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Photo */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-coral-200/50 to-plum-200/50 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] border-4 border-white bg-plum-100 shadow-2xl shadow-plum-900/20">
              <Image
                src="/dr-soni.jpg"
                alt="Dr. S.S. Soni — Panchkarma & Infertility Specialist"
                width={900}
                height={840}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 w-[90%] -translate-x-1/2 rounded-2xl border border-coral-100 bg-white px-4 py-2.5 text-center shadow-xl">
              <p className="text-xs font-semibold text-plum-900">🏅 {c.badge}</p>
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-500">
              {c.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-plum-900 sm:text-4xl">
              {c.name}
            </h2>
            <p className="mt-1 font-semibold text-coral-600">{c.creds}</p>
            <p className="text-sm font-medium text-plum-900/60">{c.role}</p>

            <p className="mt-5 text-[15px] leading-relaxed text-plum-900/70">{c.p1}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-plum-900/70">{c.p2}</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {c.facts.map((f) => (
                <div
                  key={f.k}
                  className="rounded-xl border border-plum-100 bg-white px-4 py-3"
                >
                  <p className="font-display text-sm font-extrabold text-plum-900">{f.k}</p>
                  <p className="text-xs text-plum-900/60">{f.v}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => open("infertility")}
              className="mt-7 rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-coral-500/30 transition-transform hover:scale-[1.03] active:scale-95"
            >
              {c.cta} →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
