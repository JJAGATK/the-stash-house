"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Calendar, Clock, Users, CheckCircle, AlertCircle, Send, MessageCircle } from "lucide-react";
import { RESTAURANT_DATA } from "@/data/restaurant";

interface BookingFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function BookingForm({ onSuccess, className = "" }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "19:30",
    guests: "2",
    occasion: "Dinner Gathering",
    notes: "",
    honeypot: "", // anti-spam honeypot
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedDetails, setConfirmedDetails] = useState<typeof formData | null>(null);

  // Time slots from 12:00 PM to 10:30 PM
  const timeSlots = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"
  ];

  // Min date is today in YYYY-MM-DD
  const todayStr = new Date().toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (formData.honeypot) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit table reservation.");
      }

      setConfirmedDetails({ ...formData });
      setStatus("success");

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#D4AF37", "#E5C358", "#F8F5EE", "#A6422F"],
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please call us directly.");
    }
  };

  const generateWhatsAppLink = () => {
    if (!confirmedDetails) return `https://wa.me/${RESTAURANT_DATA.contact.whatsapp}`;
    const text = encodeURIComponent(
      `Hello The Stash House! I would like to confirm my table reservation:\n\n` +
      `👤 Name: ${confirmedDetails.name}\n` +
      `📅 Date: ${confirmedDetails.date}\n` +
      `⏰ Time: ${confirmedDetails.time}\n` +
      `👥 Guests: ${confirmedDetails.guests} person(s)\n` +
      `🥂 Occasion: ${confirmedDetails.occasion}\n` +
      (confirmedDetails.notes ? `📝 Notes: ${confirmedDetails.notes}\n` : "") +
      `\nPlease let me know table confirmation. Thank you!`
    );
    return `https://wa.me/${RESTAURANT_DATA.contact.whatsapp}?text=${text}`;
  };

  if (status === "success" && confirmedDetails) {
    return (
      <div className={`p-8 rounded-lg bg-[#141419] border border-[#D4AF37]/40 text-center ${className}`}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#F8F5EE] mb-2">
          Reservation Request Received
        </h3>
        <p className="text-sm text-[#C8C3B7] max-w-md mx-auto mb-6">
          Thank you, <strong className="text-[#F8F5EE]">{confirmedDetails.name}</strong>. Your table for{" "}
          <strong className="text-[#D4AF37]">{confirmedDetails.guests} guests</strong> on{" "}
          <strong className="text-[#D4AF37]">{confirmedDetails.date}</strong> at{" "}
          <strong className="text-[#D4AF37]">{confirmedDetails.time}</strong> has been received by our host team.
        </p>

        <div className="p-4 rounded bg-[#0A0A0B] border border-white/10 max-w-md mx-auto mb-6 text-xs text-left space-y-2 text-[#C8C3B7]">
          <p><span className="text-[#8E8A80]">Venue:</span> The Stash House, Pentagon Mall, Haridwar</p>
          <p><span className="text-[#8E8A80]">Phone:</span> {confirmedDetails.phone}</p>
          <p><span className="text-[#8E8A80]">Occasion:</span> {confirmedDetails.occasion}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Instant WhatsApp Confirmation
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded bg-white/5 hover:bg-white/10 text-[#C8C3B7] hover:text-white font-medium text-xs uppercase tracking-wider transition-colors border border-white/10"
          >
            Make Another Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 text-left ${className}`} noValidate>
      {/* Honeypot field (hidden from screen reader & real users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && (
        <div className="p-4 rounded-md bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="res-date" className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-medium">
            <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Date *</span>
          </label>
          <input
            type="date"
            id="res-date"
            name="date"
            required
            min={todayStr}
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-[#16161D] border border-white/15 text-[#F8F5EE] text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
          />
        </div>

        <div>
          <label htmlFor="res-time" className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-medium">
            <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Preferred Time *</span>
          </label>
          <select
            id="res-time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-[#16161D] border border-white/15 text-[#F8F5EE] text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
          >
            {timeSlots.map((slot) => (
              <option key={slot} value={slot} className="bg-[#16161D] text-[#F8F5EE]">
                {slot} {parseInt(slot.split(":")[0]) >= 12 ? "PM" : "AM"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: Guests & Occasion */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="res-guests" className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-medium">
            <span className="inline-flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Party Size *</span>
          </label>
          <select
            id="res-guests"
            name="guests"
            required
            value={formData.guests}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-[#16161D] border border-white/15 text-[#F8F5EE] text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 30, 40, 50, 60].map((num) => (
              <option key={num} value={num} className="bg-[#16161D] text-[#F8F5EE]">
                {num} {num === 1 ? "Guest" : "Guests"} {num >= 10 ? "(Private Dining / Group)" : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="res-occasion" className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-medium">
            Occasion
          </label>
          <select
            id="res-occasion"
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-[#16161D] border border-white/15 text-[#F8F5EE] text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer"
          >
            <option value="Dinner Gathering">Dinner Gathering</option>
            <option value="Birthday Celebration">Birthday Celebration</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Romantic Date Night">Romantic Date Night</option>
            <option value="Corporate / Business Dinner">Corporate / Business Dinner</option>
            <option value="Cocktails & Lounge Vibes">Cocktails & Lounge Vibes</option>
          </select>
        </div>
      </div>

      {/* Row 3: Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="res-name" className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-medium">
            Full Name *
          </label>
          <input
            type="text"
            id="res-name"
            name="name"
            required
            placeholder="e.g. Rahul Sharma"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            className="w-full px-4 py-3 rounded bg-[#16161D] border border-white/15 text-[#F8F5EE] text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] placeholder:text-[#8E8A80]/60 transition-all"
          />
        </div>

        <div>
          <label htmlFor="res-phone" className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-medium">
            Phone / WhatsApp *
          </label>
          <input
            type="tel"
            id="res-phone"
            name="phone"
            required
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            className="w-full px-4 py-3 rounded bg-[#16161D] border border-white/15 text-[#F8F5EE] text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] placeholder:text-[#8E8A80]/60 transition-all"
          />
        </div>
      </div>

      {/* Special Notes */}
      <div>
        <label htmlFor="res-notes" className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-medium">
          Special Requests / Dietary Notes (Optional)
        </label>
        <textarea
          id="res-notes"
          name="notes"
          rows={3}
          placeholder="Seating preference, dietary allergies, surprise cake, etc."
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded bg-[#16161D] border border-white/15 text-[#F8F5EE] text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] placeholder:text-[#8E8A80]/60 transition-all resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="neon-pill-amber w-full py-4 text-sm font-bold uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(255,122,0,0.5)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
      >
        {status === "submitting" ? (
          <>
            <span className="w-4 h-4 border-2 border-[#05070B] border-t-transparent rounded-full animate-spin" />
            <span>Securing Table...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Confirm Table Reservation</span>
          </>
        )}
      </button>

      <p className="text-xs text-center text-[#94A3B8] leading-relaxed">
        Immediate confirmation via host desk. For instant inquiries, call{" "}
        <a href={`tel:${RESTAURANT_DATA.contact.phone}`} className="text-[#38BDF8] underline hover:text-[#FFA028]">
          {RESTAURANT_DATA.contact.phoneDisplay}
        </a>
      </p>
    </form>
  );
}
