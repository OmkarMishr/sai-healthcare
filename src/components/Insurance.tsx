"use client";

import { useBooking } from "./BookingProvider";
import { useT } from "./LanguageProvider";

const content = {
  en: {
    eyebrow: "Health insurance & assistance",
    titleA: "Treatment made",
    titleB: "affordable.",
    sub: "We help you make the most of your health coverage so quality Ayurvedic care never feels out of reach.",
    points: [
      { icon: "🏥", title: "AYUSH Insurance Support", body: "Ayurvedic & Panchkarma treatments are increasingly covered under AYUSH health-insurance policies. Our team helps you check and use your benefits." },
      { icon: "🧾", title: "Cashless & Reimbursement", body: "We assist with documentation for cashless approvals and reimbursement claims wherever your insurer supports Ayurvedic care." },
      { icon: "📄", title: "Complete Paperwork Help", body: "Bills, treatment summaries and doctor certificates — we provide the records your insurance provider needs, hassle-free." },
      { icon: "💚", title: "Transparent, Fair Pricing", body: "Clear, upfront costs for every therapy and package, with affordable options for families paying out of pocket." },
    ],
    note: "Coverage varies by insurer and policy. Talk to us and we'll help you understand your options.",
    cta: "Ask about insurance",
  },
  hi: {
    eyebrow: "स्वास्थ्य बीमा एवं सहायता",
    titleA: "उपचार अब",
    titleB: "सुलभ।",
    sub: "हम आपकी स्वास्थ्य बीमा सुविधा का पूरा लाभ दिलाने में सहायता करते हैं, ताकि गुणवत्तापूर्ण आयुर्वेदिक देखभाल कभी दूर न लगे।",
    points: [
      { icon: "🏥", title: "आयुष बीमा सहायता", body: "आयुर्वेदिक एवं पंचकर्म उपचार अब आयुष स्वास्थ्य बीमा पॉलिसियों में तेजी से शामिल हो रहे हैं। हमारी टीम आपके लाभ जाँचने व उपयोग करने में मदद करती है।" },
      { icon: "🧾", title: "कैशलेस व प्रतिपूर्ति", body: "जहाँ आपका बीमाकर्ता आयुर्वेदिक देखभाल का समर्थन करता है, वहाँ कैशलेस स्वीकृति व रीइम्बर्समेंट दावों के दस्तावेज़ में हम सहायता करते हैं।" },
      { icon: "📄", title: "पूर्ण कागज़ी सहायता", body: "बिल, उपचार सारांश व चिकित्सक प्रमाणपत्र — आपके बीमा के लिए आवश्यक सभी दस्तावेज़ हम बिना झंझट उपलब्ध कराते हैं।" },
      { icon: "💚", title: "पारदर्शी, उचित मूल्य", body: "हर चिकित्सा व पैकेज की स्पष्ट, अग्रिम लागत — स्वयं भुगतान करने वाले परिवारों के लिए किफायती विकल्पों के साथ।" },
    ],
    note: "कवरेज बीमाकर्ता व पॉलिसी के अनुसार भिन्न होता है। हमसे बात करें, हम आपके विकल्प समझने में मदद करेंगे।",
    cta: "बीमा के बारे में पूछें",
  },
};

export default function Insurance() {
  const { open } = useBooking();
  const c = useT(content);
  return (
    <section id="insurance" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-500">{c.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-plum-900 sm:text-4xl">
              {c.titleA} <span className="text-gradient-coral">{c.titleB}</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-plum-900/65">{c.sub}</p>
            <p className="mt-4 rounded-xl bg-cream-50 px-4 py-3 text-sm text-plum-900/60">ℹ️ {c.note}</p>
            <button
              onClick={() => open()}
              className="mt-6 rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-coral-500/30 transition-transform hover:scale-[1.03] active:scale-95"
            >
              {c.cta} →
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {c.points.map((p) => (
              <div key={p.title} className="rounded-2xl border border-plum-100 bg-cream-50 p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  {p.icon}
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-plum-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-plum-900/65">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
