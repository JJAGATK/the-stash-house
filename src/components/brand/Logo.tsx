import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export function Logo({ className = "", size = "md", showText = true }: LogoProps) {
  const sizeMap = {
    sm: { diameter: 40, width: 40, height: 40, textTitle: "text-sm", textSub: "text-[9px]" },
    md: { diameter: 52, width: 52, height: 52, textTitle: "text-lg", textSub: "text-[11px]" },
    lg: { diameter: 72, width: 72, height: 72, textTitle: "text-2xl", textSub: "text-xs" },
    xl: { diameter: 96, width: 96, height: 96, textTitle: "text-3xl", textSub: "text-sm" },
  };

  const config = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3.5 group select-none ${className}`}>
      {/* Real Authentic Neon Signboard */}
      <div
        className="relative shrink-0 rounded-full transition-all duration-300 group-hover:scale-105"
        style={{ width: config.diameter, height: config.diameter }}
      >
        {/* Ambient neon aura blur behind sign */}
        <div className="absolute inset-0 rounded-full bg-blue-600/40 blur-md group-hover:bg-blue-500/60 transition-all" />
        <div className="absolute inset-1.5 rounded-full bg-amber-500/25 blur-sm group-hover:bg-amber-400/40 transition-all" />
        
        {/* Actual cropped authentic neon sign */}
        <Image
          src="/images/brand/stash-neon-sign.png"
          alt="The Stash House Gastro Pub & Fine Dining official neon sign"
          width={config.width}
          height={config.height}
          priority
          className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_12px_rgba(37,99,235,0.65)] group-hover:drop-shadow-[0_0_20px_rgba(255,122,0,0.85)] transition-all"
        />
      </div>

      {/* Brand title & sub-text (optional) */}
      {showText && (
        <div className="hidden sm:flex flex-col text-left">
          <span
            className={`font-serif-luxury ${config.textTitle} tracking-[0.14em] uppercase font-bold text-[#F8FAFC] group-hover:text-[#FFA028] transition-colors leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}
          >
            The Stash House
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`${config.textSub} tracking-[0.24em] uppercase text-[#38BDF8] font-semibold`}>
              Gastro Pub
            </span>
            <span className="text-[#94A3B8] text-[9px]">•</span>
            <span className={`${config.textSub} tracking-[0.24em] uppercase text-[#FF9E1B] font-semibold`}>
              Fine Dining
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
