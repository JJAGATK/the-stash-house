"use client";

import React from "react";
import Image from "next/image";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { Users, Sparkles, Music, ShieldCheck, MessageCircle, Calendar } from "lucide-react";

interface EventsSectionProps {
  onOpenBookingModal: () => void;
}

export function EventsSection({ onOpenBookingModal }: EventsSectionProps) {
  const whatsappUrl = `https://wa.me/${RESTAURANT_DATA.contact.whatsapp}?text=${encodeURIComponent(
    "Hello The Stash House! I would like to inquire about hosting a private event / gathering (10–60 guests). Please share your packages and availability."
  )}`;

  return (
    <section id="events" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 2xl:px-20 bg-[#05070B] relative overflow-hidden w-full border-t border-slate-900">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="font-script text-3xl sm:text-5xl text-[#FFA028] tracking-wide drop-shadow-[0_2px_10px_rgba(255,160,40,0.4)]">
            Private Celebrations & Soirées
          </p>
          <h2 className="text-4xl sm:text-6xl font-serif-luxury font-bold text-[#F8FAFC] leading-tight">
            Host Your Gathering at The Stash House
          </h2>
          <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed">
            From milestone birthday soirées and corporate dinners to family banquets, our private dining suite comfortably accommodates 10 to 60 guests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Private Dining Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-amber-500/20 via-blue-600/15 to-transparent blur-xl opacity-70 pointer-events-none" />

              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-slate-900 group">
                <Image
                  src="/images/luxury/private-dining-banquet.jpg"
                  alt="Private dining and group gathering setup at The Stash House Haridwar"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/90 via-[#05070B]/20 to-transparent" />

                {/* Floating Capacity Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#0C111E]/95 border border-amber-500/40 backdrop-blur-md flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-[#FFA028]">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-sm font-serif-luxury font-bold text-white">
                        Private Suite Capacity
                      </span>
                      <span className="text-xs text-[#CBD5E1]">
                        10 to 60 Guests Custom Configurations
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Event Features & Enquiry CTA */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h3 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#F8FAFC] leading-snug">
              Bespoke Banqueting with Speakeasy Soul
            </h3>
            <p className="text-base text-[#CBD5E1] leading-relaxed">
              Elevate your celebration beyond standard banquet halls. At The Stash House, your guests step into an exclusive sanctuary featuring personalized chef’s tasting menus, hand-shaken craft cocktails, and tailored acoustic ambience.
            </p>

            {/* Event Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#0C111E] border border-slate-800">
                <Sparkles className="w-4 h-4 text-[#FFA028] mb-1.5" />
                <h4 className="font-serif-luxury text-sm font-bold text-white">Tailored Prix-Fixe Menus</h4>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">Multi-course vegetarian & gourmet grills crafted to your preference.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0C111E] border border-slate-800">
                <Music className="w-4 h-4 text-[#38BDF8] mb-1.5" />
                <h4 className="font-serif-luxury text-sm font-bold text-white">Acoustic & AV Support</h4>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">Dedicated sound setup for toasts, speeches, or live music sessions.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0C111E] border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-[#FFA028] mb-1.5" />
                <h4 className="font-serif-luxury text-sm font-bold text-white">Dedicated Host Team</h4>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">Attentive, discreet steward service ensuring effortless hospitality.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0C111E] border border-slate-800">
                <Users className="w-4 h-4 text-[#38BDF8] mb-1.5" />
                <h4 className="font-serif-luxury text-sm font-bold text-white">Pentagon Mall Parking</h4>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">Ample covered, secure mall parking for all attending guests.</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={onOpenBookingModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#05070B] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,160,40,0.35)] transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" /> Inquire For Private Event
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0C111E] border border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-400 font-medium text-xs uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Event Manager
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
