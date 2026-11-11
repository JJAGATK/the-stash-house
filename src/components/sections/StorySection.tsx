import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Sparkles, GlassWater, Users } from "lucide-react";

export function StorySection() {
  return (
    <section id="story" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 2xl:px-20 bg-[#07090E] relative overflow-hidden w-full">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Single Pristine Luxury Dining Room Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Decorative Subtle Glowing Background Frame */}
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-blue-600/20 via-amber-500/20 to-transparent blur-xl opacity-70 pointer-events-none" />

              {/* Main Photo (Pristine High-Definition Venue Dining Ambience) */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-slate-900 group">
                <Image
                  src="/images/luxury/hero-dining-chandeliers.jpg"
                  alt="Atmospheric dining room with warm chandeliers at The Stash House Haridwar"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090E]/90 via-[#07090E]/20 to-transparent" />

                {/* Bottom Location Pill */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#07090E]/90 border border-blue-400/40 text-xs uppercase font-bold tracking-wider text-[#38BDF8] backdrop-blur-md shadow-lg">
                    <MapPin className="w-3.5 h-3.5 text-[#FFA028]" />
                    First Floor, The Pentagon Mall, Haridwar
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-[11px] text-[#CBD5E1]">
                    <Sparkles className="w-3 h-3 text-[#FFA028]" />
                    Speakeasy Ambiance
                  </span>
                </div>
              </div>

              {/* Floating Google Rating Badge */}
              <div className="absolute -top-5 -left-3 sm:-left-5 p-4 rounded-2xl bg-[#0C111E]/95 border border-amber-500/40 shadow-[0_12px_32px_rgba(255,160,40,0.25)] backdrop-blur-md">
                <div className="flex items-center gap-1.5 text-[#FFA028]">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-2xl font-serif-luxury font-bold text-white tracking-tight">4.7</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#CBD5E1] font-semibold mt-0.5 block">
                  1,785+ Google Reviews
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Distinction */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <p className="font-script text-3xl sm:text-5xl text-[#FFA028] tracking-wide drop-shadow-[0_2px_10px_rgba(255,160,40,0.4)]">
              The Sanctuary Story
            </p>

            <h2 className="text-4xl sm:text-6xl font-serif-luxury font-bold text-[#F8FAFC] leading-tight">
              A Culinary Sanctuary in Haridwar
            </h2>

            <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed">
              Tucked away on the First Floor of The Pentagon Mall in BHEL Township, <strong className="text-white">The Stash House</strong> was created to redefine dining in Uttarakhand: a secret speakeasy sanctuary that harmonizes the warmth of rustic tavern culture with theatrical craft mixology and culinary excellence.
            </p>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Whether you are savoring our slow-simmered Awadhi tandoori kebabs, sharing a stone-baked artisan flatbread, or unwinding with an applewood-smoked Old Fashioned under ambient golden light, every visit is curated to feel like discovering a hidden treasure.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="p-4 rounded-2xl bg-[#0C111E] border border-blue-900/40 hover:border-blue-500/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-[#38BDF8] mb-2.5">
                  <GlassWater className="w-4 h-4" />
                </div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#38BDF8] block mb-1">
                  Full Mixology Bar
                </span>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Hand-shaken botanical cocktails, aged single malts, and imported draught beers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0C111E] border border-amber-900/40 hover:border-amber-500/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-[#FFA028] mb-2.5">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#FFA028] block mb-1">
                  Private Gatherings
                </span>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Intimate banqueting and booth suites accommodating parties from 10 to 60 guests.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#visit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#05070B] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,160,40,0.35)] transition-all"
              >
                Plan Your Visit
              </a>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0C111E] border border-slate-700 hover:border-amber-500/60 text-[#CBD5E1] hover:text-white font-medium text-xs uppercase tracking-wider transition-all"
              >
                View Full Menu →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
