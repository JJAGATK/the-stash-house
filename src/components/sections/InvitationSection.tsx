"use client";

import React from "react";
import Image from "next/image";
import { Logo } from "@/components/brand/Logo";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { MapPin, Phone } from "lucide-react";

interface InvitationSectionProps {
  onOpenBookingModal: () => void;
}

export function InvitationSection({ onOpenBookingModal }: InvitationSectionProps) {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-12 2xl:px-20 bg-[#07090E] overflow-hidden text-center w-full">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[500px] bg-blue-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto flex flex-col items-center relative z-10 w-full">
        {/* Panoramic Letterbox Window featuring Luxury Gastropub Dining Room */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[28/9] rounded-3xl overflow-hidden border-2 border-blue-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] mb-12 bg-slate-900 group">
          <Image
            src="/images/luxury/letterbox-dining-room.jpg"
            alt="Warm intimate dining booths and bar counter at The Stash House Haridwar"
            fill
            sizes="100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-1000 filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/30 to-transparent" />
        </div>

        {/* Cursive kicker */}
        <p className="font-script text-3xl sm:text-4xl text-[#FFA028] mb-2 drop-shadow-[0_2px_10px_rgba(255,122,0,0.4)]">
          An evening to remember
        </p>

        {/* Heading */}
        <h2 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F8FAFC] tracking-tight leading-tight max-w-3xl">
          We look forward to welcoming you to The Stash
        </h2>

        {/* Contact info with circular badges */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm sm:text-base text-[#CBD5E1]">
          <a
            href={RESTAURANT_DATA.social.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:text-[#38BDF8] transition-colors group"
          >
            <span className="w-8 h-8 rounded-full border border-blue-500/40 bg-blue-950/40 flex items-center justify-center text-[#38BDF8] group-hover:border-[#FFA028] group-hover:text-[#FFA028] transition-colors">
              <MapPin className="w-4 h-4" />
            </span>
            <span className="font-medium">First Floor, Pentagon Mall, Haridwar</span>
          </a>

          <a
            href={`tel:${RESTAURANT_DATA.contact.phone}`}
            className="flex items-center gap-3 hover:text-[#FFA028] transition-colors group"
          >
            <span className="w-8 h-8 rounded-full border border-amber-500/40 bg-amber-950/40 flex items-center justify-center text-[#FFA028] group-hover:border-[#38BDF8] group-hover:text-[#38BDF8] transition-colors">
              <Phone className="w-4 h-4" />
            </span>
            <span className="font-medium">Call us at: {RESTAURANT_DATA.contact.phoneDisplay}</span>
          </a>
        </div>

        {/* Solid Gold / Amber Pill CTA */}
        <div className="mt-10">
          <button
            type="button"
            onClick={onOpenBookingModal}
            className="neon-pill-amber px-10 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest cursor-pointer shadow-[0_0_25px_rgba(255,122,0,0.6)]"
          >
            Book your table
          </button>
        </div>

        {/* Centered Crest Logo (matching Image 2) */}
        <div className="mt-16 pt-12 border-t border-slate-800/80 flex flex-col items-center">
          <div className="p-2 rounded-full border border-blue-500/30 bg-[#0A0D17] shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Logo size="lg" showText={false} />
          </div>
          <span className="font-serif-luxury text-sm tracking-[0.2em] uppercase font-bold text-[#F8FAFC] mt-3">
            The Stash House
          </span>
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#38BDF8] font-semibold">
            Haridwar • Uttarakhand
          </span>
        </div>
      </div>
    </section>
  );
}
