"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GALLERY_ITEMS, GalleryItem } from "@/data/gallery";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "interior", label: "Interior & Ambience" },
    { id: "bar", label: "The Bar & Pours" },
    { id: "food", label: "Artisanal Kitchen" },
    { id: "gatherings", label: "Private Gatherings" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null || prev === 0 ? filteredItems.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null || prev === filteredItems.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const activePhoto: GalleryItem | undefined =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : undefined;

  return (
    <Section
      id="gallery"
      eyebrow="Visual Odyssey"
      title="Inside The Stash House"
      subtitle="Explore real photos of our exposed brickwork, illuminated liquor vault, and artisanal tandoor feasts."
      containerSize="lg"
    >
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeCategory === cat.id
                ? "bg-[#FFA028] text-[#05070B] shadow-[0_0_20px_rgba(255,160,40,0.5)]"
                : "bg-[#0C111E] text-[#CBD5E1] hover:text-[#FFA028] border border-slate-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredItems.map((item, idx) => (
          <Reveal key={item.id} direction="up" delay={(idx % 4) * 80}>
            <div
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0C111E] border border-slate-800 hover:border-amber-500/60 cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-sm font-serif-luxury font-bold text-white">
                  {item.title}
                </span>
                <span className="text-xs text-[#FFA028] font-bold uppercase tracking-wider mt-0.5 flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5" /> Fullscreen View
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Accessible Fullscreen Lightbox Modal */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:text-[#D4AF37] hover:bg-white/20 transition-all z-20"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(
                lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1
              );
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:text-[#D4AF37] hover:bg-black/90 border border-white/20 transition-all z-20"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(
                lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1
              );
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:text-[#D4AF37] hover:bg-black/90 border border-white/20 transition-all z-20"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image Frame */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[72vh] rounded-lg overflow-hidden border border-[#D4AF37]/30">
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-serif text-lg font-bold text-[#F8F5EE]">
                {activePhoto.title}
              </h3>
              <p className="text-xs text-[#A39E93] max-w-xl mx-auto mt-1">
                {activePhoto.alt}
              </p>
              <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest mt-1 block">
                {lightboxIndex + 1} of {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
