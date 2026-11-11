import React from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { REVIEWS_DATA } from "@/data/reviews";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { Star, Quote, CheckCircle } from "lucide-react";

export function ReviewsSection() {
  return (
    <Section
      id="reviews"
      eyebrow="Guest Sentiments"
      title="Verified Words From Our Patrons"
      subtitle="Authentic reviews shared by visitors and patrons on Google Maps."
      containerSize="lg"
    >
      {/* Overview Stat Ribbon */}
      <div className="mb-12 max-w-xl mx-auto p-5 rounded-3xl bg-[#0B0F1A] border-2 border-blue-900/40 shadow-2xl flex items-center justify-around text-center">
        <div>
          <span className="block text-4xl font-serif-luxury font-extrabold text-[#FFA028]">
            {RESTAURANT_DATA.metrics.rating}
          </span>
          <div className="flex items-center justify-center gap-1 my-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-[#FFA028] text-[#FFA028]" />
            ))}
          </div>
          <span className="text-xs text-[#94A3B8] uppercase font-bold tracking-wider">
            Overall Rating
          </span>
        </div>
        <div className="w-[1px] h-12 bg-slate-800" />
        <div>
          <span className="block text-4xl font-serif-luxury font-extrabold text-white">
            {RESTAURANT_DATA.metrics.reviewCount}+
          </span>
          <span className="text-xs text-[#38BDF8] uppercase font-bold tracking-wider block mt-1">
            Google Reviews
          </span>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REVIEWS_DATA.map((rev, idx) => (
          <Reveal key={rev.id} direction="up" delay={idx * 100}>
            <div className="h-full p-7 rounded-3xl bg-[#0C111E] border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(255,122,0,0.15)] text-left group">
              <div>
                {/* Header: Stars & Google attribution */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFA028] text-[#FFA028]" />
                    ))}
                  </div>
                  <span className="text-xs uppercase font-bold tracking-widest text-[#38BDF8] bg-blue-950/60 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
                    {rev.source}
                  </span>
                </div>

                {/* Highlight Tag */}
                {rev.highlight && (
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-[#FFA028] bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 rounded-md inline-block">
                      &quot;{rev.highlight}&quot;
                    </span>
                  </div>
                )}

                {/* Review text */}
                <p className="text-sm text-[#CBD5E1] leading-relaxed italic">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              {/* Author & verified indicator */}
              <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="block text-sm font-bold text-white group-hover:text-[#FFA028] transition-colors">
                    {rev.author}
                  </span>
                  <span className="text-xs text-[#94A3B8]">{rev.date}</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
