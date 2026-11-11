"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Utensils, Wine, Users, ArrowRight, Sparkles } from "lucide-react";

export function ExperienceSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const experiences = [
    {
      title: "Dine",
      kicker: "Charcoal & Fire",
      badge: "Culinary Excellence",
      desc: "Smoldering clay tandoors, melt-in-mouth Galouti kebabs, slow-simmered Awadhi handi biryanis, and artisanal stone-baked pizzas.",
      image: "/images/luxury/tandoori-grilled-kebabs.jpg",
      icon: <Utensils className="w-5 h-5 text-[#FFA028]" />,
      actionText: "Explore Full Menu",
      actionHref: "/menu",
      highlights: ["Smoky Tandoor Kebabs", "Dum Awadhi Biryani", "Wood-Fired Pizza", "Pure Veg Specialties"],
    },
    {
      title: "Drink",
      kicker: "The Bar Vault",
      badge: "Craft Mixology",
      desc: "An illuminated backlit liquor display featuring imported spirits, barrel-smoked Old Fashioneds, and handcrafted botanical mountain highballs.",
      image: "/images/luxury/bar-shelves-ambience.jpg",
      icon: <Wine className="w-5 h-5 text-[#38BDF8]" />,
      actionText: "Discover Mixology",
      actionHref: "/#bar",
      highlights: ["Smoked Old Fashioned", "Craft Gin & Tonics", "Single Malt Flight", "Artisan Zero-Proof"],
    },
    {
      title: "Gather",
      kicker: "Lounge & Private Suites",
      badge: "10 to 60 Guests",
      desc: "Plush leather booth seating, ambient warm lighting, and private dining arrangements comfortably accommodating 10 to 60 guests.",
      image: "/images/luxury/luxury-intimate-booth.jpg",
      icon: <Users className="w-5 h-5 text-[#FFA028]" />,
      actionText: "Host An Event",
      actionHref: "/#events",
      highlights: ["Intimate Booth Seating", "10–60 Pax Capacity", "Dedicated Steward Service", "Celebration Setups"],
    },
  ];

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 2xl:px-20 bg-[#07090E] relative overflow-hidden w-full">
      {/* Decorative ambient neon background pools */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-amber-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-3">
          <p className="font-script text-3xl sm:text-5xl text-[#FFA028] tracking-wide drop-shadow-[0_2px_10px_rgba(255,160,40,0.4)]">
            The Three Pillars
          </p>
          <h2 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl text-[#F8FAFC] font-bold tracking-tight leading-tight">
            The Signature Stash Experience
          </h2>
          <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#94A3B8] font-semibold">
            Crafted for connoisseurs of gastronomy, fine pours & unforgettable evenings in Haridwar
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {experiences.map((exp, idx) => (
            <div
              key={exp.title}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group rounded-3xl overflow-hidden bg-[#0A0F1D]/80 border border-slate-800/80 hover:border-amber-500/50 transition-all duration-500 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_50px_rgba(255,160,40,0.2)] hover:-translate-y-2 backdrop-blur-xl"
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                <Image
                  src={exp.image}
                  alt={exp.desc}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/20 to-black/30" />
                
                {/* Floating pill badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080B14]/90 border border-slate-700/80 backdrop-blur-md shadow-lg">
                  {exp.icon}
                  <span className="text-xs uppercase font-bold tracking-wider text-white">
                    {exp.kicker}
                  </span>
                </div>

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#38BDF8]">
                  {exp.badge}
                </div>
              </div>

              {/* Content Block */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between space-y-6">
                <div>
                  <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white group-hover:text-[#FFA028] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#CBD5E1] leading-relaxed">
                    {exp.desc}
                  </p>

                  {/* Highlights Grid */}
                  <div className="mt-5 grid grid-cols-2 gap-2 pt-4 border-t border-slate-800/80">
                    {exp.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFA028]" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card CTA Link */}
                <div className="pt-4 border-t border-slate-800/60">
                  <Link
                    href={exp.actionHref}
                    className="inline-flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-[#0D1424] border border-slate-800 hover:border-amber-500/40 text-xs uppercase tracking-wider font-bold text-[#CBD5E1] group-hover:text-white group-hover:bg-[#121B2F] transition-all"
                  >
                    <span>{exp.actionText}</span>
                    <ArrowRight className="w-4 h-4 text-[#FFA028] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
