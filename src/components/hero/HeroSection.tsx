"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Sparkles, MapPin } from "lucide-react";
import { RESTAURANT_DATA } from "@/data/restaurant";

interface HeroSectionProps {
  onOpenBookingModal: () => void;
}

export function HeroSection({ onOpenBookingModal }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const days = [
    { day: "Sun", hours: "11:00 AM – 11:30 PM" },
    { day: "Mon", hours: "11:00 AM – 11:30 PM" },
    { day: "Tue", hours: "11:00 AM – 11:30 PM" },
    { day: "Wed", hours: "11:00 AM – 11:30 PM" },
    { day: "Thu", hours: "11:00 AM – 11:30 PM" },
    { day: "Fri", hours: "11:00 AM – 11:30 PM" },
    { day: "Sat", hours: "11:00 AM – 11:30 PM" },
  ];

  // Floating ambient embers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      speedY: number;
      speedX: number;
      alpha: number;
    }> = [];

    const colors = [
      "rgba(255, 122, 0, ",
      "rgba(255, 160, 40, ",
      "rgba(56, 189, 248, ",
      "rgba(37, 99, 235, ",
    ];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: -(Math.random() * 0.3 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color === "rgba(255, 122, 0, " ? "#FF7A00" : "#38BDF8";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-14 px-4 sm:px-8 lg:px-12 2xl:px-20 overflow-hidden bg-[#05070B]">
      {/* 4K Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/luxury/bar-shelves-ambience.jpg"
          alt="Atmospheric bar shelves at The Stash House"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.34] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/75 to-[#05070B]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070B]/85 via-transparent to-[#05070B]/85" />
      </div>

      {/* Floating Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-1 pointer-events-none opacity-70"
      />

      {/* Center Hero Content (Natural Apple Scale) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center my-auto py-6 sm:py-8">
        {/* Circular Neon Signboard */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="relative group cursor-pointer animate-neon-amber">
            <div className="absolute -inset-5 rounded-full bg-blue-600/30 blur-2xl group-hover:bg-blue-500/40 transition-all" />
            <div className="absolute -inset-2.5 rounded-full bg-amber-500/30 blur-xl group-hover:bg-amber-400/40 transition-all" />
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-blue-500/60 shadow-[0_0_35px_rgba(37,99,235,0.7)] bg-[#070A12] transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/images/brand/stash-neon-sign.png"
                alt="The Stash House Neon Signboard"
                fill
                priority
                className="object-contain p-1.5 drop-shadow-[0_0_18px_rgba(255,160,40,0.95)]"
              />
            </div>
          </div>
        </div>

        {/* Cursive Eyebrow */}
        <p className="font-script text-2xl sm:text-4xl text-[#FFA028] tracking-wide mb-2 sm:mb-3 drop-shadow-[0_2px_10px_rgba(255,160,40,0.4)]">
          Intimate dining & craft gastropub
        </p>

        {/* Natural Proportioned Title */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F8FAFC] tracking-tight leading-[1.06] drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
          The Stash House
        </h1>

        {/* Brand Kicker Badges */}
        <div className="mt-3 sm:mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm tracking-[0.2em] uppercase font-bold">
          <span className="text-[#38BDF8]">Gastro Pub</span>
          <span className="text-slate-600">•</span>
          <span className="text-[#FFA028]">Fine Dining</span>
          <span className="text-slate-600">•</span>
          <span className="text-[#CBD5E1]">Haridwar, Uttarakhand</span>
        </div>

        {/* Dual CTA Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-sm sm:max-w-none mx-auto">
          <button
            type="button"
            onClick={onOpenBookingModal}
            className="neon-pill-amber w-full sm:w-auto px-7 sm:px-9 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(255,160,40,0.4)]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Your Table</span>
          </button>

          <Link
            href="/menu"
            className="neon-pill-blue w-full sm:w-auto px-7 sm:px-9 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
          </Link>
        </div>
      </div>

      {/* Operating Hours Card (Refined Apple Dimensions) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto pt-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#090D18]/90 border border-slate-800 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FFA028]" />
              <span className="font-serif-luxury text-lg text-white font-bold tracking-wide">
                Operating Schedule
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-xs font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open Daily: 11:00 AM – 11:30 PM (Asia/Kolkata)</span>
            </div>
          </div>

          {/* 7-Day Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 sm:gap-2 text-center">
            {days.map(({ day }) => (
              <div
                key={day}
                className="p-2 sm:p-2.5 rounded-lg bg-[#0D1424]/80 border border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col items-center justify-center"
              >
                <span className="text-[11px] uppercase font-bold text-[#FFA028] tracking-wider">
                  {day}
                </span>
                <span className="text-xs font-semibold text-white mt-0.5">
                  11:00 AM
                </span>
                <span className="text-[10px] text-[#94A3B8]">
                  to 11:30 PM
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 pt-3 mt-3 border-t border-slate-800 text-[11px] text-[#94A3B8]">
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
              <span>First Floor, The Pentagon Mall, Sector 12, SIDCUL, Haridwar</span>
            </p>
            <p className="text-amber-400 font-medium">
              ★ Reservations recommended for weekend evenings & private dining (10–60 Pax)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
