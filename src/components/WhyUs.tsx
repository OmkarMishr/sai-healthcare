"use client";

import { Flower2, Leaf, HeartHandshake, Sprout, Stethoscope, Medal } from "lucide-react";
import { useT } from "./LanguageProvider";

const content = {
  en: {
    eyebrow: "Why couples choose Shri Sai Ayurveda",
    titleA: "Ancient Wisdom.",
    titleB: "Real Results.",
    sub: "No side effects, no guesswork — just authentic Ayurveda, personally guided by Dr. S.S. Soni & Dr. Varsha Soni.",
    features: [
      { title: "Root-Cause Diagnosis", body: "Through Nadi Pariksha (pulse reading) we find the true dosha imbalance behind your infertility — never a one-size-fits-all remedy.", icon: Flower2 },
      { title: "Classical Panchkarma", body: "Authentic Vamana, Virechana, Basti and Uttar Basti therapies performed with traditional precision and modern hygiene.", icon: Leaf },
      { title: "Both Partners Treated", body: "Male and female infertility evaluated together. Many cases are simply about sperm quality or ojas — and are gently corrected.", icon: HeartHandshake },
      { title: "100% Natural, No Side Effects", body: "Herbal, plant-based medicines and therapies that heal the whole body — safe, gentle and free of harmful chemicals.", icon: Sprout },
      { title: "Personally by Dr. Soni", body: "You are seen and guided by Dr. S.S. Soni himself at every visit — 20 years of experience behind every plan.", icon: Stethoscope },
      { title: "Trusted & Recognised", body: "A government-recognised practitioner honoured for free health camps, trusted by 1,000+ families across Chhattisgarh.", icon: Medal },
    ],
  },
  hi: {
    eyebrow: "दंपति श्री साई आयुर्वेद को क्यों चुनते हैं",
    titleA: "प्राचीन ज्ञान।",
    titleB: "वास्तविक परिणाम।",
    sub: "कोई दुष्प्रभाव नहीं, कोई अनुमान नहीं — केवल प्रामाणिक आयुर्वेद, डॉ. एस.एस. सोनी के व्यक्तिगत मार्गदर्शन में।",
    features: [
      { title: "मूल कारण का निदान", body: "नाड़ी परीक्षा द्वारा हम आपकी निःसंतानता के पीछे असली दोष असंतुलन का पता लगाते हैं — कभी भी एक जैसा इलाज सबके लिए नहीं।", icon: Flower2 },
      { title: "शास्त्रीय पंचकर्म", body: "प्रामाणिक वमन, विरेचन, बस्ति एवं उत्तर बस्ति चिकित्सा — पारंपरिक सटीकता और आधुनिक स्वच्छता के साथ।", icon: Leaf },
      { title: "दोनों साथी का उपचार", body: "पुरुष एवं स्त्री निःसंतानता का एक साथ मूल्यांकन। कई मामले केवल शुक्र गुणवत्ता या ओज से जुड़े होते हैं — जिन्हें कोमलता से ठीक किया जाता है।", icon: HeartHandshake },
      { title: "100% प्राकृतिक, कोई दुष्प्रभाव नहीं", body: "हर्बल, वनस्पति-आधारित औषधियाँ एवं चिकित्सा जो पूरे शरीर को स्वस्थ करती हैं — सुरक्षित, कोमल और हानिकारक रसायनों से मुक्त।", icon: Sprout },
      { title: "स्वयं डॉ. सोनी द्वारा", body: "हर बार डॉ. एस.एस. सोनी स्वयं आपको देखते और मार्गदर्शन करते हैं — हर उपचार के पीछे 20 वर्षों का अनुभव।", icon: Stethoscope },
      { title: "विश्वसनीय व सम्मानित", body: "नि:शुल्क स्वास्थ्य शिविरों हेतु सम्मानित शासन-मान्य चिकित्सक, छत्तीसगढ़ भर के 1,000+ परिवारों का विश्वास।", icon: Medal },
    ],
  },
};

export default function WhyUs() {
  const c = useT(content);
  return (
    <section id="why-us" className="bg-gradient-to-b from-plum-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-plum-600">
            {c.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-plum-900 sm:text-4xl">
            {c.titleA} <span className="text-gradient-coral">{c.titleB}</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-plum-900/65">{c.sub}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-plum-100 bg-white p-6 transition-all hover:border-coral-200 hover:shadow-lg hover:shadow-plum-500/5"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-coral-50 text-coral-600">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-plum-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-plum-900/65">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
