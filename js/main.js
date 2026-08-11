/* =========================================================
   HEAVEN BLESSED SHOP — PRODUCT CATALOGUE
   -------------------------------------------------------
   This is a DEMO / SAMPLE catalogue for a new store.
   These are not confirmed real stock items yet — prices and
   descriptions are introductory placeholders.

   HOW TO ADD OR EDIT A PRODUCT:
   1. Copy any object in the PRODUCTS array below.
   2. Give it a new unique "id".
   3. Edit name, category, price, oldPrice, description,
      features, images and rating.
   4. Save the file — the whole site updates automatically.

   HOW TO USE YOUR OWN IMAGES:
   - Save your photos inside: assets/images/products/
   - Replace the URL in the "images" array with the local
     path, e.g. "assets/images/products/bracelet-1.jpg"
   - Product images below currently point to two locations:
     a) real photos you supplied (hosted on ibb.co) for a
        few featured items
     b) clearly labelled placeholder images (placehold.co)
        for items that don't have real photos yet
   ========================================================= */

const PRODUCTS = [
  // ---------------- FASHION ACCESSORIES ----------------
  {
    id: "hb-001",
    name: "Minimalist Bracelet",
    category: "Fashion Accessories",
    price: 399,
    oldPrice: null,
    rating: 4.5,
    featured: true,
    isSampleImage: false,
    description: "A clean, everyday bracelet designed for simple, understated styling. Pairs easily with both casual and formal outfits.",
    features: [
      "Lightweight, comfortable fit",
      "Adjustable sizing",
      "Tarnish-resistant finish",
      "Suitable for daily wear"
    ],
    images: [
      "https://i.ibb.co/S4Jn2tvP/IMG-20260811-130413.jpg",
      "https://i.ibb.co/hxTLLmSc/IMG20260811131743.jpg"
    ]
  },
  {
    id: "hb-002",
    name: "Classic Fashion Watch",
    category: "Fashion Accessories",
    price: 999,
    oldPrice: 1399,
    rating: 4.6,
    featured: true,
    isSampleImage: false,
    description: "A timeless analog watch with a clean dial and comfortable strap — an easy addition to any everyday outfit.",
    features: [
      "Analog display",
      "Durable strap",
      "Everyday water resistance",
      "Classic round dial"
    ],
    images: [
      "https://i.ibb.co/hxTLLmSc/IMG20260811131743.jpg",
      "https://i.ibb.co/S4Jn2tvP/IMG-20260811-130413.jpg"
    ]
  },
  {
    id: "hb-003",
    name: "Elegant Sunglasses",
    category: "Fashion Accessories",
    price: 599,
    oldPrice: null,
    rating: 4.4,
    featured: true,
    isSampleImage: false,
    description: "Sleek, well-balanced sunglasses that add a polished finishing touch to any look, indoors or out.",
    features: [
      "UV protective lenses",
      "Lightweight frame",
      "Scratch-resistant coating",
      "Includes protective pouch"
    ],
    images: [
      "https://i.ibb.co/KptXXG8Q/IMG20260811131730.jpg",
      "https://i.ibb.co/S4Jn2tvP/IMG-20260811-130413.jpg"
    ]
  },
  {
    id: "hb-004",
    name: "Premium Wallet",
    category: "Fashion Accessories",
    price: 699,
    oldPrice: 899,
    rating: 4.3,
    featured: false,
    isSampleImage: true,
    description: "A slim, well-organised wallet with dedicated card slots and a note compartment, built for daily carry.",
    features: [
      "Multiple card slots",
      "Slim profile",
      "Sturdy stitching",
      "Compact daily-carry size"
    ],
    images: [ "https://placehold.co/700x700/EFE7D8/24433A?text=Premium+Wallet+%28Sample%29" ]
  },

  // ---------------- HOME & LIFESTYLE ----------------
  {
    id: "hb-005",
    name: "Decorative Table Lamp",
    category: "Home & Lifestyle",
    price: 899,
    oldPrice: 1199,
    rating: 4.5,
    featured: true,
    isSampleImage: true,
    description: "A warm, softly-lit table lamp that adds a cosy accent to any reading corner, bedside table or console.",
    features: [
      "Warm ambient lighting",
      "Sturdy base",
      "Compact tabletop size",
      "Easy to style anywhere"
    ],
    images: [ "https://placehold.co/700x700/EFE7D8/24433A?text=Table+Lamp+%28Sample%29" ]
  },
  {
    id: "hb-006",
    name: "Scented Candle Set",
    category: "Home & Lifestyle",
    price: 499,
    oldPrice: null,
    rating: 4.7,
    featured: true,
    isSampleImage: true,
    description: "A set of gently-scented candles designed to bring a calm, comforting atmosphere to any room.",
    features: [
      "Long, even burn time",
      "Set of multiple candles",
      "Soothing fragrance blend",
      "Great as a gift or for home"
    ],
    images: [ "https://placehold.co/700x700/EFE7D8/24433A?text=Candle+Set+%28Sample%29" ]
  },
  {
    id: "hb-007",
    name: "Minimalist Storage Organizer",
    category: "Home & Lifestyle",
    price: 599,
    oldPrice: null,
    rating: 4.2,
    featured: false,
    isSampleImage: true,
    description: "A tidy, foldable organizer that keeps everyday items in order — ideal for wardrobes, drawers or shelves.",
    features: [
      "Foldable, space-saving design",
      "Reinforced edges",
      "Easy to wipe clean",
      "Fits most drawers and shelves"
    ],
    images: [ "https://placehold.co/700x700/EFE7D8/24433A?text=Storage+Organizer+%28Sample%29" ]
  },
  {
    id: "hb-008",
    name: "Decorative Cushion Cover Set",
    category: "Home & Lifestyle",
    price: 549,
    oldPrice: 749,
    rating: 4.4,
    featured: false,
    isSampleImage: true,
    description: "A set of soft, well-finished cushion covers designed to refresh a sofa or bed in minutes.",
    features: [
      "Soft-touch fabric",
      "Set of multiple covers",
      "Hidden zip closure",
      "Machine washable"
    ],
    images: [ "https://placehold.co/700x700/EFE7D8/24433A?text=Cushion+Covers+%28Sample%29" ]
  },

  // ---------------- GIFTS ----------------
  {
    id: "hb-009",
    name: "Inspirational Gift Box",
    category: "Gifts",
    price: 799,
    oldPrice: null,
    rating: 4.6,
    featured: true,
    isSampleImage: true,
    description: "A thoughtfully arranged gift box designed to bring a little warmth and encouragement to someone's day.",
    features: [
      "Ready-to-gift packaging",
      "Curated small items",
      "Suitable for most occasions",
      "Compact, easy to send"
    ],
    images: [ "https://placehold.co/700x700/EFE7D8/24433A?text=Gift+Box+%28Sample%29" ]
  },
  {
    id: "hb-010",
    name: "Premium Gift Hamper",
    category: "Gifts",
    price: 1199,
    oldPrice: 1499,
    rating: 4.8,
    featured: true,
    isSampleImage: true,
    description: "A generous hamper of curated items, thoughtfully packaged for celebrations, festivals or special thank-yous.",
    features: [
      "Larger curated assortment",
      "Premium presentation box",
      "Great for festive occasions",
      "Ready to gift, no wrapping needed"
    ],
    images: [ "https://placehold.co/700x700/EFE7D8/24433A?text=Gift+Hamper+%28Sample%29" ]
  },
  {
    id: "hb-011",
    name: "Personalized Gift Set",
    category: "Gifts",
    price: 899,
    oldPrice: null,
    rating: 4.5,
    featured: false,
    isSampleImage: true,
    description: "A flexible gift set that can be paired with a personal note — a meaningful choice for birthdays and milestones.",
    features: [
      "Thoughtful item pairing",
      "Add-a-note friendly",
      "Neatly packaged",
      "Suitable for most ages"
    ],
    images: [ "https://placehold.co/700x700/EFE7D8/24433A?text=Gift+Set+%28Sample%29" ]
  },

  // ---------------- EVERYDAY ESSENTIALS ----------------
  {
    id: "hb-012",
    name: "Travel Organizer",
    category: "Everyday Essentials",
    price: 649,
    oldPrice: null,
    rating: 4.3,
    featured: false,
    isSampleImage: true,
    description: "A compact organizer that keeps cables, documents and small essentials sorted while travelling.",
    features: [
      "Multiple internal pockets",
      "Compact, packable size",
      "Durable zip closures",
      "Lightweight material"
    ],
    images: [ "https://placehold.co/700x700/EFE7D8/24433A?text=Travel+Organizer+%28Sample%29" ]
  },
  {
    id: "hb-013",
    name: "Compact Crossbody Bag",
    category: "Everyday Essentials",
    price: 799,
    oldPrice: 999,
    rating: 4.5,
    featured: true,
    isSampleImage: true,
    description: "A practical, well-sized crossbody bag for everyday outings — light enough for daily wear, roomy enough for essentials.",
    features: [
      "Adjustable strap",
      "Multiple compartments",
      "Everyday-friendly size",
      "Sturdy zip closure"
    ],
    images: [ "https://placehold.co/700x700/EFE7D8/24433A?text=Crossbody+Bag+%28Sample%29" ]
  },
  {
    id: "hb-014",
    name: "Reusable Water Bottle",
    category: "Everyday Essentials",
    price: 499,
    oldPrice: null,
    rating: 4.4,
    featured: false,
    isSampleImage: true,
    description: "A sturdy, leak-resistant reusable bottle designed for daily hydration at home, work or on the move.",
    features: [
      "Leak-resistant lid",
      "Easy-grip design",
      "Reusable, eco-friendly",
      "Easy to hand wash"
    ],
    images: [ "https://placehold.co/700x700/EFE7D8/24433A?text=Water+Bottle+%28Sample%29" ]
  }
];

/* Categories shown across the site — derived list with display icons */
const CATEGORIES = [
  { name: "Fashion Accessories", icon: "fa-gem" },
  { name: "Home & Lifestyle", icon: "fa-lightbulb" },
  { name: "Gifts", icon: "fa-gift" },
  { name: "Everyday Essentials", icon: "fa-bag-shopping" }
];
             
