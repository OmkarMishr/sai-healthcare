import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/components/BookingProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shri Sai Ayurveda — Panchkarma & Infertility Clinic, Raipur",
  description:
    "Raipur's trusted Ayurvedic Panchkarma & infertility clinic led by Dr. S.S. Soni (BAMS, MD, Ph.D.). Natural, root-cause treatment for male & female infertility — no IVF. Book a consultation today.",
  keywords: [
    "Ayurvedic infertility treatment Raipur",
    "Panchkarma clinic Raipur",
    "Dr. S.S. Soni",
    "Shri Sai Ayurveda",
    "natural infertility treatment Chhattisgarh",
  ],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#10241b]">
        <LanguageProvider>
          <BookingProvider>{children}</BookingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
