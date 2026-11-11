"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "@/components/brand/Logo";

interface LoaderProps {
  onComplete?: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If already visited this session or prefers reduced motion, skip loader immediately
    if (
      typeof window !== "undefined" &&
      (sessionStorage.getItem("stash_visited") ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      onComplete?.();
      return;
    }

    // Show brief, elegant 350ms entrance for first visit
    setIsVisible(true);
    sessionStorage.setItem("stash_visited", "true");

    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => setIsVisible(false)}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090E] transition-opacity duration-300 cursor-pointer select-none"
    >
      <div className="relative animate-pulse flex flex-col items-center">
        <Logo size="lg" showText={false} />
        <span className="font-serif-luxury text-xs uppercase tracking-[0.3em] text-[#FFA028] mt-3">
          The Stash House
        </span>
      </div>
    </div>
  );
}
