"use client";

import { useState } from "react";
import { useT } from "./LanguageProvider";

const content = {
  en: {
    eyebrow: "Honest answers",
    title: "Questions couples actually ask us",
    sub: "No medical jargon. Just clear answers from Dr. S.S. Soni and our team.",
    faqs: [
      { q: "Can Ayurveda really help with infertility?", a: "Yes. Many cases of infertility come from dosha imbalances, blocked channels, weak reproductive tissue (dhatu) or stress — all of which Ayurveda addresses at the root. By restoring balance through Panchkarma and herbs, the body is prepared for natural conception." },
      { q: "What is Panchkarma and how does it improve fertility?", a: "Panchkarma is a set of five classical purification therapies (Vamana, Virechana, Basti, Nasya, Raktamokshana). For fertility we use them to detoxify the body, clear the channels that nourish reproductive tissue, and balance hormones — followed by Uttar Basti and Rasayana to strengthen fertility." },
      { q: "Is the treatment safe? Are there side effects?", a: "Our medicines are 100% herbal and plant-based, and every therapy is performed under Dr. Soni's supervision. Ayurvedic fertility treatment is gentle, natural and free of the harmful side effects associated with strong hormonal drugs." },
      { q: "Do you treat male infertility too?", a: "Absolutely. Male factors like low sperm count, poor motility or weak ojas are very common. We evaluate and treat both partners together, using Rasayana herbs and Panchkarma to improve sperm quality naturally." },
      { q: "How long does Ayurvedic fertility treatment take?", a: "It depends on your individual condition, but many couples see meaningful change within 3–6 months. Dr. Soni will give you an honest timeline after your Nadi Pariksha and initial consultation." },
      { q: "Where is the clinic and what are the timings?", a: "Shri Sai Ayurvedic Panchkarma & Infertility Clinic is at 158, Basant Corner, Sita Vihar Colony, behind Shristi Plaza, Avanti Vihar, Raipur, Chhattisgarh. Book an appointment online and our team will confirm your preferred slot." },
    ],
  },
  hi: {
    eyebrow: "सच्चे उत्तर",
    title: "जो प्रश्न दंपति सच में पूछते हैं",
    sub: "कोई कठिन चिकित्सकीय भाषा नहीं। बस डॉ. एस.एस. सोनी और हमारी टीम से स्पष्ट उत्तर।",
    faqs: [
      { q: "क्या आयुर्वेद वास्तव में निःसंतानता में मदद कर सकता है?", a: "हाँ। निःसंतानता के कई मामले दोष असंतुलन, अवरुद्ध स्रोतों, कमजोर प्रजनन धातु या तनाव से होते हैं — इन सभी का आयुर्वेद मूल से उपचार करता है। पंचकर्म और औषधियों द्वारा संतुलन लौटाकर शरीर को प्राकृतिक गर्भधारण के लिए तैयार किया जाता है।" },
      { q: "पंचकर्म क्या है और यह प्रजनन क्षमता कैसे बढ़ाता है?", a: "पंचकर्म पाँच शास्त्रीय शुद्धिकरण चिकित्साओं (वमन, विरेचन, बस्ति, नस्य, रक्तमोक्षण) का समूह है। प्रजनन हेतु हम इनसे शरीर को शुद्ध करते हैं, प्रजनन ऊतक को पोषित करने वाले स्रोत खोलते हैं और हार्मोन संतुलित करते हैं — इसके बाद उत्तर बस्ति व रसायन से प्रजनन क्षमता बढ़ाई जाती है।" },
      { q: "क्या उपचार सुरक्षित है? क्या दुष्प्रभाव होते हैं?", a: "हमारी औषधियाँ 100% हर्बल एवं वनस्पति-आधारित हैं, और हर चिकित्सा डॉ. सोनी की देखरेख में होती है। आयुर्वेदिक प्रजनन उपचार कोमल, प्राकृतिक और तेज़ हार्मोनल दवाओं के हानिकारक दुष्प्रभावों से मुक्त है।" },
      { q: "क्या आप पुरुष निःसंतानता का भी उपचार करते हैं?", a: "बिल्कुल। शुक्राणु की कमी, कम गतिशीलता या कमजोर ओज जैसे पुरुष कारण बहुत सामान्य हैं। हम दोनों साथियों का एक साथ मूल्यांकन व उपचार करते हैं, रसायन औषधियों व पंचकर्म से शुक्राणु गुणवत्ता प्राकृतिक रूप से सुधारते हैं।" },
      { q: "आयुर्वेदिक प्रजनन उपचार में कितना समय लगता है?", a: "यह आपकी व्यक्तिगत स्थिति पर निर्भर करता है, पर कई दंपतियों को 3–6 महीनों में सार्थक बदलाव दिखता है। नाड़ी परीक्षा और प्रारंभिक परामर्श के बाद डॉ. सोनी आपको ईमानदार समय-सीमा बताएँगे।" },
      { q: "क्लिनिक कहाँ है और समय क्या है?", a: "श्री साई आयुर्वेदिक पंचकर्म एवं निःसंतानता क्लिनिक — 158, बसंत कॉर्नर, सीता विहार कॉलोनी, सृष्टि प्लाज़ा के पीछे, अवंती विहार, रायपुर, छत्तीसगढ़। ऑनलाइन अपॉइंटमेंट बुक करें और हमारी टीम आपका पसंदीदा समय पुष्टि करेगी।" },
    ],
  },
};

export default function Faq() {
  const c = useT(content);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-500">
            {c.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-plum-900 sm:text-4xl">
            {c.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-plum-900/65">{c.sub}</p>
        </div>

        <div className="mt-10 space-y-3">
          {c.faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? "border-coral-200 bg-cream-50" : "border-plum-100 bg-white"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-plum-900">{f.q}</span>
                  <span
                    className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg font-bold transition-all ${
                      isOpen ? "rotate-45 bg-coral-500 text-white" : "bg-coral-50 text-coral-600"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-plum-900/70">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
