import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Treatments from "@/components/Treatments";
import Panchkarma from "@/components/Panchkarma";
import Doctor from "@/components/Doctor";
import WhyUs from "@/components/WhyUs";
import Comparison from "@/components/Comparison";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import ClosingCta from "@/components/ClosingCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Treatments />
        <Panchkarma />
        <Doctor />
        <WhyUs />
        <Comparison />
        <Testimonials />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
