"use client";

import { useT } from "./LanguageProvider";

const colors = ["#1f9d68", "#2c6b48", "#0f5f3e", "#34ad78"];

const content = {
  en: {
    eyebrow: "Real stories from Raipur",
    titleA: "Families who found their",
    titleB: "happy ending",
    ratingNote: "· Trusted by 1,000+ families",
    reviews: [
      { name: "Pooja & Rahul", initial: "P", tag: "Conceived after Panchkarma", text: "After 4 years and countless tests elsewhere, Dr. Soni found a Vata imbalance no one had checked. Three months of Panchkarma and we conceived naturally. No IVF, no side effects." },
      { name: "Swati Verma", initial: "S", tag: "PCOS treated naturally", text: "My PCOS made everything unpredictable. The herbal medicines and Virechana therapy balanced my cycles within months, and I'm now pregnant. I only wish I'd come here first." },
      { name: "Reshma & Anil", initial: "R", tag: "Male infertility", text: "Everyone kept testing my wife. Here Dr. Soni checked me too and treated low sperm count with Rasayana herbs. Our son is now one year old. Forever grateful." },
      { name: "Aishwarya M.", initial: "A", tag: "Uttar Basti therapy", text: "I was told IVF was my only option. Dr. Soni was honest and gentle — Uttar Basti and a proper diet plan changed everything. Six months pregnant and so thankful." },
    ],
  },
  hi: {
    eyebrow: "रायपुर से सच्ची कहानियाँ",
    titleA: "जिन परिवारों को मिली",
    titleB: "खुशियों की सौगात",
    ratingNote: "· 1,000+ परिवारों का विश्वास",
    reviews: [
      { name: "पूजा व राहुल", initial: "P", tag: "पंचकर्म के बाद गर्भधारण", text: "4 वर्ष और कई जगह जाँचों के बाद, डॉ. सोनी ने एक वात असंतुलन पकड़ा जिसे किसी ने नहीं देखा था। तीन महीने के पंचकर्म से हमने प्राकृतिक रूप से गर्भधारण किया। न IVF, न कोई दुष्प्रभाव।" },
      { name: "स्वाति वर्मा", initial: "S", tag: "PCOS का प्राकृतिक उपचार", text: "मेरे PCOS ने सब अनिश्चित कर दिया था। हर्बल औषधियों और विरेचन चिकित्सा ने कुछ ही महीनों में मेरे चक्र संतुलित कर दिए, और अब मैं गर्भवती हूँ। काश मैं पहले यहीं आती।" },
      { name: "रेशमा व अनिल", initial: "R", tag: "पुरुष निःसंतानता", text: "सब मेरी पत्नी की ही जाँच करते रहे। यहाँ डॉ. सोनी ने मेरी भी जाँच की और रसायन औषधियों से शुक्राणु की कमी का उपचार किया। हमारा बेटा अब एक वर्ष का है। हम सदा आभारी हैं।" },
      { name: "ऐश्वर्या एम.", initial: "A", tag: "उत्तर बस्ति चिकित्सा", text: "मुझे बताया गया कि IVF ही एकमात्र विकल्प है। डॉ. सोनी ईमानदार और सौम्य रहे — उत्तर बस्ति और सही आहार योजना ने सब बदल दिया। छह महीने की गर्भवती हूँ और बहुत आभारी।" },
    ],
  },
};

function Stars() {
  return <span className="text-amber-400 text-sm">★★★★★</span>;
}

export default function Testimonials() {
  const c = useT(content);
  return (
    <section id="stories" className="bg-gradient-to-b from-white to-plum-50">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-plum-600">
            {c.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-plum-900 sm:text-4xl">
            {c.titleA} <span className="text-gradient-coral">{c.titleB}</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            <Stars />
            <span className="font-bold text-plum-900">4.8</span>
            <span className="text-plum-900/55">{c.ratingNote}</span>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {c.reviews.map((r, i) => (
            <div
              key={r.name}
              className="rounded-2xl border border-plum-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-plum-500/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full font-display text-lg font-bold text-white"
                    style={{ background: colors[i] }}
                  >
                    {r.initial}
                  </span>
                  <div>
                    <p className="font-semibold text-plum-900">{r.name}</p>
                    <Stars />
                  </div>
                </div>
                <span className="rounded-full bg-coral-50 px-2.5 py-1 text-[11px] font-semibold text-coral-700">
                  {r.tag}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-plum-900/70">&ldquo;{r.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
