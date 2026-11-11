"use client";

import React, { useState } from "react";
import { Loader } from "@/components/ui/Loader";
import { Nav } from "@/components/navigation/Nav";
import { MobileStickyBar } from "@/components/navigation/MobileStickyBar";
import { HeroSection } from "@/components/hero/HeroSection";
import { MenuPreviewSection } from "@/components/sections/MenuPreviewSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { StorySection } from "@/components/sections/StorySection";
import { BarSection } from "@/components/sections/BarSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { EventsSection } from "@/components/sections/EventsSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { VisitSection } from "@/components/sections/VisitSection";
import { InvitationSection } from "@/components/sections/InvitationSection";
import { Footer } from "@/components/navigation/Footer";
import { Modal } from "@/components/ui/Modal";
import { BookingForm } from "@/components/ui/BookingForm";
import { RESTAURANT_DATA } from "@/data/restaurant";

export default function HomePage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // JSON-LD structured data for Google Local Search & Restaurant SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "BarOrPub"],
    name: RESTAURANT_DATA.name,
    description: RESTAURANT_DATA.subTagline,
    url: "https://thestashhouse.in",
    telephone: RESTAURANT_DATA.contact.phone,
    priceRange: RESTAURANT_DATA.metrics.priceLevel,
    servesCuisine: [
      "North Indian",
      "Tandoori & Kebabs",
      "Continental",
      "Craft Cocktails",
      "Gastropub",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "First Floor, The Pentagon Mall, Sector 12, SIDCUL, BHEL Township",
      addressLocality: "Haridwar",
      addressRegion: "Uttarakhand",
      postalCode: "249403",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: RESTAURANT_DATA.coordinates.lat,
      longitude: RESTAURANT_DATA.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "11:00",
        closes: "23:30",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "1785",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      {/* JSON-LD Script tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Intro Reveal Loader (under 1.5s, skippable) */}
      <Loader />

      {/* Main Page Layout */}
      <div className="relative min-h-screen w-full bg-[#05070B] flex flex-col selection:bg-amber-500/30 selection:text-white overflow-x-hidden">
        {/* Navigation */}
        <Nav onOpenBookingModal={() => setIsBookingModalOpen(true)} />

        {/* 1. Hero Section (Chandelier dining room + Title + Working hours matching Image 2) */}
        <HeroSection onOpenBookingModal={() => setIsBookingModalOpen(true)} />

        {/* 2. "Taste the mood" / Our Menu Split Section with Concentric Circles (matching Image 2) */}
        <MenuPreviewSection onOpenBookingModal={() => setIsBookingModalOpen(true)} />

        {/* 3. The Three Pillars (Dine, Drink, Gather) */}
        <ExperienceSection />

        {/* 4. Story & Sanctuary (Pristine Chandelier Dining Visual + Heritage) */}
        <StorySection />

        {/* 5. Bar Showcase (The Craft Mixology Vault) */}
        <BarSection />

        {/* 6. Unwatermarked High-Res Gallery */}
        <GallerySection />

        {/* 7. Private Dining & Gatherings (10-60 Guests) */}
        <EventsSection onOpenBookingModal={() => setIsBookingModalOpen(true)} />

        {/* 8. Genuine Google Reviews (4.7 Rating) */}
        <ReviewsSection />

        {/* 9. Visit Us & Live Hours (Asia/Kolkata) */}
        <VisitSection />

        {/* 10. Invitation & Centered Monogram (matching Image 2) */}
        <InvitationSection onOpenBookingModal={() => setIsBookingModalOpen(true)} />

        {/* 11. Proper Comprehensive Luxury Footer */}
        <Footer />

        {/* Mobile Sticky Action Bar */}
        <MobileStickyBar onOpenBookingModal={() => setIsBookingModalOpen(true)} />

        {/* Table Reservation Modal */}
        <Modal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          title="Reserve a Table"
          subtitle="Direct table booking at The Stash House, Pentagon Mall, Haridwar."
          maxWidth="lg"
        >
          <BookingForm onSuccess={() => {}} />
        </Modal>
      </div>
    </>
  );
}
