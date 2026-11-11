"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "md",
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle ESC and click outside per Modern Web Guidance
  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const rect = dialog.getBoundingClientRect();
    const isOutside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;
    if (isOutside) {
      onClose();
    }
  };

  const maxWidthStyles = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-labelledby="modal-headline"
      className={`fixed inset-0 m-auto p-0 bg-transparent text-[#F8F5EE] border-0 backdrop:bg-black/80 backdrop:backdrop-blur-md open:flex flex-col w-[94vw] ${maxWidthStyles[maxWidth]} rounded-lg shadow-2xl focus:outline-none z-50`}
    >
      <div className="relative w-full overflow-hidden rounded-3xl bg-[#0B0F1A] border-2 border-blue-900/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)]">
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-800 bg-[#0E1526]/90">
          <div>
            <h3 id="modal-headline" className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-1 text-sm text-[#CBD5E1] font-normal leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#94A3B8] hover:text-[#FFA028] hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </dialog>
  );
}
