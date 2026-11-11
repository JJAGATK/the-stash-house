"use client";

import React, { useState, useMemo } from "react";
import { Section } from "@/components/ui/Section";
import { MenuCard } from "@/components/ui/MenuCard";
import { MENU_ITEMS, MENU_CATEGORIES, DietaryTag } from "@/data/menu";
import { Search, Filter, Sparkles, Leaf, Wine } from "lucide-react";

interface MenuSectionProps {
  initialCategory?: string;
  isStandalonePage?: boolean;
}

export function MenuSection({
  initialCategory = "all",
  isStandalonePage = false,
}: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [dietaryFilter, setDietaryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // Dietary filter
      if (dietaryFilter === "veg" && !item.dietary.includes("veg")) return false;
      if (dietaryFilter === "non-veg" && !item.dietary.includes("non-veg")) return false;
      if (dietaryFilter === "vegan" && !item.dietary.includes("vegan")) return false;
      if (dietaryFilter === "signature" && !item.isChefSpecial) return false;
      if (dietaryFilter === "cocktails" && !item.dietary.includes("alcoholic")) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIng = item.ingredients?.some((ing) =>
          ing.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesDesc && !matchesIng) return false;
      }

      return true;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  return (
    <Section
      id="menu"
      eyebrow="Gastronomic Repertoire"
      title="The Stash House Menu"
      subtitle="From smoldering tandoor embers to handcrafted botanical mixology. Authentic flavors cooked with precision."
      containerSize="lg"
    >
      {/* Search Bar & Dietary Filter Pills */}
      <div className="max-w-3xl mx-auto mb-10 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#FFA028] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            placeholder="Search dishes, ingredients (e.g. 'Dal Makhani', 'Galouti', 'Truffle', 'Bourbon')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-[#0B0F1A] border border-blue-900/40 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#FFA028] focus:ring-1 focus:ring-[#FFA028] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-[#FFA028]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Dietary Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => setDietaryFilter("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
              dietaryFilter === "all"
                ? "bg-[#FFA028] text-[#07090E] shadow-[0_0_15px_rgba(255,160,40,0.5)]"
                : "bg-[#0C111E] text-[#CBD5E1] hover:text-[#FFA028] border border-slate-800"
            }`}
          >
            All Diets
          </button>

          <button
            type="button"
            onClick={() => setDietaryFilter("veg")}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              dietaryFilter === "veg"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-[#0C111E] text-[#CBD5E1] hover:text-emerald-400 border border-slate-800"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Vegetarian
          </button>

          <button
            type="button"
            onClick={() => setDietaryFilter("non-veg")}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              dietaryFilter === "non-veg"
                ? "bg-red-700 text-white shadow-lg"
                : "bg-[#0C111E] text-[#CBD5E1] hover:text-red-400 border border-slate-800"
            }`}
          >
            <span className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-red-400" />
            Non-Veg
          </button>

          <button
            type="button"
            onClick={() => setDietaryFilter("vegan")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              dietaryFilter === "vegan"
                ? "bg-emerald-700 text-white font-bold"
                : "bg-[#16161D] text-[#C8C3B7] hover:text-emerald-400 border border-white/10"
            }`}
          >
            <Leaf className="w-3 h-3 text-emerald-400" />
            Vegan
          </button>

          <button
            type="button"
            onClick={() => setDietaryFilter("signature")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              dietaryFilter === "signature"
                ? "bg-[#D4AF37] text-[#0A0A0B] font-bold"
                : "bg-[#16161D] text-[#C8C3B7] hover:text-[#D4AF37] border border-white/10"
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            Chef Specials
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-4 mb-10 gap-2 border-b border-white/10 no-scrollbar justify-start sm:justify-center">
        {MENU_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2.5 whitespace-nowrap rounded-sm text-xs font-serif uppercase tracking-[0.16em] transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-[#D4AF37]/15 text-[#D4AF37] border-b-2 border-[#D4AF37] font-bold"
                : "text-[#A39E93] hover:text-[#F8F5EE] border-b-2 border-transparent"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Items Count & Dietary Indicator Notice */}
      <div className="flex items-center justify-between text-xs text-[#8E8A80] mb-6">
        <span>Showing {filteredItems.length} curated offerings</span>
        <span className="italic">Dishes freshly prepared to order in our artisanal kitchen</span>
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-lg bg-[#111116] border border-white/10 p-8">
          <p className="text-[#C8C3B7] font-serif text-lg">No dishes found matching your criteria.</p>
          <p className="text-xs text-[#8E8A80] mt-2">Try clearing your filters or search terms.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setDietaryFilter("all");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 rounded bg-[#D4AF37] text-[#0A0A0B] text-xs font-bold uppercase tracking-wider"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </Section>
  );
}
