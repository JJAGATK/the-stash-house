"use client";

import React, { useState, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { RESTAURANT_DATA, getLiveVenueStatus } from "@/data/restaurant";
import { MapPin, Phone, Clock, Navigation, MessageCircle, ExternalLink, ShieldCheck } from "lucide-react";

export function VisitSection() {
  const [venueStatus, setVenueStatus] = useState<ReturnType<typeof getLiveVenueStatus>>({
    isOpen: true,
    statusText: "Open Today (11:00 AM – 11:30 PM)",
    timeUntilChange: "Closes at 11:30 PM",
  });

  useEffect(() => {
    setVenueStatus(getLiveVenueStatus());
    const timer = setInterval(() => {
      setVenueStatus(getLiveVenueStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const whatsappDirect = `https://wa.me/${RESTAURANT_DATA.contact.whatsapp}?text=${encodeURIComponent(
    "Hello The Stash House! I would like directions / information about visiting today."
  )}`;

  return (
    <Section
      id="visit"
      eyebrow="Plan Your Journey"
      title="Find The Stash House"
      subtitle="Located on the First Floor of The Pentagon Mall, BHEL Township, Haridwar."
      containerSize="lg"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch text-left">
        {/* Left: Venue Specs & Live Status */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <Reveal direction="left">
            {/* Live Operational Status Card */}
            <div className="p-7 rounded-3xl bg-[#0B0F1A] border-2 border-blue-900/40 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs uppercase font-serif tracking-[0.2em] text-[#38BDF8] font-bold">
                  Live Venue Status
                </span>
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#07090E] border border-slate-700 text-xs">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      venueStatus.isOpen ? "bg-emerald-400 animate-pulse" : "bg-red-500"
                    }`}
                  />
                  <span className="font-semibold text-white">{venueStatus.statusText}</span>
                </div>
              </div>

              <div className="space-y-4 text-sm text-[#CBD5E1]">
                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#FFA028] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-base font-semibold">Operating Hours</strong>
                    <span>{RESTAURANT_DATA.hours.display}</span>
                    <p className="text-xs text-[#FFA028] font-medium mt-0.5">{venueStatus.timeUntilChange}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-base font-semibold">Full Address</strong>
                    <span className="leading-relaxed">{RESTAURANT_DATA.address.full}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#FFA028] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-base font-semibold">Phone & Inquiries</strong>
                    <a href={`tel:${RESTAURANT_DATA.contact.phone}`} className="text-[#38BDF8] hover:text-[#FFA028] font-bold text-base transition-colors">
                      {RESTAURANT_DATA.contact.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-3">
                <a
                  href={`tel:${RESTAURANT_DATA.contact.phone}`}
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-950/60 border border-blue-500/40 text-xs uppercase font-bold tracking-wider text-[#38BDF8] hover:bg-blue-900/80 transition-all text-center"
                >
                  <Phone className="w-4 h-4" /> Call Desk
                </a>

                <a
                  href={whatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase font-bold tracking-wider transition-all text-center shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Parking & Mall Note */}
            <div className="p-4 rounded-2xl bg-[#0C111E] border border-slate-800 text-xs text-[#94A3B8] flex items-start gap-3 mt-4">
              <ShieldCheck className="w-4 h-4 text-[#FFA028] shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                <strong>Visitor Tip:</strong> Take the central escalators or lift to the First Floor, right above McDonald’s. Ample secure mall parking and valet services are accessible on all days.
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right: Embedded Interactive Map */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <Reveal direction="right">
            <div className="relative w-full h-[380px] sm:h-[450px] rounded-3xl overflow-hidden border-2 border-blue-900/40 shadow-2xl bg-[#090D18]">
              {/* Google Maps Embed iframe with precise coordinates */}
              <iframe
                title="The Stash House Pentagon Mall Haridwar Location Map"
                src="https://maps.google.com/maps?q=29.9478821,78.0754687&hl=en&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(90%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Map CTA */}
              <div className="absolute bottom-4 right-4 z-10">
                <a
                  href={RESTAURANT_DATA.social.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#07090E]/95 text-[#FFA028] border border-amber-500/50 text-xs font-bold uppercase tracking-wider hover:bg-[#FFA028] hover:text-[#05070B] transition-all shadow-2xl backdrop-blur-md cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
