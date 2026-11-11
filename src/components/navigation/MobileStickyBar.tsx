"use client";

import React from "react";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { Phone, Calendar, Navigation } from "lucide-react";

interface MobileStickyBarProps {
  onOpenBookingModal: () => void;
}

export function MobileStickyBar({ onOpenBookingModal }: MobileStickyBarProps) {
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[#07090E]/95 backdrop-blur-xl border-t border-blue-900/40 px-3 py-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(0,0,0,0.95)]">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call button */}
        <a
          href={`tel:${RESTAURANT_DATA.contact.phone}`}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-[#0D1322] border border-blue-500/30 text-white hover:text-[#38BDF8] active:scale-95 transition-all text-center"
        >
          <Phone className="w-4 h-4 text-[#38BDF8] mb-1" />
          <span className="text-[11px] uppercase font-bold tracking-wider">Call Host</span>
        </a>

        {/* Reserve button (highlighted center) */}
        <button
          type="button"
          onClick={onOpenBookingModal}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-gradient-to-r from-[#FFA028] to-[#FF7A00] text-[#05070B] font-bold shadow-[0_0_20px_rgba(255,122,0,0.5)] active:scale-95 transition-all text-center cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#05070B] mb-1" />
          <span className="text-[11px] uppercase font-bold tracking-wider">Reserve</span>
        </button>

        {/* Directions button */}
        <a
          href={RESTAURANT_DATA.social.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-[#0D1322] border border-slate-700 text-white hover:text-[#FFA028] active:scale-95 transition-all text-center"
        >
          <Navigation className="w-4 h-4 text-[#FFA028] mb-1" />
          <span className="text-[11px] uppercase font-bold tracking-wider">Directions</span>
        </a>
      </div>
    </div>
  );
}
