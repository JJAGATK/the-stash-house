import React from "react";
import type { Metadata } from "next";
import { Nav } from "@/components/navigation/Nav";
import { Footer } from "@/components/navigation/Footer";
import { MenuSection } from "@/components/sections/MenuSection";
import { Marquee } from "@/components/ui/Marquee";
import { RESTAURANT_DATA } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Food & Cocktail Menu | The Stash House Haridwar",
  description:
    "Explore the full menu of The Stash House: artisanal tandoor kebabs, Awadhi biryanis, slow-cooked curries, wood-fired pizzas, and signature smoked cocktails in Pentagon Mall, Haridwar.",
  alternates: {
    canonical: "/menu",
  },
};

export default function MenuPage() {
  const marqueeItems = [
    "Paneer Sufiyana Tikka",
    "Smoked Mutton Galouti",
    "18-Hour Dal Makhani",
    "Awadhi Dum Biryani",
    "Smoked Old Fashioned",
    "Haridwar Highball",
    "Pan-Seared Salmon",
    "Belgian Chocolate Mousse",
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0B] flex flex-col pt-20">
      <Nav />
      <Marquee items={marqueeItems} speedSeconds={28} />
      <div className="flex-grow">
        <MenuSection isStandalonePage={true} />
      </div>
      <Footer />
    </main>
  );
}
