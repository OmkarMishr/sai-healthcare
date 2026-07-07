"use client";

import { useT } from "./LanguageProvider";

const GOOGLE_REVIEWS_URL = "https://share.google/o0hmOdBEHPv3tk5aX";

const colors = ["#1f9d68", "#2c6b48", "#0f5f3e", "#34ad78", "#157a50", "#4f8f6b"];

const content = {
  en: {
    eyebrow: "Real stories from Raipur",
    titleA: "Loved by",
    titleB: "our patients",
    ratingNote: "· 203 verified Google reviews",
    googleCta: "Read all reviews on Google →",
    reviews: [
      { name: "Angad Tiwari", initial: "A", tag: "Janu Basti · Knee pain", text: "My wife had severe knee joint pain. In the Panchkarma therapy we got Janu Basti done — just 5 days of therapy gave her great relief. Wonderful treatment; everyone should try Ayurveda. Thank you madam and sir." },
      { name: "Asmita Netam", initial: "A", tag: "Shirodhara · Stress", text: "I had been feeling very stressed for 3–4 months. At Shri Sai Panchkarma centre I took 5 sittings of Shirodhara — I felt so much better and recovered completely. I recommend it to everyone." },
      { name: "Amol Jaulkar", initial: "A", tag: "Swarnaprashan · Child immunity", text: "I've been giving my daughter Swarna Prashan for 2 years — the response is excellent. She has become very active and no longer falls ill. Everyone should give their children Swarna Prashan." },
      { name: "Rajesh Mishra", initial: "R", tag: "Panchkarma · 7 years", text: "One of the best Panchkarma Ayurvedic centres in Raipur. I've been taking Panchkarma treatment here for 7 years. It's important to detoxify every year. I highly recommend Shri Sai — the best in Raipur." },
      { name: "Rahul Jaswani", initial: "R", tag: "Leech therapy · Varicose veins", text: "I suffered from varicose veins for 5 years. Allopathic gave no relief, but at Shri Sai I took leech therapy and was completely cured in 5 sittings. Thank you sir and mam." },
      { name: "Rinku Devi", initial: "R", tag: "PCOD · Women's health", text: "I felt very good coming to Shri Sai clinic — the doctor madam is very cooperative. My daughter was diagnosed with PCOD and got relief here. Ayurvedic treatment is safe and effective — everyone should adopt it." },
    ],
  },
  hi: {
    eyebrow: "रायपुर से सच्ची कहानियाँ",
    titleA: "हमारे रोगियों का",
    titleB: "विश्वास",
    ratingNote: "· 203 सत्यापित गूगल समीक्षाएँ",
    googleCta: "गूगल पर सभी समीक्षाएँ पढ़ें →",
    reviews: [
      { name: "अंगद तिवारी", initial: "A", tag: "जानु बस्ति · घुटना दर्द", text: "मेरी पत्नी को घुटने के जोड़ में बहुत दर्द था। पंचकर्म चिकित्सा में जानु बस्ति करवाई — मात्र 5 दिन की थेरेपी में बहुत आराम मिल गया। बहुत बढ़िया इलाज है, सभी को आयुर्वेद अपनाना चाहिए। धन्यवाद मैडम और सर।" },
      { name: "अस्मिता नेताम", initial: "A", tag: "शिरोधारा · तनाव", text: "मैं 3-4 महीने से बहुत तनाव महसूस कर रही थी। श्री साई पंचकर्म सेंटर में शिरोधारा की 5 सिटिंग लीं — बहुत अच्छा लगा और पूरी तरह ठीक हो गई। मैं सभी को यही कहूँगी।" },
      { name: "अमोल जौलकर", initial: "A", tag: "स्वर्णप्राशन · बाल इम्युनिटी", text: "मैं अपनी बेटी को 2 साल से स्वर्ण प्राशन करवा रही हूँ — बहुत अच्छा असर है। मेरी बेटी पहले से बहुत सक्रिय हो गई है और अब बिल्कुल बीमार नहीं होती। सभी को अपने बच्चों को स्वर्ण प्राशन देना चाहिए।" },
      { name: "राजेश मिश्रा", initial: "R", tag: "पंचकर्म · 7 वर्ष", text: "रायपुर के सर्वश्रेष्ठ पंचकर्म आयुर्वेदिक केंद्रों में से एक। मैं 7 वर्षों से यहाँ पंचकर्म उपचार ले रहा हूँ। हर वर्ष शरीर का डिटॉक्स जरूरी है। मैं श्री साई की अत्यधिक अनुशंसा करता हूँ — रायपुर में सर्वश्रेष्ठ।" },
      { name: "राहुल जसवानी", initial: "R", tag: "लीच थेरेपी · वेरिकोज़ वेन्स", text: "मैं 5 साल से वेरिकोज़ वेन्स से परेशान था। एलोपैथिक में कोई लाभ नहीं हुआ, पर श्री साई में जोंक (लीच) थेरेपी ली — 5 सिटिंग में पूरी तरह आराम हो गया। धन्यवाद सर और मैम।" },
      { name: "रिंकू देवी", initial: "R", tag: "PCOD · महिला स्वास्थ्य", text: "श्री साई क्लिनिक आकर बहुत अच्छा लगा — डॉक्टर मैडम बहुत सहयोगी हैं। मेरी बेटी को PCOD था, यहाँ राहत मिली। आयुर्वेदिक उपचार सुरक्षित और प्रभावी है — इसे सभी को अपनाना चाहिए।" },
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
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-plum-600">{c.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-plum-900 sm:text-4xl">
            {c.titleA} <span className="text-gradient-coral">{c.titleB}</span>
          </h2>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
            <Stars />
            <span className="font-bold text-plum-900">5.0</span>
            <span className="text-plum-900/55">{c.ratingNote}</span>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.reviews.map((r, i) => (
            <div
              key={r.name}
              className="flex flex-col rounded-2xl border border-plum-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-plum-500/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full font-display text-lg font-bold text-white"
                    style={{ background: colors[i % colors.length] }}
                  >
                    {r.initial}
                  </span>
                  <div>
                    <p className="font-semibold text-plum-900">{r.name}</p>
                    <Stars />
                  </div>
                </div>
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-label="Google">
                  <path fill="#4285F4" d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.2-4.8 3.2-7.8z" />
                  <path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.6-2.7c-1 .7-2.3 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H2.3v2.8A11 11 0 0 0 12 23z" />
                  <path fill="#FBBC05" d="M6 14.3a6.6 6.6 0 0 1 0-4.2V7.3H2.3a11 11 0 0 0 0 9.9L6 14.3z" />
                  <path fill="#EA4335" d="M12 5.4c1.6 0 3 .5 4.1 1.6l3.1-3.1A11 11 0 0 0 2.3 7.3L6 10.1c.9-2.6 3.2-4.7 6-4.7z" />
                </svg>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-plum-900/70">&ldquo;{r.text}&rdquo;</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-plum-200 bg-white px-6 py-3 text-sm font-bold text-plum-800 shadow-sm transition-colors hover:border-coral-300 hover:text-coral-600"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path fill="#4285F4" d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.2-4.8 3.2-7.8z" />
              <path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.6-2.7c-1 .7-2.3 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H2.3v2.8A11 11 0 0 0 12 23z" />
              <path fill="#FBBC05" d="M6 14.3a6.6 6.6 0 0 1 0-4.2V7.3H2.3a11 11 0 0 0 0 9.9L6 14.3z" />
              <path fill="#EA4335" d="M12 5.4c1.6 0 3 .5 4.1 1.6l3.1-3.1A11 11 0 0 0 2.3 7.3L6 10.1c.9-2.6 3.2-4.7 6-4.7z" />
            </svg>
            {c.googleCta}
          </a>
        </div>
      </div>
    </section>
  );
}
