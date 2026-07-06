"use client";

import Image from "next/image";
import { useBooking } from "./BookingProvider";
import { useLanguage, useT } from "./LanguageProvider";

type Therapy = {
  icon: string;
  img?: string;
  highlight?: boolean;
  en: { name: string; sub: string; detail: string };
  hi: { name: string; sub: string; detail: string };
};

const therapies: Therapy[] = [
  {
    icon: "🌀",
    img: "/services/vaman.jpg",
    en: { name: "Vamana", sub: "Medicated Emesis", detail: "Therapeutic cleansing that clears excess Kapha — effective for asthma, chronic cough, cold, skin disorders, diabetes and high cholesterol." },
    hi: { name: "वमन", sub: "मेडिकेटेड वमन", detail: "अतिरिक्त कफ को निकालने वाली शुद्धि चिकित्सा — अस्थमा, पुरानी खांसी, सर्दी, त्वचा रोग, शुगर व कोलेस्ट्रॉल में लाभकारी।" },
  },
  {
    icon: "🌿",
    img: "/services/virechan.jpg",
    en: { name: "Virechana", sub: "Medicated Purgation", detail: "Herbal purgation that detoxifies Pitta — relieves acidity, gas, jaundice, ascites and stubborn skin diseases." },
    hi: { name: "विरेचन", sub: "मेडिकेटेड विरेचन", detail: "पित्त शोधक विरेचन — एसिडिटी, गैस, पीलिया, जलोदर व जिद्दी त्वचा रोगों में राहत।" },
  },
  {
    icon: "💧",
    img: "/services/vast.jpg",
    en: { name: "Basti", sub: "Medicated Enema", detail: "The prime therapy for Vata disorders — powerful for back pain, slip disc, arthritis, sciatica and piles." },
    hi: { name: "बस्ति", sub: "मेडिकेटेड एनिमा", detail: "वात रोगों की प्रमुख चिकित्सा — कमर दर्द, स्लिप डिस्क, संधिवात, साइटिका व पाइल्स में प्रभावी।" },
  },
  {
    icon: "👃",
    img: "/services/nasya.jpg",
    en: { name: "Nasya", sub: "Medicated Nasal Drops", detail: "Medicated drops through the nose for migraine, chronic cold, hair fall and ear-nose-throat disorders." },
    hi: { name: "नस्य", sub: "मेडिकेटेड नेज़ल ड्रॉप", detail: "नाक द्वारा औषधि — माइग्रेन, पुरानी सर्दी, बाल झड़ना व कान-नाक-गला रोगों में लाभकारी।" },
  },
  {
    icon: "🩸",
    img: "/services/blood-leting.jpg",
    en: { name: "Raktamokshana", sub: "Blood-letting", detail: "Purification of vitiated blood — for eczema, psoriasis, pimples, varicose veins and herpes." },
    hi: { name: "रक्तमोक्षण", sub: "रक्त शुद्धि", detail: "दूषित रक्त की शुद्धि — एग्ज़िमा, सोरायसिस, पिंपल, वेरिकोज़ वेन व हर्पीस में लाभकारी।" },
  },
  {
    icon: "🫗",
    img: "/services/shirodhara.jpg",
    en: { name: "Shirodhara", sub: "Oil-stream Therapy", detail: "A warm stream of medicated oil over the forehead — calms stress, insomnia, anxiety, depression and migraine." },
    hi: { name: "शिरोधारा", sub: "तैल धारा चिकित्सा", detail: "मस्तक पर औषधीय तैल धारा — तनाव, अनिद्रा, चिंता, अवसाद व माइग्रेन को शांत करती है।" },
  },
  {
    icon: "🦵",
    img: "/services/janu-vasti.jpg",
    en: { name: "Janu Basti", sub: "Knee Therapy", detail: "Warm medicated oil pooled over the knee — relieves osteoarthritis, joint pain, swelling and stiffness." },
    hi: { name: "जानु बस्ति", sub: "घुटना चिकित्सा", detail: "घुटने पर औषधीय तैल — ऑस्टियोआर्थराइटिस, जोड़ों के दर्द, सूजन व अकड़न में राहत।" },
  },
  {
    icon: "💆",
    img: "/services/samvedan.jpg",
    en: { name: "Abhyanga & Swedana", sub: "Massage & Steam", detail: "Full-body herbal oil massage with herbal steam — eases obesity, fatigue, stiffness and body swelling." },
    hi: { name: "अभ्यंग व स्वेदन", sub: "मालिश व स्वेदन", detail: "पूर्ण शरीर औषधीय तैल मालिश व स्वेदन — मोटापा, थकान, जकड़न व शरीर की सूजन में लाभकारी।" },
  },
  {
    icon: "🌸",
    img: "/services/uttar-basti.jpg",
    highlight: true,
    en: { name: "Uttar Basti", sub: "Fertility Specialty", detail: "Our specialised uterine & reproductive therapy — highly effective for infertility, tube block and PCOD." },
    hi: { name: "उत्तर बस्ति", sub: "प्रजनन विशेषज्ञता", detail: "हमारी विशेष गर्भाशय एवं प्रजनन चिकित्सा — निःसंतानता, ट्यूब ब्लॉक व PCOD में अत्यंत प्रभावी।" },
  },
  {
    icon: "👶",
    img: "/services/swarnaprashan.jpg",
    en: { name: "Swarnaprashan", sub: "Child Immunity", detail: "A gold-based Ayurvedic tonic for children — boosts immunity, memory, digestion and healthy growth." },
    hi: { name: "स्वर्णप्राशन", sub: "बाल इम्युनिटी", detail: "बच्चों के लिए स्वर्ण आधारित आयुर्वेदिक टॉनिक — रोग प्रतिरोधक क्षमता, स्मृति व विकास बढ़ाए।" },
  },
  {
    icon: "💇",
    img: "/services/hair-spa.jpg",
    en: { name: "Ayurvedic Hair Spa", sub: "Hair Care", detail: "Herbal scalp and hair therapy that nourishes roots and controls hair fall naturally." },
    hi: { name: "आयुर्वेदिक हेयर स्पा", sub: "बाल देखभाल", detail: "हर्बल स्कैल्प व बाल चिकित्सा — जड़ों को पोषण व हेयर फॉल में प्राकृतिक लाभ।" },
  },
  {
    icon: "✨",
    img: "/services/facial.jpg",
    en: { name: "Ayurvedic Facial", sub: "Natural Glow", detail: "A natural herbal facial using Ayurvedic ingredients for radiant, healthy and clear skin." },
    hi: { name: "आयुर्वेदिक फेशियल", sub: "प्राकृतिक निखार", detail: "आयुर्वेदिक सामग्री से प्राकृतिक हर्बल फेशियल — दमकती, स्वस्थ व निखरी त्वचा के लिए।" },
  },
];

const content = {
  en: {
    eyebrow: "Ayurveda in a modern way",
    titleA: "Our Panchkarma",
    titleB: "Therapies",
    sub: "Successful treatment of a wide range of conditions through authentic Ayurvedic Panchkarma — each therapy chosen for your unique needs.",
    cta: "Book a therapy consultation →",
    specialty: "★ Specialty",
  },
  hi: {
    eyebrow: "आधुनिक ढंग से आयुर्वेद",
    titleA: "हमारी पंचकर्म",
    titleB: "चिकित्साएँ",
    sub: "आयुर्वेदिक पंचकर्म पद्धति द्वारा अनेक बीमारियों का सफल उपचार — हर चिकित्सा आपकी आवश्यकता के अनुसार चुनी जाती है।",
    cta: "चिकित्सा परामर्श बुक करें →",
    specialty: "★ विशेषज्ञता",
  },
};

export default function Panchkarma() {
  const { open } = useBooking();
  const { lang } = useLanguage();
  const c = useT(content);
  return (
    <section id="therapies" className="bg-gradient-to-b from-cream-50 to-white">
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {therapies.map((th) => {
            const t = th[lang];
            return (
              <div
                key={t.name}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
                  th.highlight
                    ? "border-coral-300 bg-coral-50 ring-1 ring-coral-300 hover:shadow-coral-500/15"
                    : "border-plum-100 bg-white hover:border-coral-200 hover:shadow-plum-500/5"
                }`}
              >
                {/* photo banner */}
                <div className="relative h-44 w-full overflow-hidden bg-plum-100">
                  {th.img && (
                    <Image
                      src={th.img}
                      alt={t.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-900/25 to-transparent" />
                  {th.highlight && (
                    <span className="absolute right-3 top-3 rounded-full bg-coral-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                      {c.specialty}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold text-plum-900">{t.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wide text-coral-600">
                    {t.sub}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-plum-900/65">{t.detail}</p>
                </div>
              </div>
            );
          })}
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
