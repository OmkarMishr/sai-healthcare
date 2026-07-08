"use client";

import { Flower2, Leaf, Flower } from "lucide-react";
import { useBooking } from "./BookingProvider";
import { useT } from "./LanguageProvider";

const content = {
  en: {
    eyebrow: "Your Ayurvedic path to parenthood",
    titleA: "Conceive naturally, the",
    titleB: "Ayurvedic way.",
    sub: "Panchkarma restores balance to the body so conception can happen on its own — no hormones, no surgery, no IVF. Every plan is tailored to your unique constitution (prakriti).",
    cta: "Find the right therapy for you →",
    steps: [
      {
        step: "Step 01",
        title: "Nadi Pariksha & Dosha Diagnosis",
        body: "We begin with traditional pulse reading and a detailed assessment to find the true root cause — the Vata, Pitta or Kapha imbalance disturbing your reproductive health.",
        tag: "Root-cause first",
        icon: Flower2,
      },
      {
        step: "Step 02",
        title: "Shodhana — Panchkarma Detox",
        body: "Classical cleansing therapies — Vamana, Virechana and Basti — gently purify the body and clear the channels (srotas) that nourish Shukra and Artava dhatu (reproductive tissue).",
        tag: "Gentle & natural",
        icon: Leaf,
      },
      {
        step: "Step 03",
        title: "Uttar Basti & Rasayana",
        body: "Specialised uterine and reproductive therapy paired with rejuvenating Rasayana herbs to strengthen fertility, balance hormones and prepare the body for a healthy conception.",
        tag: "Fertility restoration",
        icon: Flower,
      },
    ],
  },
  hi: {
    eyebrow: "संतान सुख की आपकी आयुर्वेदिक राह",
    titleA: "प्राकृतिक रूप से गर्भधारण,",
    titleB: "आयुर्वेद के साथ।",
    sub: "पंचकर्म शरीर में संतुलन लौटाता है ताकि गर्भधारण स्वाभाविक रूप से हो सके — बिना हार्मोन, बिना सर्जरी, बिना IVF। हर उपचार आपकी प्रकृति के अनुसार तैयार किया जाता है।",
    cta: "अपने लिए सही चिकित्सा जानें →",
    steps: [
      {
        step: "चरण 01",
        title: "नाड़ी परीक्षा एवं दोष निदान",
        body: "हम पारंपरिक नाड़ी परीक्षण और विस्तृत मूल्यांकन से आरंभ करते हैं ताकि असली मूल कारण — प्रजनन स्वास्थ्य को प्रभावित करने वाला वात, पित्त या कफ असंतुलन — का पता चल सके।",
        tag: "पहले मूल कारण",
        icon: Flower2,
      },
      {
        step: "चरण 02",
        title: "शोधन — पंचकर्म शुद्धिकरण",
        body: "वमन, विरेचन और बस्ति जैसी शास्त्रीय शुद्धिकरण चिकित्साएँ शरीर को कोमलता से शुद्ध करती हैं और शुक्र व आर्तव धातु (प्रजनन ऊतक) को पोषित करने वाले स्रोतों को खोलती हैं।",
        tag: "कोमल व प्राकृतिक",
        icon: Leaf,
      },
      {
        step: "चरण 03",
        title: "उत्तर बस्ति एवं रसायन",
        body: "विशेष गर्भाशय एवं प्रजनन चिकित्सा के साथ पुनर्जीवनदायी रसायन औषधियाँ — जो प्रजनन क्षमता बढ़ाती हैं, हार्मोन संतुलित करती हैं और स्वस्थ गर्भधारण के लिए शरीर को तैयार करती हैं।",
        tag: "प्रजनन क्षमता पुनर्स्थापन",
        icon: Flower,
      },
    ],
  },
};

export default function Treatments() {
  const { open } = useBooking();
  const c = useT(content);
  return (
    <section id="treatments" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-500">
            {c.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-plum-900 sm:text-4xl">
            {c.titleA} <span className="text-gradient-coral">{c.titleB}</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-plum-900/65">{c.sub}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {c.steps.map((s) => (
            <div
              key={s.title}
              className="group relative rounded-3xl border border-coral-100 bg-cream-50 p-7 transition-all hover:-translate-y-1 hover:border-coral-200 hover:shadow-xl hover:shadow-coral-500/10"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-coral-600 shadow-sm">
                  <s.icon className="h-6 w-6" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-plum-400">
                  {s.step}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-plum-900">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-plum-900/65">{s.body}</p>
              <span className="mt-5 inline-block rounded-full bg-coral-100 px-3 py-1 text-xs font-semibold text-coral-700">
                {s.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => open()}
            className="rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-coral-500/30 transition-transform hover:scale-[1.03] active:scale-95"
          >
            {c.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
