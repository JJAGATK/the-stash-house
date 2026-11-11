export type DietaryTag = "veg" | "non-veg" | "vegan" | "signature" | "alcoholic";

export interface MenuItem {
  id: string;
  name: string;
  category: "starters" | "mains" | "biryani" | "continental" | "desserts" | "cocktails" | "mocktails";
  description: string;
  dietary: DietaryTag[];
  price?: number; // Verified price if known; optional placeholder
  isChefSpecial?: boolean;
  ingredients?: string[];
  pairing?: string;
}

export const MENU_CATEGORIES = [
  { id: "all", label: "All Items" },
  { id: "starters", label: "Starters & Kebabs" },
  { id: "mains", label: "Mains & Curries" },
  { id: "biryani", label: "Biryani & Tandoor" },
  { id: "continental", label: "Wood-Fired & Pasta" },
  { id: "cocktails", label: "Craft Cocktails" },
  { id: "mocktails", label: "Zero-Proof Elixirs" },
  { id: "desserts", label: "Desserts" },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // --- STARTERS & KEBABS ---
  {
    id: "paneer-sufiyana",
    name: "Paneer Sufiyana Tikka",
    category: "starters",
    description: "Tender malai paneer cubes infused with ground fennel, hung yogurt, roasted gram flour, and green cardamom, gently charred in a clay tandoor.",
    dietary: ["veg", "signature"],
    ingredients: ["Fresh Paneer", "Fennel Pollen", "Hung Curd", "Cardamom"],
    isChefSpecial: true,
  },
  {
    id: "paneer-sarson",
    name: "Paneer Sarson Tikka",
    category: "starters",
    description: "Cottage cheese marinated in pungent yellow mustard paste, kasundi, and raw mango powder, grilled to golden perfection.",
    dietary: ["veg"],
    ingredients: ["Paneer", "Kasundi Mustard", "Mustard Oil", "Amchur"],
  },
  {
    id: "charred-galouti",
    name: "Smoked Mutton Galouti Kebabs",
    category: "starters",
    description: "Legendary melt-in-the-mouth minced lamb patties infused with potli masala, smoked with cloves, served on mini saffron sheermal.",
    dietary: ["non-veg", "signature"],
    ingredients: ["Finely Minced Lamb", "Potli Spices", "Ghee Smoke", "Saffron Sheermal"],
    isChefSpecial: true,
    pairing: "Pairs with The Stash Old Fashioned",
  },
  {
    id: "murgh-malai",
    name: "Murgh Malai Tikka",
    category: "starters",
    description: "Boneless chicken thighs steeped in cream cheese, white pepper, royal cumin, and green chili, charred lightly over hot embers.",
    dietary: ["non-veg"],
    ingredients: ["Chicken Thighs", "Processed Cheese", "Heavy Cream", "Green Cardamom"],
  },
  {
    id: "crispy-lotus",
    name: "Crispy Lotus Stem Honey Chilli",
    category: "starters",
    description: "Thinly sliced lotus root crisped golden and tossed in a sticky Kashmiri red chili, honey, toasted sesame, and scallion glaze.",
    dietary: ["veg", "vegan"],
    ingredients: ["Lotus Stem", "Wild Forest Honey", "Kashmiri Chili", "Toasted Sesame"],
  },
  {
    id: "prawn-cocktail",
    name: "The Stash Prawn Cocktail",
    category: "starters",
    description: "Poached bay prawns nestled on shredded iceberg lettuce, draped in house-churned cognac Marie Rose dressing and caper dust.",
    dietary: ["non-veg"],
    ingredients: ["Bay Prawns", "Cognac Marie Rose", "Iceberg", "Lemon Zest"],
  },
  {
    id: "artisan-garlic-bread",
    name: "Artisan Garlic & Herb Loaf",
    category: "starters",
    description: "Stone-baked artisan bread brushed generously with roasted garlic butter, parsley, and melted aged mozzarella.",
    dietary: ["veg"],
    ingredients: ["Sourdough", "Roasted Garlic", "Mozzarella", "Fresh Herbs"],
  },

  // --- MAINS & CURRIES ---
  {
    id: "stash-dal-makhani",
    name: "Stash House Slow-Cooked Dal Makhani",
    category: "mains",
    description: "Black urad lentils simmered overnight for 18 hours on charcoal embers with vine-ripened tomatoes, white churned butter, and cream.",
    dietary: ["veg", "signature"],
    ingredients: ["Black Urad Lentils", "Tomato Coulis", "White Butter", "Fenugreek Leaves"],
    isChefSpecial: true,
  },
  {
    id: "smoked-butter-chicken",
    name: "Smoked Butter Chicken",
    category: "mains",
    description: "Char-grilled boneless tandoori chicken simmered in an aromatic, velvety satin gravy of plum tomatoes, cashews, and dried fenugreek.",
    dietary: ["non-veg", "signature"],
    ingredients: ["Tandoori Chicken", "San Marzano Tomatoes", "Cashew Paste", "Kasuri Methi"],
    isChefSpecial: true,
  },
  {
    id: "grilled-salmon-lemon",
    name: "Pan-Seared Fish in Lemon Caper Butter",
    category: "mains",
    description: "Fresh fish fillet crisped skin-side down, resting on a bed of sautéed river asparagus, crushed baby potatoes, and a tangy lemon caper sauce.",
    dietary: ["non-veg", "signature"],
    ingredients: ["Fish Fillet", "Capers", "Dill Grass", "Lemon Glaze"],
    pairing: "Pairs with Himalayan Bramble",
  },
  {
    id: "paneer-lababdar",
    name: "Paneer Lababdar",
    category: "mains",
    description: "Cottage cheese cubes cooked in a coarse onion-tomato masala enriched with crushed paneer, melon seeds, and fragrant spices.",
    dietary: ["veg"],
    ingredients: ["Cottage Cheese", "Brown Onion Paste", "Melon Seeds", "Coriander Root"],
  },
  {
    id: "bhuna-gosht-rogan-josh",
    name: "Bhuna Gosht Rogan Josh",
    category: "mains",
    description: "Slow-braised spring lamb shanks in traditional Kashmiri gravy infused with rattan jot extract, dried ginger, and fennel seed powder.",
    dietary: ["non-veg"],
    ingredients: ["Spring Lamb", "Ratan Jot", "Sonth (Ginger)", "Kashmiri Mirch"],
  },

  // --- BIRYANI & TANDOOR ---
  {
    id: "awadhi-dum-biryani-chicken",
    name: "Awadhi Murgh Dum Biryani",
    category: "biryani",
    description: "Fragrant aged basmati rice layered with spiced chicken, caramelized onions, kewra water, and pure saffron milk, sealed with dough in a handi.",
    dietary: ["non-veg", "signature"],
    ingredients: ["Basmati Rice", "Tender Chicken", "Saffron", "Burani Garlic Raita"],
    isChefSpecial: true,
  },
  {
    id: "awadhi-dum-biryani-veg",
    name: "Nizami Subz Dum Biryani",
    category: "biryani",
    description: "Seasonal garden vegetables, water chestnuts, and paneer layered with fragrant long-grain rice and whole spices, slow-cooked in handi.",
    dietary: ["veg"],
    ingredients: ["Exotic Vegetables", "Paneer", "Mint Leaves", "Saffron Basmati"],
  },
  {
    id: "tasting-sizzler-platter",
    name: "The Grand Tandoori Sizzler",
    category: "biryani",
    description: "A show-stopping sizzling cast iron platter loaded with assortment of tikkas, kebabs, tandoori charred broccoli, and spiced butter naan.",
    dietary: ["signature"],
    ingredients: ["Chef's Assortment", "Charred Onions", "Mint Chutney", "Butter Naan"],
    isChefSpecial: true,
  },

  // --- WOOD-FIRED & CONTINENTAL ---
  {
    id: "wild-truffle-mushroom-pizza",
    name: "Truffle & Forest Mushroom Pizza",
    category: "continental",
    description: "Hand-stretched 48-hour fermented dough, roasted porcini and button mushrooms, mozzarella fior di latte, and white truffle oil drizzle.",
    dietary: ["veg", "signature"],
    ingredients: ["00 Flour Crust", "Porcini", "Fior di Latte", "White Truffle Oil"],
    isChefSpecial: true,
  },
  {
    id: "classic-margherita",
    name: "Classic Margherita Classico",
    category: "continental",
    description: "San Marzano tomato base, fresh buffalo mozzarella, virgin olive oil, and sweet garden basil leaves.",
    dietary: ["veg"],
    ingredients: ["Tomato Sauce", "Buffalo Mozzarella", "Fresh Basil", "EVOO"],
  },
  {
    id: "penne-vodka-rosa",
    name: "Penne All'Arrabbiata Rosa",
    category: "continental",
    description: "Bronze-die penne tossed with garlic, flamed vodka reduction, crushed San Marzano tomatoes, and a touch of mascarpone cream.",
    dietary: ["veg"],
    ingredients: ["Penne Rigate", "Chili Flakes", "Tomato Cream", "Vodka Splash"],
  },

  // --- CRAFT COCKTAILS ---
  {
    id: "stash-old-fashioned",
    name: "The Stash Smoked Old Fashioned",
    category: "cocktails",
    description: "Aged Kentucky bourbon whiskey, Angostura and orange bitters, raw demerara sugar syrup, infused with applewood smoke and flamed orange peel.",
    dietary: ["alcoholic", "signature"],
    ingredients: ["Bourbon Whiskey", "Angostura Bitters", "Applewood Smoke", "Orange Peel"],
    isChefSpecial: true,
  },
  {
    id: "haridwar-highball",
    name: "Haridwar Highball",
    category: "cocktails",
    description: "Botanical Indian craft gin, artisanal elderflower tonic, compressed cucumber ribbon, fresh rosemary sprig, and pink peppercorns.",
    dietary: ["alcoholic", "signature"],
    ingredients: ["Dry Gin", "Elderflower", "Tonic Water", "Cucumber Ribbon"],
    isChefSpecial: true,
  },
  {
    id: "himalayan-bramble",
    name: "Himalayan Blackberry Bramble",
    category: "cocktails",
    description: "London dry gin shaken with fresh lime juice and sugar, poured over crushed mountain ice and laced with crème de mûre blackberry liqueur.",
    dietary: ["alcoholic"],
    ingredients: ["Gin", "Crème de Mûre", "Fresh Lemon", "Crushed Ice"],
  },
  {
    id: "smoked-whiskey-sour",
    name: "Velvet Smoked Whiskey Sour",
    category: "cocktails",
    description: "Bourbon whiskey, freshly squeezed lemon juice, organic agave, aquafaba silky foam, crowned with aromatic bitter drops and cedar smoke.",
    dietary: ["alcoholic"],
    ingredients: ["Bourbon", "Fresh Lemon", "Silky Foam", "Aromatic Bitters"],
  },
  {
    id: "black-russian-reserve",
    name: "Black Russian Reserve",
    category: "cocktails",
    description: "Triple-distilled vodka stirred over hand-carved crystal ice with single-origin dark roast coffee liqueur and a twist of Meyer lemon peel.",
    dietary: ["alcoholic"],
    ingredients: ["Vodka", "Dark Roast Coffee Liqueur", "Crystal Ice Sphere"],
  },

  // --- ZERO-PROOF ELIXIRS ---
  {
    id: "spiced-jamun-cooler",
    name: "Spiced Jamun Fizz",
    category: "mocktails",
    description: "Wild blackberry/jamun nectar pressed with rock salt, toasted cumin, mint leaves, and sparkling spring soda.",
    dietary: ["veg", "vegan", "signature"],
    ingredients: ["Jamun Puree", "Rock Salt", "Roasted Cumin", "Soda"],
    isChefSpecial: true,
  },
  {
    id: "emerald-mint-spritz",
    name: "Emerald Basil & Cucumber Spritz",
    category: "mocktails",
    description: "Cold-pressed cucumber juice, sweet Italian basil, lime cordial, and effervescent ginger beer on the rocks.",
    dietary: ["veg", "vegan"],
    ingredients: ["Cucumber", "Fresh Basil", "Ginger Beer", "Lime Cordial"],
  },

  // --- DESSERTS ---
  {
    id: "belgian-dark-chocolate-mousse",
    name: "Belgian Dark Chocolate Mousse",
    category: "desserts",
    description: "70% Single-origin Callebaut dark chocolate mousse, hazelnut praline crumble, Maldon sea salt crystals, and raspberry reduction.",
    dietary: ["veg", "signature"],
    ingredients: ["70% Belgian Chocolate", "Hazelnut Praline", "Sea Salt", "Raspberry"],
    isChefSpecial: true,
  },
  {
    id: "sizzling-brownie-gelato",
    name: "Cast-Iron Sizzling Brownie",
    category: "desserts",
    description: "Gooey walnut dark chocolate fudge brownie served sizzling on a smoking cast iron skillet with Madagascar vanilla bean gelato and warm chocolate ganache.",
    dietary: ["veg"],
    ingredients: ["Walnut Fudge Brownie", "Vanilla Bean Gelato", "Dark Chocolate Sauce"],
  },
  {
    id: "gulab-jamun-cheesecake",
    name: "Baked Gulab Jamun Cheesecake",
    category: "desserts",
    description: "Silky Philadelphia cream cheese scented with green cardamom, encasing warm mini gulab jamuns on a pistachio crust.",
    dietary: ["veg"],
    ingredients: ["Cream Cheese", "Warm Gulab Jamun", "Pistachio Crust", "Rose Petals"],
  },
];
