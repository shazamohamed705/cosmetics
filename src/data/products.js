/**
 * products.js — Demo catalogue organised by category slug.
 *
 * Each product matches the ProductCard props shape:
 *   { id, name, brand, price, originalPrice, image, handle, badge, rating, reviews, category }
 *
 * `category` holds the navbar collection slug (e.g. "skincare").
 *
 * Replace with real API / CMS calls later — the Collection page reads from
 * here via getProductsBySlug(), so swapping the source is a one-file change.
 */

import { bestSellers, newArrivals } from "./home";

/* ─── Image pool — product-style Unsplash shots ─────────────────────────
   All images are tight product / flat-lay shots on white or neutral bg,
   matching the clean card look in the reference screenshot.
   ──────────────────────────────────────────────────────────────────────── */
const img = {
  /* Skincare — serums, creams, cleansers */
  s1:  "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80&auto=format&fit=crop",  // serum dropper on white
  s2:  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80&auto=format&fit=crop", // skincare bottles flat lay
  s3:  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80&auto=format&fit=crop", // cream jar neutral bg
  s4:  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80&auto=format&fit=crop", // skincare product row
  s5:  "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600&q=80&auto=format&fit=crop", // serum bottle
  s6:  "https://images.unsplash.com/photo-1631730486784-74757f140b97?w=600&q=80&auto=format&fit=crop", // moisturiser tube
  s7:  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80&auto=format&fit=crop",  // sunscreen / spf product
  s8:  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=600&q=80&auto=format&fit=crop", // serum vial
  s9:  "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80&auto=format&fit=crop", // cream jar close-up
  s10: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=600&q=80&auto=format&fit=crop", // skincare set
  s11: "https://images.unsplash.com/photo-1592136957897-b2b6ca21e10d?w=600&q=80&auto=format&fit=crop", // toner / essence
  s12: "https://images.unsplash.com/photo-1586495777744-4e6ffeef9306?w=600&q=80&auto=format&fit=crop", // face mask tube
  s13: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80&auto=format&fit=crop", // eye serum
  /* Fragrance */
  f1:  "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80&auto=format&fit=crop", // perfume bottle
  f2:  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80&auto=format&fit=crop", // parfum gold
  f3:  "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=600&q=80&auto=format&fit=crop", // fragrance flat lay
  f4:  "https://images.unsplash.com/photo-1526758097130-bab247274f58?w=600&q=80&auto=format&fit=crop", // cologne dark
  /* Hair */
  h1:  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80&auto=format&fit=crop", // hair oil
  h2:  "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&q=80&auto=format&fit=crop", // shampoo bottles
  h3:  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80&auto=format&fit=crop",  // hair serum
  /* Makeup */
  m1:  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80&auto=format&fit=crop", // makeup palette
  m2:  "https://images.unsplash.com/photo-1583241800698-e8ab01830a66?w=600&q=80&auto=format&fit=crop", // lipstick
  m3:  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80&auto=format&fit=crop", // mascara / brushes
  m4:  "https://images.unsplash.com/photo-1631214500004-0c5e6b1d1d52?w=600&q=80&auto=format&fit=crop", // foundation bottle
  /* Accessories */
  a1:  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80&auto=format&fit=crop", // brush set
  a2:  "https://images.unsplash.com/photo-1583241800698-e8ab01830a66?w=600&q=80&auto=format&fit=crop", // vanity / mirror
  a3:  "https://images.unsplash.com/photo-1574480843816-9cbf04eb869e?w=600&q=80&auto=format&fit=crop", // contact lens
  /* Bath & Body */
  b1:  "https://images.unsplash.com/photo-1583241475880-083f84372725?w=600&q=80&auto=format&fit=crop", // body lotion pump
  b2:  "https://images.unsplash.com/photo-1556228578-8b1b5e7a3b77?w=600&q=80&auto=format&fit=crop",  // body scrub
  b3:  "https://images.unsplash.com/photo-1613375463226-e1ad7d5ee2de?w=600&q=80&auto=format&fit=crop", // bath oil
  /* Health */
  hp1: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80&auto=format&fit=crop", // supplements
  hp2: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80&auto=format&fit=crop", // vitamins pills
  hp3: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&auto=format&fit=crop", // health capsules
};

/* ─── Helper to keep product rows compact ───────────────────────────────── */
function make(id, name, brand, price, originalPrice, handle, category, image, badge, rating, reviews) {
  return { id, name, brand, price, originalPrice, handle, category, image, badge, rating, reviews };
}

/* ─── Skincare ──────────────────────────────────────────────────────────── */
const skincare = [
  make("sk1",  "Vitamin C Brightening Face Serum 30ML",        "Mayysa",       89,  115, "vitamin-c-brightening-serum",        "skincare", img.s5,  "Best Seller", 4.9, 24),
  make("sk2",  "Hyaluronic Acid Deep Moisture Cream 50ML",      "Mayysa",       110, 145, "hyaluronic-acid-moisture-cream",     "skincare", img.s6,  null,          4.6, 18),
  make("sk3",  "Niacinamide 10% + Zinc 1% Serum 30ML",          "The Ordinary",  38,  55,  "niacinamide-zinc-serum",            "skincare", img.s8,  null,          4.5, 42),
  make("sk4",  "SPF 50+ Mineral Sunscreen Fluid 40ML",          "Bioderma",     72,  95,  "spf50-mineral-sunscreen",           "skincare", img.s7,  "Top Rated",   4.7, 31),
  make("sk5",  "Retinol 0.5% in Squalane Night Serum 30ML",     "The Ordinary",  65,  85,  "retinol-squalane-night-serum",      "skincare", img.s2,  "New",         4.4, 12),
  make("sk6",  "Centella Green Level Buffet Serum 50ML",        "Purito",       88,  110, "centella-green-buffet-serum",       "skincare", img.s13, "New",         4.3, 9),
  make("sk7",  "Barrier Restore Ceramide Moisturiser 60ML",     "CeraVe",       68,  90,  "ceramide-barrier-moisturiser",      "skincare", img.s11, "New",         4.5, 14),
  make("sk8",  "Gentle Foaming Cleanser 200ML",                 "Cetaphil",     42,  58,  "gentle-foaming-cleanser",           "skincare", img.s1,  null,          4.6, 27),
  make("sk9",  "PHA Exfoliating Toner 150ML",                   "The Ordinary",  48,  62,  "pha-exfoliating-toner",             "skincare", img.s4,  null,          4.2, 16),
  make("sk10", "Caffeine Eye Serum 30ML",                        "The Ordinary",  55,  70,  "caffeine-eye-serum",                "skincare", img.s9,  null,          4.4, 21),
  make("sk11", "Azelaic Acid 10% Brightening Cream 30ML",       "The Ordinary",  46,  60,  "azelaic-acid-cream",                "skincare", img.s10, null,          4.3, 11),
  make("sk12", "Squalane Hydrating Night Mask 75ML",             "Mayysa",       78,  99,  "squalane-hydrating-night-mask",     "skincare", img.s12, null,          4.7, 19),
];

/* ─── Hair Products ─────────────────────────────────────────────────────── */
const hairProducts = [
  make("hp1", "Scalp Revive Argan Hair Oil 100ML",             "Mayysa",       75,  98,  "scalp-revive-argan-oil",            "hair-products", img.h1,  "New",         4.5, 8),
  make("hp2", "Caffeine Stimulating Shampoo 300ML",            "Alpecin",      52,  68,  "caffeine-stimulating-shampoo",      "hair-products", img.h2,  null,          4.3, 15),
  make("hp3", "Argan Repair Conditioner 250ML",                "Garnier",      38,  49,  "argan-repair-conditioner",          "hair-products", img.h3,  null,          4.4, 22),
  make("hp4", "Keratin Smoothing Hair Mask 200ML",             "L'Oréal",      65,  82,  "keratin-smoothing-mask",            "hair-products", img.s6,  "Best Seller", 4.6, 17),
  make("hp5", "Rosemary Growth Scalp Serum 60ML",              "Mayysa",       89,  120, "rosemary-growth-scalp-serum",       "hair-products", img.s5,  null,          4.7, 26),
  make("hp6", "Coconut Nourishing Shampoo 400ML",              "Garnier",      32,  45,  "coconut-nourishing-shampoo",        "hair-products", img.h2,  null,          4.2, 31),
  make("hp7", "Biotin Volumising Conditioner 250ML",           "Neutrogena",   48,  63,  "biotin-volumising-conditioner",     "hair-products", img.s11, null,          4.3, 13),
  make("hp8", "Heat Protectant Spray 150ML",                   "L'Oréal",      42,  55,  "heat-protectant-spray",             "hair-products", img.h3,  null,          4.4, 19),
  make("hp9", "Scalp Detox Charcoal Scrub 150ML",              "Mayysa",       68,  88,  "scalp-detox-charcoal-scrub",        "hair-products", img.h1,  "New",         4.5, 7),
  make("hp10","Anti-Dandruff Treatment Shampoo 300ML",         "Neutrogena",   55,  72,  "anti-dandruff-shampoo",             "hair-products", img.h2,  null,          4.5, 28),
  make("hp11","Curl Defining Leave-In Cream 200ML",            "L'Oréal",      59,  78,  "curl-defining-leave-in-cream",      "hair-products", img.s12, null,          4.4, 12),
  make("hp12","Silk Protein Hair Serum 100ML",                 "Mayysa",       72,  95,  "silk-protein-hair-serum",           "hair-products", img.h3,  null,          4.6, 14),
];

/* ─── Health Care ──────────────────────────────────────────────────────── */
const healthCare = [
  make("hc1",  "Multi Collagen Powder 300G",              "Neutrogena",  120, 155, "multi-collagen-powder",       "health-care", img.hp1, "Best Seller", 4.6, 33),
  make("hc2",  "Vitamin D3 5000IU Capsules 90ct",         "Mayysa",       65,  85, "vitamin-d3-capsules",         "health-care", img.hp2, null,          4.7, 41),
  make("hc3",  "Omega-3 Fish Oil Softgels 1000mg 120ct",  "Nordic",       95, 125, "omega-3-fish-oil-softgels",   "health-care", img.hp3, null,          4.8, 52),
  make("hc4",  "Biotin 10,000mcg Hair & Nail 60ct",       "Mayysa",       48,  65, "biotin-hair-nail",            "health-care", img.hp2, null,          4.4, 23),
  make("hc5",  "Probiotic Complex 50 Billion 30ct",       "Nordic",      110, 145, "probiotic-complex",           "health-care", img.hp1, "Top Rated",   4.7, 29),
  make("hc6",  "Magnesium Glycinate 400mg 90ct",          "Mayysa",       72,  95, "magnesium-glycinate",         "health-care", img.hp3, null,          4.5, 18),
  make("hc7",  "Vitamin C 1000mg Effervescent 20ct",      "Garnier",      38,  52, "vitamin-c-effervescent",      "health-care", img.hp2, null,          4.3, 35),
  make("hc8",  "Zinc Immune Support 50mg 100ct",          "Nordic",       45,  60, "zinc-immune-support",         "health-care", img.hp1, null,          4.4, 19),
  make("hc9",  "Iron + Folic Acid Tablets 60ct",          "Mayysa",       58,  78, "iron-folic-acid-tablets",     "health-care", img.hp3, "New",         4.5, 11),
  make("hc10", "Ashwagandha Stress Relief 90ct",          "Nordic",       98, 130, "ashwagandha-stress-relief",   "health-care", img.hp2, null,          4.6, 24),
  make("hc11", "Melatonin Sleep Aid 10mg 60ct",           "Mayysa",       42,  58, "melatonin-sleep-aid",         "health-care", img.hp1, null,          4.3, 16),
  make("hc12", "Women's Daily Multivitamin 120ct",        "Nordic",       85, 112, "womens-daily-multivitamin",   "health-care", img.hp3, null,          4.7, 38),
];

/* ─── Bath & Body Care ─────────────────────────────────────────────────── */
const bathBodyCare = [
  make("bb1",  "Jasmine & Vanilla Glow Body Lotion 250ML",  "Mayysa",      55,  75, "jasmine-vanilla-body-lotion",  "bath-body-care", img.b1,  "New",         4.6, 14),
  make("bb2",  "Shea Butter Nourishing Body Cream 200ML",   "L'Oréal",     48,  65, "shea-butter-body-cream",       "bath-body-care", img.b1,  null,          4.5, 21),
  make("bb3",  "Coconut Milk Body Wash 500ML",              "Garnier",     32,  45, "coconut-milk-body-wash",       "bath-body-care", img.b3,  null,          4.3, 18),
  make("bb4",  "Brown Sugar Body Scrub 250ML",              "Mayysa",      62,  82, "brown-sugar-body-scrub",       "bath-body-care", img.b2,  "Best Seller", 4.7, 27),
  make("bb5",  "Glycerin Hand Cream 100ML",                 "Neutrogena",  28,  40, "glycerin-hand-cream",          "bath-body-care", img.b1,  null,          4.4, 33),
  make("bb6",  "Eucalyptus Relaxing Bath Oil 200ML",        "Mayysa",      45,  62, "eucalyptus-bath-oil",          "bath-body-care", img.b3,  null,          4.5, 9),
  make("bb7",  "Oatmeal Soothing Body Wash 400ML",          "Cetaphil",    38,  52, "oatmeal-body-wash",            "bath-body-care", img.b3,  null,          4.6, 24),
  make("bb8",  "Hyaluronic Body Serum 200ML",               "CeraVe",      72,  95, "hyaluronic-body-serum",        "bath-body-care", img.s5,  null,          4.5, 12),
  make("bb9",  "Argan Moisture Body Lotion 400ML",          "Garnier",     42,  58, "argan-moisture-body-lotion",   "bath-body-care", img.b1,  null,          4.2, 19),
  make("bb10", "Salicylic Body Spray Exfoliator 150ML",     "CeraVe",      58,  78, "salicylic-body-spray",         "bath-body-care", img.b3,  "New",         4.4, 8),
  make("bb11", "Rose Scented Hand Sanitiser 250ML",         "Mayysa",      22,  35, "rose-hand-sanitiser",          "bath-body-care", img.b1,  null,          4.1, 16),
  make("bb12", "Lavender Night Recovery Body Oil 150ML",    "L'Oréal",     78, 102, "lavender-night-body-oil",      "bath-body-care", img.b3,  null,          4.6, 13),
];

/* ─── Fragrance ────────────────────────────────────────────────────────── */
const fragrance = [
  make("fr1",  "Oud & Rose Eau de Parfum 50ML",           "Mayysa",      195, 240, "oud-rose-eau-de-parfum",      "fragrance", img.f1, "New",         4.8, 11),
  make("fr2",  "Jasmine Noir Eau de Toilette 75ML",        "L'Oréal",     165, 210, "jasmine-noir-edt",            "fragrance", img.f2, null,          4.6, 18),
  make("fr3",  "Amber Velvet Extrait 30ML",                "Mayysa",      220, 280, "amber-velvet-extrait",        "fragrance", img.f1, "Best Seller", 4.9, 23),
  make("fr4",  "Citrus Bloom Body Mist 150ML",             "Garnier",      48,  68, "citrus-bloom-body-mist",      "fragrance", img.f3, null,          4.3, 14),
  make("fr5",  "Vanilla Sandalwood EDP 50ML",              "Mayysa",      175, 225, "vanilla-sandalwood-edp",      "fragrance", img.f2, null,          4.7, 19),
  make("fr6",  "White Musk Perfume Oil 30ML",              "The Ordinary",  85, 110, "white-musk-perfume-oil",     "fragrance", img.f1, null,          4.5, 27),
  make("fr7",  "Bergamot & Cedar Cologne 100ML",           "Neutrogena",  120, 155, "bergamot-cedar-cologne",      "fragrance", img.f4, null,          4.4, 9),
  make("fr8",  "Rose Petal Hair Perfume 50ML",             "Mayysa",       55,  75, "rose-petal-hair-perfume",     "fragrance", img.f3, "New",         4.6, 7),
  make("fr9",  "Saffron Gold Eau de Parfum 75ML",          "Mayysa",      240, 300, "saffron-gold-edp",            "fragrance", img.f2, "Top Rated",   4.9, 15),
  make("fr10", "Lotus & Lily Room Spray 200ML",            "Mayysa",       42,  58, "lotus-lily-room-spray",       "fragrance", img.f3, null,          4.2, 12),
  make("fr11", "Patchouli Noir Intense 50ML",              "Mayysa",      210, 265, "patchouli-noir-intense",      "fragrance", img.f4, null,          4.7, 10),
  make("fr12", "Coconut Beach Body Mist 150ML",            "Garnier",      38,  55, "coconut-beach-body-mist",     "fragrance", img.f3, null,          4.3, 21),
];

/* ─── Makeup ───────────────────────────────────────────────────────────── */
const makeup = [
  make("mk1",  "24H Matte Liquid Foundation 30ML",        "L'Oréal",     78,  98, "matte-liquid-foundation",         "makeup", img.m4, "Best Seller", 4.6, 34),
  make("mk2",  "Velvet Matte Lipstick — Rosewood",         "Mayysa",      45,  62, "velvet-matte-lipstick-rosewood",  "makeup", img.m2, null,          4.7, 28),
  make("mk3",  "Volume Boost Mascara Black 10ML",          "L'Oréal",     52,  68, "volume-boost-mascara",            "makeup", img.m3, null,          4.5, 41),
  make("mk4",  "Nude Palette Eyeshadow 12 Shades",         "Mayysa",      95, 125, "nude-palette-eyeshadow",          "makeup", img.m1, "Top Rated",   4.8, 22),
  make("mk5",  "Silk Glow Blush — Peach 8G",               "Mayysa",      38,  52, "silk-glow-blush-peach",           "makeup", img.m1, null,          4.4, 17),
  make("mk6",  "Hydrating Primer 30ML",                    "Garnier",     62,  82, "hydrating-primer",                "makeup", img.m4, null,          4.3, 13),
  make("mk7",  "Long-Lasting Eyeliner Pen Black",          "L'Oréal",     35,  48, "long-lasting-eyeliner-pen",       "makeup", img.m3, null,          4.6, 29),
  make("mk8",  "Brow Define Pencil — Soft Brown",          "Mayysa",      28,  40, "brow-define-pencil",              "makeup", img.m3, null,          4.5, 19),
  make("mk9",  "Dewy Setting Spray 100ML",                 "Mayysa",      48,  65, "dewy-setting-spray",             "makeup", img.m4, "New",         4.4, 8),
  make("mk10", "Kohl Waterproof Eyeliner — Black",         "Mayysa",      25,  38, "kohl-waterproof-eyeliner",        "makeup", img.m3, null,          4.3, 24),
  make("mk11", "Radiant Concealer — Medium 10ML",          "L'Oréal",     42,  58, "radiant-concealer-medium",        "makeup", img.m4, null,          4.5, 31),
  make("mk12", "Luminous Highlighter Stick 6G",            "Mayysa",      52,  70, "luminous-highlighter-stick",      "makeup", img.m2, null,          4.6, 15),
];

/* ─── Accessories & Lenses ────────────────────────────────────────────── */
const accessoriesLenses = [
  make("ac1",  "12-Piece Pro Makeup Brush Set",               "Mayysa",     85,  120, "pro-makeup-brush-set",           "accessories-lenses", img.a1, "Best Seller", 4.7, 26),
  make("ac2",  "LED Lighted Vanity Mirror",                   "Mayysa",    145,  185, "led-vanity-mirror",               "accessories-lenses", img.a2, null,          4.6, 19),
  make("ac3",  "Daily Colour Contact Lenses — Hazel 30P",     "ClearVue",   65,   88, "daily-hazel-contact-lenses",      "accessories-lenses", img.a3, "New",         4.5, 14),
  make("ac4",  "Reusable Silicone Beauty Blender",            "Mayysa",     22,   35, "silicone-beauty-blender",         "accessories-lenses", img.m3, null,          4.2, 23),
  make("ac5",  "Acrylic Makeup Organiser Box",                "Mayysa",     78,  102, "acrylic-makeup-organiser",        "accessories-lenses", img.a2, null,          4.6, 17),
  make("ac6",  "Monthly Colour Contact Lenses — Grey 2P",     "ClearVue",   48,   65, "monthly-grey-contact-lenses",     "accessories-lenses", img.a3, null,          4.4, 11),
  make("ac7",  "Tweezer & Brow Scissor Grooming Kit",         "Mayysa",     38,   52, "tweezer-brow-grooming-kit",       "accessories-lenses", img.a1, null,          4.5, 18),
  make("ac8",  "Travel Makeup Train Case",                    "Mayysa",    110,  145, "travel-makeup-train-case",        "accessories-lenses", img.a2, null,          4.7, 9),
  make("ac9",  "Daily Colour Contact Lenses — Blue 30P",      "ClearVue",   65,   88, "daily-blue-contact-lenses",       "accessories-lenses", img.a3, "New",         4.4, 8),
  make("ac10", "Stainless Steel Eyelash Curler",               "Mayysa",    28,   42, "stainless-eyelash-curler",        "accessories-lenses", img.m3, null,          4.5, 21),
];

/* ─── Flat catalogue keyed by slug ─────────────────────────────────────── */
const catalogue = {
  "skincare":            skincare,
  "hair-products":       hairProducts,
  "health-care":         healthCare,
  "bath-body-care":      bathBodyCare,
  "fragrance":           fragrance,
  "makeup":              makeup,
  "accessories-lenses":  accessoriesLenses,
  // alias so FeaturedCategories "accessories" link also resolves
  "accessories":         accessoriesLenses,
};

/* ─── Display metadata per collection slug ─────────────────────────────── */
export const collectionMeta = {
  "skincare": {
    name: "Skincare",
    description: "Cleansers, serums, moisturisers and SPF — everything your routine needs.",
  },
  "hair-products": {
    name: "Hair Products",
    description: "Shampoos, treatments and oils for healthier, stronger hair.",
  },
  "health-care": {
    name: "Health Care",
    description: "Vitamins, supplements and wellness essentials to support you daily.",
  },
  "bath-body-care": {
    name: "Bath & Body Care",
    description: "Nourish from neck to toe with lotions, washes and scrubs.",
  },
  "fragrance": {
    name: "Fragrance",
    description: "Discover your signature scent from our curated edit of perfumes.",
  },
  "makeup": {
    name: "Makeup",
    description: "Face, eyes and lips — high-performance colour for every look.",
  },
  "accessories-lenses": {
    name: "Accessories & Lenses",
    description: "Brushes, mirrors, tools and colour contact lenses.",
  },
  "accessories": {
    name: "Accessories & Lenses",
    description: "Brushes, mirrors, tools and colour contact lenses.",
  },
  "best-sellers": {
    name: "Best Sellers",
    description: "The products our customers can't stop re-ordering.",
  },
  "new-arrivals": {
    name: "New Arrivals",
    description: "Fresh picks just landed in our store.",
  },
  "sale": {
    name: "On Sale",
    description: "Limited-time savings across the store.",
  },
};

/* ─── All products flattened (used for "all" + sale) ───────────────────── */
// Deduped by `handle` so a product that exists in both a category array and
// the home demo ranges (bestSellers / newArrivals) only appears once.
const seen = new Set();
export const allProducts = [
  ...skincare,
  ...hairProducts,
  ...healthCare,
  ...bathBodyCare,
  ...fragrance,
  ...makeup,
  ...accessoriesLenses,
  // also surface the home-page demo ranges so they show on sale / all views
  ...bestSellers,
  ...newArrivals,
].filter((p) => (seen.has(p.handle) ? false : (seen.add(p.handle), true)));

/**
 * Resolve which products belong to a collection slug.
 * Handles the navbar category slugs plus the special collections
 * (best-sellers, new-arrivals, sale) used by the home page CTAs.
 *
 * @param {string} slug  — collection slug from the route param
 * @returns {Product[]}
 */
export function getProductsBySlug(slug) {
  if (!slug) return allProducts;

  // Sub-category slug (e.g. "skincare/serums") — filter the parent catalogue
  // by matching the sub key in the product's subCategory field, or fall back
  // to just showing all products in the parent category.
  if (slug.includes("/")) {
    const [parent, sub] = slug.split("/");
    const parentProducts = catalogue[parent] ?? [];
    if (parentProducts.length === 0) return [];
    // Filter by subCategory if products carry that field; otherwise return parent
    const filtered = parentProducts.filter((p) => p.subCategory === sub);
    return filtered.length > 0 ? filtered : parentProducts;
  }

  switch (slug) {
    case "best-sellers":
      return bestSellers;
    case "new-arrivals":
      return newArrivals;
    case "sale":
      return allProducts.filter((p) => p.originalPrice && p.originalPrice > p.price);
    default:
      return catalogue[slug] ?? [];
  }
}

/**
 * Resolve display metadata for a collection slug, with a sensible fallback
 * that title-cases the slug when no curated entry exists.
 *
 * @param {string} slug
 * @returns {{ name: string, description: string }}
 */
export function getCollectionMeta(slug) {
  if (!slug) return { name: "All Products", description: "" };

  if (collectionMeta[slug]) return collectionMeta[slug];

  // Sub-category: build a friendly name from "parent/sub"
  if (slug.includes("/")) {
    const [, sub] = slug.split("/");
    const name = sub.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return { name, description: "Browse our curated selection." };
  }

  const fallbackName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return { name: fallbackName, description: "Browse our curated selection." };
}
