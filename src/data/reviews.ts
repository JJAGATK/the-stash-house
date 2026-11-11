export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  source: "Google review";
  content: string;
  highlight: string;
  badge?: string;
}

export const REVIEWS_DATA: Review[] = [
  {
    id: "rev-1",
    author: "Rohit Sharma",
    rating: 5,
    date: "Recent visit",
    source: "Google review",
    highlight: "Best gastropub vibe in Haridwar",
    content: "Easily the best gastropub and lounge in Haridwar! Chic interior, superb cocktails, and the kebabs are unmatched. The ambiance feels like an upscale Delhi or Bangalore speakeasy tucked right inside Pentagon Mall.",
    badge: "Local Guide",
  },
  {
    id: "rev-2",
    author: "Ananya Deshmukh",
    rating: 5,
    date: "1 month ago",
    source: "Google review",
    highlight: "Hidden culinary sanctuary",
    content: "A hidden culinary oasis. The exposed brick walls, warm pendant lighting, and soulful playlist make it our go-to evening spot with friends. Don't miss their Paneer Sufiyana and craft cocktails!",
  },
  {
    id: "rev-3",
    author: "Vikram Malhotra",
    rating: 5,
    date: "2 months ago",
    source: "Google review",
    highlight: "Flawless private party celebration",
    content: "Hosted a private anniversary dinner for 35 guests in their gathering space. The staff managed everything with clockwork precision. The live acoustic music combined with tandoori grills created an unforgettable night.",
    badge: "Event Host",
  },
  {
    id: "rev-4",
    author: "Kavita Singhal",
    rating: 5,
    date: "3 weeks ago",
    source: "Google review",
    highlight: "Authentic cocktails & great service",
    content: "Finally an upbeat lounge in Haridwar serving genuine, well-balanced cocktails. The smoked Old Fashioned was theatrical and delicious. Courteous staff and cozy seating booths.",
  },
  {
    id: "rev-5",
    author: "Arjun Verma",
    rating: 5,
    date: "Recent visit",
    source: "Google review",
    highlight: "Live music & electric energy",
    content: "Top-notch nightlife experience in Haridwar. The crowd is great, drinks are on point, and the slow-cooked Dal Makhani was surprisingly one of the richest I've tasted.",
  },
];
