"use client";

import Image from "next/image";
import { Hospital, BedDouble, Leaf, Stethoscope, MapPin } from "lucide-react";
import { useT } from "./LanguageProvider";

// Files live in /public/hospital (h9 featured first)
const hospitalPhotos = [
  "/hospital/h9.jpeg",
  "/hospital/h2.jpeg",
  "/hospital/h3.jpeg",
  "/hospital/h5.jpeg",
  "/hospital/h6.jpeg",
  "/hospital/h7.jpeg",
  "/hospital/h8.jpeg",
  "/hospital/h10.jpeg",
];

const content = {
  en: {
    eyebrow: "About us",
    titleA: "A dedicated Ayurvedic",
    titleB: "Panchkarma hospital",
    galleryTitle: "Inside our hospital",
    galleryAlt: "Shri Sai Ayurvedic hospital",
    p1: "Shri Sai Ayurvedic Panchkarma & Infertility Centre is a purpose-built Ayurvedic hospital in the heart of Avanti Vihar, Raipur. For over two decades we have combined authentic, classical Panchkarma with a clean, modern and caring hospital environment.",
    p2: "Led by Dr. S.S. Soni and Dr. Varsha Soni, our centre offers dedicated therapy rooms, in-patient stay facilities and an in-house herbal pharmacy — everything a patient needs under one roof. Dr. Soni also serves as HOD at Raigarh Medical College & Hospital of Ayurveda, and our doctors mentor at Ayurvedic colleges in Bhopal and Aligarh.",
    address: "158, Basant Corner, Avanti Vihar, Raipur, Chhattisgarh",
    facilities: [
      { icon: Hospital, title: "Dedicated Panchkarma Rooms", body: "Separate, hygienic therapy rooms for Vamana, Virechana, Basti, Shirodhara and more." },
      { icon: BedDouble, title: "In-patient Stay Facility", body: "Comfortable stay for patients undergoing multi-day Panchkarma treatment." },
      { icon: Leaf, title: "In-house Herbal Pharmacy", body: "Authentic, freshly prepared Ayurvedic medicines dispensed on site." },
      { icon: Stethoscope, title: "Senior Ayurvedic Doctors", body: "Personally treated by experienced BAMS / MD / MS specialists at every visit." },
    ],
  },
  hi: {
    eyebrow: "हमारे बारे में",
    titleA: "एक समर्पित आयुर्वेदिक",
    titleB: "पंचकर्म अस्पताल",
    galleryTitle: "हमारे अस्पताल की झलक",
    galleryAlt: "श्री साई आयुर्वेदिक अस्पताल",
    p1: "श्री साई आयुर्वेदिक पंचकर्म एवं निःसंतानता केंद्र, अवंती विहार, रायपुर के हृदय में स्थित एक विशेष रूप से निर्मित आयुर्वेदिक अस्पताल है। दो दशकों से अधिक समय से हम प्रामाणिक शास्त्रीय पंचकर्म को स्वच्छ, आधुनिक और देखभालपूर्ण अस्पताल वातावरण के साथ जोड़ते आ रहे हैं।",
    p2: "डॉ. एस.एस. सोनी एवं डॉ. वर्षा सोनी के नेतृत्व में, हमारे केंद्र में समर्पित चिकित्सा कक्ष, भर्ती (इन-पेशेंट) सुविधा और अपनी हर्बल फार्मेसी है — एक ही छत के नीचे रोगी की हर आवश्यकता। डॉ. सोनी रायगढ़ मेडिकल कॉलेज एवं आयुर्वेद अस्पताल में विभागाध्यक्ष भी हैं, तथा हमारे चिकित्सक भोपाल व अलीगढ़ के आयुर्वेदिक कॉलेजों में मार्गदर्शन देते हैं।",
    address: "158, बसंत कॉर्नर, अवंती विहार, रायपुर, छत्तीसगढ़",
    facilities: [
      { icon: Hospital, title: "समर्पित पंचकर्म कक्ष", body: "वमन, विरेचन, बस्ति, शिरोधारा आदि के लिए अलग, स्वच्छ चिकित्सा कक्ष।" },
      { icon: BedDouble, title: "भर्ती (इन-पेशेंट) सुविधा", body: "कई दिनों के पंचकर्म उपचार हेतु रोगियों के लिए आरामदायक ठहरने की व्यवस्था।" },
      { icon: Leaf, title: "अपनी हर्बल फार्मेसी", body: "प्रामाणिक, ताज़ा तैयार आयुर्वेदिक औषधियाँ यहीं उपलब्ध।" },
      { icon: Stethoscope, title: "वरिष्ठ आयुर्वेदिक चिकित्सक", body: "हर बार अनुभवी BAMS / MD / MS विशेषज्ञों द्वारा व्यक्तिगत उपचार।" },
    ],
  },
};

export default function About() {
  const c = useT(content);
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Photo */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-coral-200/50 to-plum-200/40 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] border-4 border-white bg-plum-100 shadow-2xl shadow-plum-900/20">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/clinic_front_view.jpeg"
                  alt="Shri Sai Ayurvedic Panchkarma & Infertility Centre building"
                  fill
                  sizes="(max-width: 1024px) 90vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum-900/40 to-transparent" />
                <p className="absolute inset-x-4 bottom-4 flex items-center gap-1.5 text-sm font-semibold text-white">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {c.address}
                </p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-500">{c.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-plum-900 sm:text-4xl">
              {c.titleA} <span className="text-gradient-coral">{c.titleB}</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-plum-900/70">{c.p1}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-plum-900/70">{c.p2}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {c.facilities.map((f) => (
                <div key={f.title} className="rounded-2xl border border-plum-100 bg-cream-50 p-4">
                  <span className="inline-flex text-coral-600">
                    <f.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-2 font-display text-sm font-bold text-plum-900">{f.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-plum-900/65">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hospital photos */}
        <div className="mt-14 md:mt-20">
          <h3 className="text-center font-display text-2xl font-extrabold tracking-tight text-plum-900 sm:text-3xl">
            {c.galleryTitle}
          </h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hospitalPhotos.map((src) => (
              <div
                key={src}
                className="group relative overflow-hidden rounded-2xl border border-plum-100 bg-plum-100 shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={src}
                    alt={c.galleryAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
