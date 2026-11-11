import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07090E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "The Stash House | Gastro Pub & Fine Dining in Haridwar",
  description:
    "Discover Haridwar's premier gastropub & fine dining at The Pentagon Mall. Hand-shaken cocktails, charcoal tandoori grills, vibrant neon speakeasy ambience, and private gatherings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark h-full antialiased scroll-smooth ${plusJakartaSans.variable} ${cormorantGaramond.variable}`}
    >
      <body className="min-h-full flex flex-col bg-[#07090E] text-[#F8FAFC] selection:bg-amber-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
