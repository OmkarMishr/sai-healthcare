"use client";

import Image from "next/image";
import { Medal } from "lucide-react";
import { useBooking } from "./BookingProvider";
import { useLanguage } from "./LanguageProvider";

type DocContent = {
  eyebrow: string;
  name: string;
  creds: string;
  role: string;
  p1: string;
  p2: string;
  facts: { k: string; v: string }[];
  cta: string;
  badge: string;
};

type Doctor = { img: string; en: DocContent; hi: DocContent };

const doctors: Doctor[] = [
  {
    img: "/dr-soni.jpg",
    en: {
      eyebrow: "Meet your Ayurvedic fertility expert",
      name: "Dr. S.S. Soni",
      creds: "BAMS · MD · PGDHHM · Ph.D.",
      role: "Panchkarma & Infertility Specialist",
      p1: "Dr. S.S. Soni is a distinguished Ayurvedic practitioner with 20 years of experience, specialising in Panchkarma and the natural treatment of infertility. A proud alumnus of Pt. Shiv Shakti Lal Sharma Ayurvedic Medical College, Ratlam (Vikram University, Ujjain), he is dedicated to holistic healing through authentic Ayurveda.",
      p2: "He leads Shri Sai Ayurvedic Panchkarma & Infertility Clinic in Avanti Vihar, Raipur, and serves as HOD at Raigarh Medical College & Hospital of Ayurveda. His dedication to community health earned him recognition from the former Chief Minister of Chhattisgarh, Shri Bhupesh Baghel.",
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
      p2: "वे अवंती विहार, रायपुर स्थित श्री साई आयुर्वेदिक पंचकर्म एवं निःसंतानता क्लिनिक का नेतृत्व करते हैं तथा रायगढ़ मेडिकल कॉलेज एवं आयुर्वेद अस्पताल में विभागाध्यक्ष हैं। सामुदायिक स्वास्थ्य के प्रति उनके समर्पण हेतु छत्तीसगढ़ के पूर्व मुख्यमंत्री श्री भूपेश बघेल द्वारा सम्मानित।",
      facts: [
        { k: "20+ वर्ष", v: "का नैदानिक अनुभव" },
        { k: "पंचकर्म", v: "एवं निःसंतानता विशेषज्ञ" },
        { k: "Ph.D.", v: "आयुर्वेद में" },
        { k: "शासन-सम्मानित", v: "नि:शुल्क स्वास्थ्य शिविर" },
      ],
      cta: "डॉ. सोनी से परामर्श करें",
      badge: "पूर्व मुख्यमंत्री भूपेश बघेल द्वारा सम्मानित",
    },
  },
  {
    img: "/dr-varsha.jpg",
    en: {
      eyebrow: "Women's health & infertility care",
      name: "Dr. Varsha Soni",
      creds: "BAMS · MS · CPC",
      role: "Infertility, Gynaecology & Panchkarma Specialist",
      p1: "Dr. Varsha Soni is an accomplished Ayurvedic physician and surgeon with 17 years of experience, specialising in infertility, gynaecological disorders and Panchkarma therapies. She is an alumna of Veena Vadini Ayurvedic College & Hospital, Bhopal (Madhya Pradesh).",
      p2: "She co-leads Shri Sai Ayurvedic Panchkarma & Infertility Clinic in Raipur and contributes to Ayurvedic colleges in Bhopal and Aligarh. She was nominated for the Nayika Award by Dainik Bhaskar and honoured by former CM Shri Bhupesh Baghel for organising free health camps.",
      facts: [
        { k: "17+ years", v: "of clinical experience" },
        { k: "Gynaecology", v: "& infertility specialist" },
        { k: "BAMS, MS", v: "Ayurvedic surgeon" },
        { k: "Nayika Award", v: "nominee (Dainik Bhaskar)" },
      ],
      cta: "Consult Dr. Varsha",
      badge: "Nayika Award Nominee · Dainik Bhaskar",
    },
    hi: {
      eyebrow: "महिला स्वास्थ्य एवं निःसंतानता देखभाल",
      name: "डॉ. वर्षा सोनी",
      creds: "BAMS · MS · CPC",
      role: "निःसंतानता, स्त्री रोग एवं पंचकर्म विशेषज्ञ",
      p1: "डॉ. वर्षा सोनी 17 वर्षों के अनुभव वाली कुशल आयुर्वेदिक चिकित्सक एवं शल्य विशेषज्ञ हैं, जो निःसंतानता, स्त्री रोग एवं पंचकर्म चिकित्सा में विशेषज्ञ हैं। वे वीणा वादिनी आयुर्वेदिक कॉलेज एवं अस्पताल, भोपाल (मध्य प्रदेश) की स्नातक हैं।",
      p2: "वे रायपुर स्थित श्री साई आयुर्वेदिक पंचकर्म एवं निःसंतानता क्लिनिक का सह-नेतृत्व करती हैं तथा भोपाल व अलीगढ़ के आयुर्वेदिक कॉलेजों में योगदान देती हैं। उन्हें दैनिक भास्कर द्वारा नायिका पुरस्कार हेतु नामांकित किया गया तथा नि:शुल्क स्वास्थ्य शिविरों के लिए पूर्व मुख्यमंत्री श्री भूपेश बघेल द्वारा सम्मानित किया गया।",
      facts: [
        { k: "17+ वर्ष", v: "का नैदानिक अनुभव" },
        { k: "स्त्री रोग", v: "एवं निःसंतानता विशेषज्ञ" },
        { k: "BAMS, MS", v: "आयुर्वेदिक शल्य चिकित्सक" },
        { k: "नायिका पुरस्कार", v: "नामांकित (दैनिक भास्कर)" },
      ],
      cta: "डॉ. वर्षा से परामर्श करें",
      badge: "नायिका पुरस्कार नामांकित · दैनिक भास्कर",
    },
  },
];

function DoctorRow({ doc, reverse }: { doc: Doctor; reverse: boolean }) {
  const { open } = useBooking();
  const { lang } = useLanguage();
  const c = doc[lang];

  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      {/* Photo */}
      <div className={`relative mx-auto w-full max-w-md ${reverse ? "md:order-2" : ""}`}>
        <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-coral-200/50 to-plum-200/50 blur-2xl" />
        <div className="overflow-hidden rounded-[2rem] border-4 border-white bg-plum-100 shadow-2xl shadow-plum-900/20">
          <Image
            src={doc.img}
            alt={c.name}
            width={900}
            height={840}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute -bottom-4 left-1/2 w-[92%] -translate-x-1/2 rounded-2xl border border-coral-100 bg-white px-4 py-2.5 shadow-xl">
          <p className="flex items-center justify-center gap-1.5 text-xs font-semibold text-plum-900">
            <Medal className="h-4 w-4 shrink-0 text-coral-600" />
            {c.badge}
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className={reverse ? "md:order-1" : ""}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-500">{c.eyebrow}</p>
        <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-plum-900 sm:text-4xl">
          {c.name}
        </h3>
        <p className="mt-1 font-semibold text-coral-600">{c.creds}</p>
        <p className="text-sm font-medium text-plum-900/60">{c.role}</p>

        <p className="mt-5 text-[15px] leading-relaxed text-plum-900/70">{c.p1}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-plum-900/70">{c.p2}</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {c.facts.map((f) => (
            <div key={f.k} className="rounded-xl border border-plum-100 bg-white px-4 py-3">
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
  );
}

export default function Doctor() {
  return (
    <section id="doctor" className="bg-gradient-to-b from-white to-plum-50">
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 md:space-y-24 md:py-24">
        {doctors.map((doc, i) => (
          <DoctorRow key={doc.img} doc={doc} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
