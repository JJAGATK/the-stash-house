export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: "interior" | "bar" | "food" | "gatherings";
  aspectRatio?: "square" | "wide" | "tall";
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    src: "/images/luxury/bar-shelves-ambience.jpg",
    alt: "The Stash House illuminated bar counter with glowing Edison bulbs and dark wooden shelves",
    title: "Illuminated Bar Counter",
    category: "bar",
    aspectRatio: "wide",
  },
  {
    id: "gal-2",
    src: "/images/luxury/cocktail-smoked-old-fashioned.jpg",
    alt: "Signature barrel-smoked craft cocktail in crystal rocks glass with flamed orange peel",
    title: "Smoked Old Fashioned",
    category: "bar",
    aspectRatio: "square",
  },
  {
    id: "gal-3",
    src: "/images/luxury/tandoori-grilled-kebabs.jpg",
    alt: "Authentic slow-smoked charcoal tandoori kebabs with mint chutney and roasted vegetables",
    title: "Smoked Charcoal Kebabs",
    category: "food",
    aspectRatio: "tall",
  },
  {
    id: "gal-4",
    src: "/images/luxury/luxury-intimate-booth.jpg",
    alt: "Intimate candlelit dining table with crystal wine glasses and warm amber ambient light",
    title: "Candlelit Dining Booth",
    category: "interior",
    aspectRatio: "wide",
  },
  {
    id: "gal-5",
    src: "/images/luxury/luxury-entrance-glow.jpg",
    alt: "Lounge bar counter with back-lit single malts and craft botanicals",
    title: "The Spirits Vault",
    category: "bar",
    aspectRatio: "tall",
  },
  {
    id: "gal-6",
    src: "/images/luxury/gourmet-signature-dish.jpg",
    alt: "Pan-seared artisanal cut with fresh rosemary, citrus, and crispy parmesan fries",
    title: "Chef's Artisanal Grill",
    category: "food",
    aspectRatio: "wide",
  },
  {
    id: "gal-7",
    src: "/images/luxury/letterbox-dining-room.jpg",
    alt: "Spacious contemporary dining hall with plush leather booths at The Pentagon Mall",
    title: "Main Lounge Hall",
    category: "interior",
    aspectRatio: "wide",
  },
  {
    id: "gal-8",
    src: "/images/luxury/luxury-woodfired-pizza.jpg",
    alt: "Crisp artisanal wood-fired pizza with buffalo mozzarella and fresh herbs",
    title: "Wood-Fired Pizza",
    category: "food",
    aspectRatio: "square",
  },
  {
    id: "gal-9",
    src: "/images/luxury/luxury-biryani-feast.jpg",
    alt: "Royal Awadhi Dum Biryani served in traditional copper handi with fried onions",
    title: "Awadhi Dum Biryani",
    category: "food",
    aspectRatio: "square",
  },
  {
    id: "gal-10",
    src: "/images/luxury/luxury-dessert-mousse.jpg",
    alt: "Decadent dark Belgian chocolate mousse cake with rich chocolate glaze",
    title: "Belgian Chocolate Decadence",
    category: "food",
    aspectRatio: "square",
  },
  {
    id: "gal-11",
    src: "/images/luxury/private-gathering-table.jpg",
    alt: "Dedicated steward service preparing gourmet courses for private dining gatherings",
    title: "Private Dining Suite",
    category: "gatherings",
    aspectRatio: "wide",
  },
  {
    id: "gal-12",
    src: "/images/luxury/luxury-wine-pour.jpg",
    alt: "Sommelier wine and craft pour ritual over crystal glassware",
    title: "Sommelier Reserve Pour",
    category: "bar",
    aspectRatio: "tall",
  },
];
