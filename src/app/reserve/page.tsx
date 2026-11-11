import React from "react";
import type { Metadata } from "next";
import { Nav } from "@/components/navigation/Nav";
import { Footer } from "@/components/navigation/Footer";
import { BookingForm } from "@/components/ui/BookingForm";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { Calendar, Phone, ShieldCheck, Clock, Users, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Reserve a Table | The Stash House Haridwar",
  description:
    "Book your table or private event suite at The Stash House, Pentagon Mall, Haridwar. Instant confirmation via host desk and WhatsApp.",
  alternates: {
    canonical: "/reserve",
  },
};

export default function ReservePage() {
  return (
    <main className="min-h-screen bg-[#07090E] flex flex-col pt-24">
      <Nav />

      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-950/60 text-[#38BDF8] border border-blue-500/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> Table & Event Bookings
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif-luxury font-bold text-[#F8FAFC] tracking-tight">
            Reserve Your Stash House Experience
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#CBD5E1] max-w-xl mx-auto leading-relaxed">
            Whether an intimate dinner for two, a weekend craft cocktail session, or a private gathering of up to 60 guests, we ensure your table is prepared with care.
          </p>
        </div>

        {/* Perks Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-sm text-[#CBD5E1]">
          <div className="p-4 rounded-2xl bg-[#0B0F1A] border border-slate-800 flex items-center gap-3.5">
            <Clock className="w-5 h-5 text-[#FFA028] shrink-0" />
            <div>
              <strong className="text-white block font-semibold">Hours Today</strong>
              <span>11:00 AM – 11:30 PM</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#0B0F1A] border border-slate-800 flex items-center gap-3.5">
            <Users className="w-5 h-5 text-[#38BDF8] shrink-0" />
            <div>
              <strong className="text-white block font-semibold">Private Dining</strong>
              <span>10 to 60 Guests Available</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#0B0F1A] border border-slate-800 flex items-center gap-3.5">
            <Phone className="w-5 h-5 text-[#FFA028] shrink-0" />
            <div>
              <strong className="text-white block font-semibold">Direct Hotline</strong>
              <span>{RESTAURANT_DATA.contact.phoneDisplay}</span>
            </div>
          </div>
        </div>

        {/* Booking Form Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0B0F1A] border-2 border-blue-900/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500/10 via-blue-500/5 to-transparent pointer-events-none" />
          <BookingForm />
        </div>
      </div>

      <Footer />
    </main>
  );
}
