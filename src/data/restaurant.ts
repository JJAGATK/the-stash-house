export interface RestaurantInfo {
  name: string;
  tagline: string;
  subTagline: string;
  category: string;
  address: {
    line1: string;
    mall: string;
    sector: string;
    township: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    full: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    email: string;
  };
  hours: {
    display: string;
    openHour: number; // 11 AM
    openMinute: number;
    closeHour: number; // 23 (11 PM)
    closeMinute: number; // 30 PM
    days: string;
  };
  metrics: {
    rating: number;
    reviewCount: number;
    priceLevel: string;
    costForTwo: string;
  };
  social: {
    instagram: string;
    instagramHandle: string;
    googleMaps: string;
  };
  capacity: {
    minParty: number;
    maxParty: number;
  };
  amenities: string[];
}

export const RESTAURANT_DATA: RestaurantInfo = {
  name: "The Stash House",
  tagline: "Haridwar's Hidden Gastropub & Culinary Sanctuary",
  subTagline: "A moody speakeasy atmosphere where artisanal culinary craftsmanship meets masterfully shaken cocktails and soulful evening lounge vibes.",
  category: "Gastropub, Cocktail Bar & Multi-Cuisine Lounge",
  address: {
    line1: "First Floor, Above McDonald's",
    mall: "The Pentagon Mall",
    sector: "Sector 12, Integrated Industrial Estate (IIE), SIDCUL",
    township: "BHEL Township",
    city: "Haridwar",
    state: "Uttarakhand",
    pincode: "249403",
    country: "India",
    full: "First Floor, The Pentagon Mall, Sector 12, SIDCUL, BHEL Township, Haridwar, Uttarakhand 249403, India",
  },
  coordinates: {
    lat: 29.9478821,
    lng: 78.0754687,
  },
  contact: {
    phone: "+918599000029",
    phoneDisplay: "+91 85990 00029",
    whatsapp: "918599000029",
    email: "contact@thestashhouse.in", // TODO: confirm official primary email
  },
  hours: {
    display: "11:00 AM – 11:30 PM",
    openHour: 11,
    openMinute: 0,
    closeHour: 23,
    closeMinute: 30,
    days: "Monday – Sunday (All 7 Days)",
  },
  metrics: {
    rating: 4.7,
    reviewCount: 1785,
    priceLevel: "₹₹",
    costForTwo: "₹1,000 – ₹1,500 (approx. for two)",
  },
  social: {
    instagram: "https://www.instagram.com/thestashbar",
    instagramHandle: "@thestashbar",
    googleMaps: "https://maps.app.goo.gl/J1yWmyjYiAJJGGS67",
  },
  capacity: {
    minParty: 10,
    maxParty: 60,
  },
  amenities: [
    "Full Premium Liquor Bar",
    "Handcrafted Signature Cocktails",
    "Artisanal Charcoal Tandoor",
    "Private Dining & Group Gatherings (10–60 Pax)",
    "Weekend Live Music & Acoustic Sets",
    "Mall Covered & Valet Parking",
    "High-Speed Guest Wi-Fi",
    "Dedicated Smoking Lounge",
  ],
};

/**
 * Check if the venue is currently open in Asia/Kolkata timezone
 */
export function getLiveVenueStatus(): { isOpen: boolean; statusText: string; timeUntilChange: string } {
  try {
    const now = new Date();
    // Convert to IST
    const istString = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const istDate = new Date(istString);
    
    const hours = istDate.getHours();
    const minutes = istDate.getMinutes();
    const currentMinutes = hours * 60 + minutes;

    const openMinutes = RESTAURANT_DATA.hours.openHour * 60 + RESTAURANT_DATA.hours.openMinute;
    const closeMinutes = RESTAURANT_DATA.hours.closeHour * 60 + RESTAURANT_DATA.hours.closeMinute;

    const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

    if (isOpen) {
      const remainingMinutes = closeMinutes - currentMinutes;
      const remHours = Math.floor(remainingMinutes / 60);
      const remMins = remainingMinutes % 60;
      return {
        isOpen: true,
        statusText: "Open Now",
        timeUntilChange: `Closes at 11:30 PM (in ${remHours > 0 ? `${remHours}h ` : ""}${remMins}m)`,
      };
    } else {
      let minsToOpen: number;
      if (currentMinutes < openMinutes) {
        minsToOpen = openMinutes - currentMinutes;
      } else {
        minsToOpen = (24 * 60 - currentMinutes) + openMinutes;
      }
      const remHours = Math.floor(minsToOpen / 60);
      const remMins = minsToOpen % 60;
      return {
        isOpen: false,
        statusText: "Closed",
        timeUntilChange: `Opens at 11:00 AM (${remHours > 0 ? `in ${remHours}h ` : ""}${remMins}m)`,
      };
    }
  } catch {
    return {
      isOpen: true,
      statusText: "Open Now",
      timeUntilChange: "11:00 AM – 11:30 PM Daily",
    };
  }
}
