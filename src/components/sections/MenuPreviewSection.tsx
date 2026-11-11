"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";

interface MenuPreviewSectionProps {
  onOpenBookingModal: () => void;
}

export function MenuPreviewSection({ onOpenBookingModal }: MenuPreviewSectionProps) {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-12 2xl:px-20 bg-[#07090E] overflow-hidden w-full">
      {/* Background ambient glow lights */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Cursive kicker */}
            <p className="font-script text-3xl sm:text-5xl text-[#FFA028] tracking-wide drop-shadow-[0_2px_12px_rgba(255,122,0,0.4)]">
              Taste the mood
            </p>

            {/* Massive Luxury Heading */}
            <h2 className="font-serif-luxury text-5xl sm:text-7xl font-bold text-[#F8FAFC] tracking-tight leading-[1.08]">
              Our Menu
            </h2>

            {/* Editorial Description */}
            <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed max-w-lg font-normal">
              Step inside The Stash House for slow-cooked Lucknowi biryanis, smoky charcoal tandoor kebabs, artisanal wood-fired pizzas, and handcrafted botanical cocktails curated by master mixologists in Haridwar.
            </p>

            {/* Highlights pill tags */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <span className="px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-semibold text-[#38BDF8]">
                Charcoal Tandoori Grills
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-amber-950/50 border border-amber-500/30 text-xs font-semibold text-[#FFA028]">
                Signature Cocktail Vault
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
                Pure Veg & Non-Veg Selections
              </span>
            </div>

            {/* Dual Pill Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenBookingModal}
                className="neon-pill-amber px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest cursor-pointer"
              >
                Book your table
              </button>

              <Link
                href="/menu"
                className="neon-pill-blue px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center gap-2"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Signature Dish with Neon Concentric Circles */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Concentric geometric neon circles */}
            <div className="relative w-[340px] sm:w-[480px] aspect-square flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-spin-slow" />
              <div className="absolute inset-6 rounded-full border border-amber-500/25" />
              <div className="absolute inset-14 rounded-full border border-dashed border-cyan-400/25" />
              <div className="absolute inset-22 rounded-full border border-blue-400/15" />

              {/* Glowing ambient radial light behind dish */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-tr from-amber-600/20 via-blue-600/20 to-transparent blur-2xl" />

              {/* Framed Dish Card */}
              <div className="relative z-10 w-[290px] sm:w-[380px] aspect-[4/5] rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-[#0C101C] group">
                <Image
                  src="/images/luxury/gourmet-signature-dish.jpg"
                  alt="Chef's artisanal roasted gourmet signature dish at The Stash House"
                  fill
                  sizes="(max-width: 768px) 300px, 400px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/20 to-transparent" />

                {/* Dish Caption badge */}
                <div className="absolute bottom-5 inset-x-5 text-center p-3.5 rounded-xl bg-[#090D18]/95 border border-slate-700/80 backdrop-blur-md">
                  <p className="font-serif-luxury text-lg sm:text-xl text-[#FFA028] font-bold tracking-wide">
                    Chef&apos;s Signature Artisanal Grill
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-[#CBD5E1] font-semibold mt-0.5">
                    Pan-Seared Cut with Fresh Rosemary & Citrus
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
