"use client";

import React from "react";

interface MarqueeProps {
  items: string[];
  speedSeconds?: number;
  direction?: "left" | "right";
  className?: string;
  separator?: string;
}

export function Marquee({
  items,
  speedSeconds = 24,
  direction = "left",
  className = "",
  separator = "✦",
}: MarqueeProps) {
  // Double array for seamless loop
  const content = [...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden whitespace-nowrap py-3 border-y border-[#D4AF37]/15 bg-[#0D0D10]/90 backdrop-blur-sm select-none ${className}`}
    >
      <div
        className="flex gap-8 w-max items-center animate-marquee"
        style={{
          animationDuration: `${speedSeconds}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {content.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="font-serif uppercase text-xs sm:text-sm tracking-[0.25em] text-[#D4AF37] font-semibold">
              {item}
            </span>
            <span className="text-[#D4AF37]/40 text-xs">{separator}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
