import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { MapPin, Phone, Clock, Compass, ShieldAlert, Star } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#05070B] border-t border-slate-800 pt-16 pb-24 sm:pb-12 text-[#CBD5E1] overflow-hidden">
      {/* Decorative top ambient neon glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-24 bg-gradient-to-b from-blue-600/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-20 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Haridwar’s premier gastropub and secret speakeasy sanctuary. Blending the warmth of a rustic tavern with the theatrical precision of craft mixology and slow-smoked tandoori excellence.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={RESTAURANT_DATA.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="The Stash House Instagram"
                className="w-10 h-10 rounded-full bg-[#0C111E] border border-slate-700 flex items-center justify-center text-[#FFA028] hover:bg-[#FFA028] hover:text-[#05070B] hover:border-[#FFA028] transition-all"
              >
                <svg className="w-4 h-4 fill-currentColor" width="16" height="16" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={RESTAURANT_DATA.social.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps Location"
                className="w-10 h-10 rounded-full bg-[#0C111E] border border-slate-700 flex items-center justify-center text-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#05070B] hover:border-[#38BDF8] transition-all"
              >
                <Compass className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-serif uppercase tracking-[0.2em] text-xs font-bold text-white mb-4">
              Explore The Venue
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#story" className="text-[#CBD5E1] hover:text-[#FFA028] transition-colors">
                  The Sanctuary Story
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-[#CBD5E1] hover:text-[#FFA028] transition-colors">
                  Food & Cocktail Menu
                </Link>
              </li>
              <li>
                <Link href="/#bar" className="text-[#CBD5E1] hover:text-[#FFA028] transition-colors">
                  Mixology & Bar Vault
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="text-[#CBD5E1] hover:text-[#FFA028] transition-colors">
                  Real Venue Gallery
                </Link>
              </li>
              <li>
                <Link href="/#events" className="text-[#CBD5E1] hover:text-[#FFA028] transition-colors">
                  Private Gatherings (10–60 Pax)
                </Link>
              </li>
              <li>
                <Link href="/reserve" className="text-[#CBD5E1] hover:text-[#FFA028] transition-colors">
                  Reserve a Table
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Contact */}
          <div>
            <h4 className="font-serif uppercase tracking-[0.2em] text-xs font-bold text-white mb-4">
              Hours & Location
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#FFA028] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium">Daily: 11:00 AM – 11:30 PM</span>
                  <span className="text-xs text-[#94A3B8]">Liquor & kitchen service open</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <a
                  href={`tel:${RESTAURANT_DATA.contact.phone}`}
                  className="hover:text-[#FFA028] transition-colors text-white font-medium"
                >
                  {RESTAURANT_DATA.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FFA028] shrink-0 mt-0.5" />
                <span className="text-[#94A3B8]">
                  First Floor, The Pentagon Mall, Sector 12, SIDCUL, Haridwar, Uttarakhand
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Private Dining & Accolades */}
          <div className="space-y-4">
            <h4 className="font-serif uppercase tracking-[0.2em] text-xs font-bold text-white">
              Private Dining & Events
            </h4>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Hosting milestone celebrations, corporate dinners, or intimate cocktail parties? Our bespoke private event suite comfortably seats groups of 10 to 60 guests.
            </p>
            <div className="p-4 rounded-2xl bg-[#0C111E] border border-blue-900/40 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#FFA028]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-lg font-serif-luxury font-bold text-white">4.7</span>
                </div>
                <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider block mt-0.5">
                  Over 1,785+ Google Reviews
                </span>
              </div>
              <a
                href={RESTAURANT_DATA.social.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider text-[#38BDF8] hover:text-[#FFA028] font-bold"
              >
                Read Reviews →
              </a>
            </div>
          </div>
        </div>

        {/* Responsible Alcohol Notice */}
        <div className="my-6 p-4 rounded-2xl bg-[#0B0F19] border border-amber-900/30 flex items-center justify-center gap-2.5 text-center text-xs text-[#CBD5E1]">
          <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            <strong>Legal Drinking Notice:</strong> Please drink responsibly. Legal drinking age rules strictly apply. Alcoholic beverages are served only to patrons meeting statutory age requirements.
          </span>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8] pt-4">
          <p>
            © {new Date().getFullYear()} The Stash House. All rights reserved. First Floor, The Pentagon Mall, Haridwar.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/#story" className="hover:text-[#FFA028]">About Venue</Link>
            <Link href="/menu" className="hover:text-[#FFA028]">Menu</Link>
            <Link href="/reserve" className="hover:text-[#FFA028]">Reservations</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
