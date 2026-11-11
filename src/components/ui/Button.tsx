"use client";

import React from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  isExternal = false,
  icon,
  iconPosition = "right",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-medium uppercase tracking-[0.12em] transition-all duration-300 rounded-sm cursor-pointer disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B]";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#D4AF37] via-[#E5C358] to-[#AA8323] text-[#0A0A0B] font-semibold hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:brightness-110 active:scale-[0.98]",
    secondary:
      "bg-[#15151A]/80 text-[#F8F5EE] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#1E1E26] hover:text-[#D4AF37] active:scale-[0.98]",
    outline:
      "bg-transparent text-[#D4AF37] border border-[#D4AF37] hover:bg-[#D4AF37]/10 active:scale-[0.98]",
    ghost:
      "bg-transparent text-[#F8F5EE] hover:text-[#D4AF37] hover:bg-white/5 active:scale-[0.98]",
  };

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2.5",
    lg: "text-base px-8 py-4 gap-3",
  };

  const combinedClasses = twMerge(
    clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)
  );

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
    </>
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
