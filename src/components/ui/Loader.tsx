"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "@/components/brand/Logo";

interface LoaderProps {
  onComplete?: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Quick 1.2s progress loader
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 250);
          return 100;
        }
        return prev + 18;
      });
    }, 100);

    // Escape key skips immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        setIsVisible(false);
        onComplete?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => {
        setIsVisible(false);
        onComplete?.();
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090E] transition-opacity duration-500 cursor-pointer select-none"
      aria-label="Loading The Stash House - Click to skip"
    >
      <div className="relative flex flex-col items-center p-8 text-center animate-fade-in">
        {/* Glowing pulse rings */}
        <div className="absolute w-52 h-52 rounded-full bg-blue-600/25 blur-3xl animate-pulse" />
        <div className="absolute w-44 h-44 rounded-full bg-amber-500/20 blur-2xl animate-pulse" />

        <Logo size="lg" />

        <p className="mt-8 text-xs font-serif uppercase tracking-[0.25em] text-[#FFA028] font-bold">
          Unlocking The Stash...
        </p>

        {/* Progress Bar */}
        <div className="w-52 h-[2px] bg-slate-800 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-[#38BDF8] to-[#FFA028] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="mt-4 text-[10px] uppercase tracking-widest text-[#94A3B8]">
          Press ESC or Tap to skip
        </span>
      </div>
    </div>
  );
}
