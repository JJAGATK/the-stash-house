"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Maximize2, X, Flame, Wine, ArrowRight, ShieldCheck, GlassWater } from "lucide-react";

interface TiledCocktail {
  id: string;
  name: string;
  category: string;
  abv: string;
  flavor: string;
  glass: string;
  image: string;
  shortDesc: string;
  featured?: boolean;
}

export function BarSection() {
  const [selectedCocktail, setSelectedCocktail] = useState<TiledCocktail | null>(null);

  const cocktails: TiledCocktail[] = [
    {
      id: "stash-old-fashioned",
      name: "The Stash Smoked Old Fashioned",
      category: "Bourbon Reserve",
      abv: "42% ABV",
      flavor: "Applewood Smoke • Charred Oak • Flamed Orange",
      glass: "Heavy Crystal Rocks Glass",
      image: "/images/luxury/cocktail-smoked-old-fashioned.jpg",
      shortDesc: "Aged Kentucky bourbon whiskey slow-infused in applewood smoke with blood orange bitters.",
      featured: true,
    },
    {
      id: "haridwar-highball",
      name: "The Haridwar Highball",
      category: "Botanical Gin",
      abv: "38% ABV",
      flavor: "Crisp Botanical • Elderflower • Pink Pepper",
      glass: "Faceted Highball Crystal",
      image: "/images/luxury/cocktail-gin-highball.jpg",
      shortDesc: "Artisanal Indian craft gin stirred with elderflower tonic and compressed cucumber ribbon.",
    },
    {
      id: "himalayan-bramble",
      name: "Himalayan Blackberry Bramble",
      category: "Forest Berry Liqueur",
      abv: "35% ABV",
      flavor: "Wild Berry Velvet • Meyer Lemon • Crushed Ice",
      glass: "Double Old Fashioned Tumbler",
      image: "/images/luxury/cocktail-berry-bramble.jpg",
      shortDesc: "London dry gin crowned with a rich drizzle of Crème de Mûre wild blackberry coulis.",
    },
    {
      id: "spiced-jamun-cooler",
      name: "Spiced Wild Jamun Elixir",
      category: "Zero-Proof Mocktail",
      abv: "0% ABV",
      flavor: "Tart Java Plum • Roasted Cumin • Rock Salt Fizz",
      glass: "Frosted Fluted Highball",
      image: "/images/luxury/cocktail-spiced-elixir.jpg",
      shortDesc: "Cold-pressed black jamun nectar muddled with toasted cumin and sparkling club soda.",
    },
  ];

  return (
    <section id="bar" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 2xl:px-20 bg-[#05070B] border-t border-slate-900 relative overflow-hidden w-full">
      {/* Background radial glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto relative z-10 w-full">
        {/* Apple-grade Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2.5">
          <p className="font-script text-2xl sm:text-4xl text-[#FFA028] tracking-wide drop-shadow-[0_2px_10px_rgba(255,160,40,0.4)]">
            The Craft Mixology Vault
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-[#F8FAFC] font-bold tracking-tight">
            Signature Pours & Libations
          </h2>
          <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#94A3B8] font-semibold">
            Hand-shaken botanicals, smoldering woods, and hand-carved ice in Haridwar
          </p>
        </div>

        {/* 4K Tiled Apple Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Card 1: Featured Old Fashioned (Large Tile) */}
          <div
            onClick={() => setSelectedCocktail(cocktails[0])}
            className="lg:col-span-7 group relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/50 bg-[#090D18] shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer transition-all duration-500 hover:scale-[1.01] flex flex-col justify-between min-h-[360px] sm:min-h-[440px]"
          >
            {/* Background 4K Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={cocktails[0].image}
                alt={cocktails[0].name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center group-hover:scale-106 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/35 to-black/20" />
            </div>

            {/* Top Badges */}
            <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-full bg-[#05070B]/85 border border-amber-500/40 text-xs font-bold text-[#FFA028] backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                <Flame className="w-3.5 h-3.5" /> House Signature
              </span>
              <span className="px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-bold text-[#38BDF8] backdrop-blur-md">
                {cocktails[0].abv}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 p-5 sm:p-8 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#38BDF8] font-bold block">
                {cocktails[0].category}
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white tracking-tight group-hover:text-[#FFA028] transition-colors">
                {cocktails[0].name}
              </h3>
              <p className="text-xs sm:text-sm text-[#CBD5E1] line-clamp-2 max-w-xl">
                {cocktails[0].shortDesc}
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-[#FFA028] font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> {cocktails[0].flavor}
                </span>
                <span className="text-xs uppercase font-bold tracking-wider text-[#38BDF8] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Pour <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Haridwar Highball */}
          <div
            onClick={() => setSelectedCocktail(cocktails[1])}
            className="lg:col-span-5 group relative rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-400/50 bg-[#090D18] shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer transition-all duration-500 hover:scale-[1.01] flex flex-col justify-between min-h-[360px] sm:min-h-[440px]"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={cocktails[1].image}
                alt={cocktails[1].name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-106 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/35 to-black/20" />
            </div>

            <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-full bg-[#05070B]/85 border border-cyan-400/40 text-xs font-bold text-[#38BDF8] backdrop-blur-md shadow-lg">
                Botanical Tonic
              </span>
              <span className="px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-bold text-white backdrop-blur-md">
                {cocktails[1].abv}
              </span>
            </div>

            <div className="relative z-10 p-5 sm:p-8 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#FFA028] font-bold block">
                {cocktails[1].category}
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-[#38BDF8] transition-colors">
                {cocktails[1].name}
              </h3>
              <p className="text-xs sm:text-sm text-[#CBD5E1] line-clamp-2">
                {cocktails[1].shortDesc}
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-[#CBD5E1] font-medium">
                  {cocktails[1].flavor}
                </span>
                <span className="text-xs uppercase font-bold tracking-wider text-[#38BDF8] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Pour <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Himalayan Bramble */}
          <div
            onClick={() => setSelectedCocktail(cocktails[2])}
            className="lg:col-span-6 group relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/50 bg-[#090D18] shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer transition-all duration-500 hover:scale-[1.01] flex flex-col justify-between min-h-[320px] sm:min-h-[380px]"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={cocktails[2].image}
                alt={cocktails[2].name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-106 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/35 to-black/20" />
            </div>

            <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-full bg-[#05070B]/85 border border-purple-500/40 text-xs font-bold text-purple-300 backdrop-blur-md shadow-lg">
                Wild Blackberry
              </span>
              <span className="px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-bold text-white backdrop-blur-md">
                {cocktails[2].abv}
              </span>
            </div>

            <div className="relative z-10 p-5 sm:p-8 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#FFA028] font-bold block">
                {cocktails[2].category}
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-[#FFA028] transition-colors">
                {cocktails[2].name}
              </h3>
              <p className="text-xs sm:text-sm text-[#CBD5E1] line-clamp-2">
                {cocktails[2].shortDesc}
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-[#CBD5E1] font-medium">
                  {cocktails[2].flavor}
                </span>
                <span className="text-xs uppercase font-bold tracking-wider text-[#38BDF8] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Pour <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Spiced Wild Jamun Elixir */}
          <div
            onClick={() => setSelectedCocktail(cocktails[3])}
            className="lg:col-span-6 group relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/50 bg-[#090D18] shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer transition-all duration-500 hover:scale-[1.01] flex flex-col justify-between min-h-[320px] sm:min-h-[380px]"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={cocktails[3].image}
                alt={cocktails[3].name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-106 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/35 to-black/20" />
            </div>

            <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-full bg-[#05070B]/85 border border-emerald-500/40 text-xs font-bold text-emerald-400 backdrop-blur-md shadow-lg">
                Zero-Proof Elixir
              </span>
              <span className="px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-bold text-white backdrop-blur-md">
                Pure Vegan
              </span>
            </div>

            <div className="relative z-10 p-5 sm:p-8 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#FFA028] font-bold block">
                {cocktails[3].category}
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-[#FFA028] transition-colors">
                {cocktails[3].name}
              </h3>
              <p className="text-xs sm:text-sm text-[#CBD5E1] line-clamp-2">
                {cocktails[3].shortDesc}
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-[#CBD5E1] font-medium">
                  {cocktails[3].flavor}
                </span>
                <span className="text-xs uppercase font-bold tracking-wider text-[#38BDF8] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Pour <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Menu Action Bar */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#05070B] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,160,40,0.35)] transition-all cursor-pointer"
          >
            <span>Explore Full Spirits & Wine Menu</span>
            <ArrowRight className="w-4 h-4 text-[#05070B]" />
          </Link>
          <span className="text-xs text-[#94A3B8]">
            Serving daily 11:00 AM to 11:30 PM • Haridwar
          </span>
        </div>
      </div>

      {/* Clean Apple-style 4K Lightbox Modal */}
      {selectedCocktail && (
        <div
          onClick={() => setSelectedCocktail(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-[#0A0E1A] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCocktail(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 border border-white/20 text-white hover:text-[#FFA028] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 4K Image Banner */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
              <Image
                src={selectedCocktail.image}
                alt={selectedCocktail.name}
                fill
                priority
                sizes="700px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-black/30" />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-black/80 border border-amber-500/40 text-xs font-bold text-[#FFA028] backdrop-blur-md">
                  {selectedCocktail.abv}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#38BDF8] font-bold block mb-1">
                  {selectedCocktail.category}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white tracking-tight">
                  {selectedCocktail.name}
                </h3>
              </div>

              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                {selectedCocktail.shortDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                <div className="p-3 rounded-xl bg-[#0F1527] border border-white/5 flex items-center gap-2.5 text-xs text-[#CBD5E1]">
                  <GlassWater className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Glassware: <strong>{selectedCocktail.glass}</strong></span>
                </div>
                <div className="p-3 rounded-xl bg-[#0F1527] border border-white/5 flex items-center gap-2.5 text-xs text-[#CBD5E1]">
                  <Sparkles className="w-4 h-4 text-[#FFA028] shrink-0" />
                  <span>Notes: <strong>{selectedCocktail.flavor}</strong></span>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <span className="text-xs text-[#94A3B8] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Legal drinking age applies
                </span>
                <Link
                  href="/reserve"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#05070B] font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  Reserve a Bar Table →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
