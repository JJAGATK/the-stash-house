"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { Phone, MapPin, ArrowRight, Menu as MenuIcon, X } from "lucide-react";

interface NavProps {
  onOpenBookingModal?: () => void;
}

export function Nav({ onOpenBookingModal }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#07090E]/95 backdrop-blur-md border-b border-blue-900/30 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.85)]"
          : "bg-gradient-to-b from-[#07090E]/95 via-[#07090E]/60 to-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-20 w-full">
        <div className="flex items-center justify-between">
          {/* Left: Brand Monogram / Neon Sign */}
          <Link href="/" className="focus:outline-none" aria-label="The Stash House Home">
            <Logo size={isScrolled ? "sm" : "md"} />
          </Link>

          {/* Center: Contact & Location details */}
          <div className="hidden lg:flex items-center gap-8 text-sm text-[#CBD5E1]">
            <a
              href={`tel:${RESTAURANT_DATA.contact.phone}`}
              className="flex items-center gap-2.5 hover:text-[#FFA028] transition-colors group"
            >
              <span className="w-6 h-6 rounded-full border border-blue-500/40 bg-blue-950/40 flex items-center justify-center text-[#38BDF8] group-hover:border-[#FFA028] group-hover:text-[#FFA028] transition-colors">
                <Phone className="w-3 h-3" />
              </span>
              <span className="font-medium tracking-wide">{RESTAURANT_DATA.contact.phoneDisplay}</span>
            </a>

            <div className="w-[1px] h-4 bg-slate-700/60" />

            <a
              href={RESTAURANT_DATA.social.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 hover:text-[#38BDF8] transition-colors group"
            >
              <span className="w-6 h-6 rounded-full border border-amber-500/40 bg-amber-950/30 flex items-center justify-center text-[#FFA028] group-hover:border-[#38BDF8] group-hover:text-[#38BDF8] transition-colors">
                <MapPin className="w-3 h-3" />
              </span>
              <span className="font-medium tracking-wide">First Floor, Pentagon Mall, Haridwar</span>
            </a>
          </div>

          {/* Right: Pill CTAs */}
          <div className="hidden sm:flex items-center gap-3.5">
            <Link
              href="/menu"
              className="neon-pill-blue px-5 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
            >
              <span>View Menu</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8]" />
            </Link>

            <button
              type="button"
              onClick={onOpenBookingModal ? onOpenBookingModal : () => { window.location.href = "/reserve"; }}
              className="neon-pill-amber px-6 py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Book your table
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenBookingModal ? onOpenBookingModal : () => { window.location.href = "/reserve"; }}
              className="neon-pill-amber px-4 py-2 text-xs font-bold uppercase tracking-wider"
            >
              Book table
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F8FAFC] hover:text-[#FFA028]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0A0D15]/98 backdrop-blur-2xl border-b border-blue-900/40 p-6 shadow-2xl">
          <div className="space-y-4 text-center">
            <Link
              href="/#story"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-serif-luxury text-xl text-[#F8FAFC] hover:text-[#FFA028]"
            >
              The Story & Sanctuary
            </Link>
            <Link
              href="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-serif-luxury text-xl text-[#F8FAFC] hover:text-[#FFA028]"
            >
              Food & Cocktail Menu
            </Link>
            <Link
              href="/#bar"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-serif-luxury text-xl text-[#F8FAFC] hover:text-[#FFA028]"
            >
              Mixology & Bar Vault
            </Link>
            <Link
              href="/#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-serif-luxury text-xl text-[#F8FAFC] hover:text-[#FFA028]"
            >
              Venue Gallery
            </Link>
            <Link
              href="/#visit"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-serif-luxury text-xl text-[#F8FAFC] hover:text-[#FFA028]"
            >
              Location & Hours
            </Link>
            <div className="pt-4 flex flex-col gap-3">
              <a
                href={`tel:${RESTAURANT_DATA.contact.phone}`}
                className="py-3 rounded-lg bg-blue-950/60 border border-blue-500/30 text-sm font-semibold text-[#38BDF8]"
              >
                Call: {RESTAURANT_DATA.contact.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenBookingModal) onOpenBookingModal();
                  else window.location.href = "/reserve";
                }}
                className="neon-pill-amber py-3 text-sm font-bold uppercase tracking-wider"
              >
                Reserve Table
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
