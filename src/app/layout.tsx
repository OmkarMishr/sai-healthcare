import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/components/BookingProvider";

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
  title: "Sai Healthcare — Fertility & IVF Centre, Raipur",
  description:
    "Raipur's trusted fertility & infertility care. Personalised diagnosis, senior specialists, and a natural-first path to parenthood. Book a free consultation today.",
  keywords: [
    "fertility clinic Raipur",
    "IVF centre Raipur",
    "infertility treatment Chhattisgarh",
    "Sai Healthcare",
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
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  );
}
