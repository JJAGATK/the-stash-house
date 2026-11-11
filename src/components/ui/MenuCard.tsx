import React from "react";
import { MenuItem } from "@/data/menu";
import { Sparkles, Wine, Flame, Leaf } from "lucide-react";

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const isVeg = item.dietary.includes("veg");
  const isNonVeg = item.dietary.includes("non-veg");
  const isVegan = item.dietary.includes("vegan");
  const isAlcoholic = item.dietary.includes("alcoholic");

  return (
    <div className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#0B0F1A] hover:bg-[#0E1526] border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(255,122,0,0.15)] hover:-translate-y-1">
      {/* Glow highlight on hover */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-amber-500/10 via-blue-500/5 to-transparent rounded-tr-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div>
        {/* Top meta: dietary icon & special tags */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {/* Standard Indian FSSAI dietary indicator */}
            {isVeg && (
              <span
                className="w-4 h-4 rounded-sm border border-emerald-500 flex items-center justify-center p-[2px]"
                title="Vegetarian"
                aria-label="Vegetarian"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </span>
            )}
            {isNonVeg && (
              <span
                className="w-4 h-4 rounded-sm border border-red-700 flex items-center justify-center p-[2px]"
                title="Non-Vegetarian"
                aria-label="Non-Vegetarian"
              >
                <span className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-red-700" />
              </span>
            )}
            {isVegan && (
              <span
                className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full"
                title="Vegan"
              >
                <Leaf className="w-3 h-3" /> Vegan
              </span>
            )}
            {isAlcoholic && (
              <span
                className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-full"
                title="Contains Alcohol - 21+"
              >
                <Wine className="w-3 h-3" /> Handcrafted
              </span>
            )}
          </div>

          {item.isChefSpecial && (
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-2.5 h-2.5" /> Stash Signature
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-bold text-[#F8F5EE] group-hover:text-[#D4AF37] transition-colors duration-200">
          {item.name}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-sm text-[#C8C3B7] leading-relaxed line-clamp-3">
          {item.description}
        </p>

        {/* Ingredient tags */}
        {item.ingredients && item.ingredients.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.ingredients.map((ing, idx) => (
              <span
                key={idx}
                className="text-[10px] text-[#A39E93] bg-[#0A0A0B]/60 border border-white/5 px-2 py-0.5 rounded"
              >
                {ing}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom bar: pairing recommendation or price placeholder */}
      {item.pairing && (
        <div className="mt-4 pt-3 border-t border-[#D4AF37]/10 flex items-center gap-1.5 text-[11px] text-[#D4AF37]/80 italic">
          <Wine className="w-3 h-3 text-[#D4AF37]" />
          <span>{item.pairing}</span>
        </div>
      )}
    </div>
  );
}
