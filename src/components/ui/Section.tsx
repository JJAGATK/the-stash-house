import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
  containerSize?: "sm" | "md" | "lg" | "full";
  badge?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  containerSize = "lg",
  badge,
  className = "",
  children,
  ...props
}: SectionProps) {
  const containerSizes = {
    sm: "max-w-4xl",
    md: "max-w-5xl",
    lg: "max-w-[1440px] 2xl:max-w-[1600px] w-full",
    full: "max-w-full px-4 sm:px-8 lg:px-12 2xl:px-20",
  };

  const textAlign = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <section
      id={id}
      className={twMerge(
        clsx(
          "relative py-24 sm:py-32 px-4 sm:px-8 lg:px-12 2xl:px-20 overflow-hidden w-full",
          className
        )
      )}
      {...props}
    >
      <div className={twMerge(clsx("mx-auto w-full", containerSizes[containerSize]))}>
        {(eyebrow || title || subtitle || badge) && (
          <div className={twMerge(clsx("flex flex-col mb-12 sm:mb-16", textAlign))}>
            {badge && (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full text-xs font-bold tracking-widest uppercase bg-blue-950/60 text-[#38BDF8] border border-blue-500/40 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                {badge}
              </span>
            )}
            {eyebrow && (
              <p className="font-script text-3xl sm:text-4xl text-[#FFA028] mb-2 drop-shadow-[0_2px_10px_rgba(255,122,0,0.4)]">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-[#F8FAFC] tracking-tight leading-tight max-w-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-base sm:text-lg text-[#CBD5E1] max-w-3xl font-normal leading-relaxed">
                {subtitle}
              </p>
            )}
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-blue-500" />
              <span className="w-2 h-2 rotate-45 border border-[#FFA028] bg-[#07090E]" />
              <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#FFA028]" />
            </div>
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
