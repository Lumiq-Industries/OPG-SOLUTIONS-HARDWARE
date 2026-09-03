import catalogData from "@/data/products-catalog.json";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  categorySlug: string;
  tags: string[];
  image: string;
  images?: string[];
  badge?: string;
  availability: "in-stock" | "on-demand";
  rating: number;
  reviewCount: number;
  sku: string;
  storeUrl?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  availability: "in-stock" | "on-demand" | "mixed";
  highlights: string[];
}

const opg = (path: string) => `https://opgsolutions.co.za/wp-content/uploads/${path}`;
const unsplash = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;

export const categories: Category[] = [
  {
    id: "electrical",
    slug: "electrical",
    name: "Electrical",
    description: "LED bulbs, switches, sockets, conduit and everyday electrical essentials.",
    icon: "zap",
    image: unsplash("photo-1621905251189-08b45d6a269e"),
    availability: "in-stock",
    highlights: ["LED Bulbs", "Switches & Sockets", "Extension Leads", "Conduit Fittings"],
  },
  {
    id: "plumbing",
    slug: "plumbing",
    name: "Plumbing",
    description: "PVC pipes, taps, valves, hoses and repair parts for every job.",
    icon: "droplets",
    image: opg("2025/02/sub-banner-1-1.jpg"),
    availability: "in-stock",
    highlights: ["PVC Pipes & Fittings", "Taps & Valves", "Toilet Repair Parts", "Silicone & PTFE"],
  },
  {
    id: "paint",
    slug: "paint",
    name: "Paint & Consumables",
    description: "Interior and exterior paint, rollers, brushes and surface preparation.",
    icon: "paintbrush",
    image: unsplash("photo-1589939705384-5185137a7f0f"),
    availability: "in-stock",
    highlights: ["Interior & Exterior Paint", "PVA & Enamel", "Brushes & Rollers", "Waterproofing"],
  },
  {
    id: "hardware",
    slug: "hardware-tools",
    name: "Hardware & Tools",
    description: "Nails, screws, hinges, hand tools and power tools for home and trade.",
    icon: "wrench",
    image: opg("2025/11/18-V-Drill-Kit.png"),
    availability: "in-stock",
    highlights: ["Nails & Screws", "Door Handles", "Basic Hand Tools", "Measuring Tapes"],
  },
  {
    id: "tiles",
    slug: "tiles-bathrooms",
    name: "Tiles & Bathrooms",
    description: "Floor and wall tiles, vanities, toilets and complete bathroom solutions.",
    icon: "grid",
    image: opg("2026/01/IMG_4710.jpg"),
    availability: "on-demand",
    highlights: ["Floor & Wall Tiles", "Bathroom Vanities", "Toilets & Basins", "Showroom Samples"],
  },
  {
    id: "building",
    slug: "building-materials",
    name: "Building Materials",
    description: "Cement, bricks, roofing, water tanks and structural supplies.",
    icon: "layers",
    image: opg("2025/02/main-banner-1.jpg"),
    availability: "on-demand",
    highlights: ["Cement & Aggregates", "Bricks & Blocks", "Roofing", "Water Tanks"],
  },
];

const productEnhancements: Record<string, Partial<Product>> = {
  "18v-drill-kit": {
    badge: "Best Seller",
    rating: 4.8,
    storeUrl: "https://opgsolutions.co.za/product/18-v-drill-kit/",
  },
  "46-piece-bit-set": {
    rating: 4.6,
    storeUrl: "https://opgsolutions.co.za/product/46%e2%80%91piece-bit-set/",
  },
  "hardbody-matt-ceramics-floor-tile-600-600": {
    badge: "New Arrival",
    rating: 4.9,
    longDescription:
      "The Hardbody Matt Ceramics Floor Tile is a high-quality, durable flooring solution designed for both residential and commercial use. Manufactured in a standard 600 × 600 mm format, this tile offers a clean, modern aesthetic suitable for retail environments, offices, living areas, and kitchens. Each box covers 1.44 square metres.",
    images: [
      opg("2026/01/IMG_4710.jpg"),
      opg("2026/01/IMG_4711.jpg"),
      opg("2026/01/IMG_4712.jpg"),
      opg("2026/01/IMG_4713.jpg"),
      opg("2026/01/IMG_4714-1.jpg"),
      opg("2026/01/IMG_4715.jpg"),
    ],
    storeUrl: "https://opgsolutions.co.za/product/hardbody-matt-ceramics/",
  },
  "hardbody-glazed-ceramics-floor-tile-600-600": {
    rating: 4.7,
    longDescription:
      "The Hard Body Glazed Ceramics Floor Tile is a high-quality, durable flooring solution designed for both residential and commercial spaces. Manufactured in a standard 600 × 600 mm format with refined glazed finish.",
    images: [
      opg("2026/01/IMG_4700.jpg"),
      opg("2026/01/IMG_4699-2.jpg"),
      opg("2026/01/IMG_4702.jpg"),
      opg("2026/01/IMG_4703.jpg"),
      opg("2026/01/IMG_4706.jpg"),
      opg("2026/01/IMG_4707.jpg"),
      opg("2026/01/IMG_4709.jpg"),
    ],
    storeUrl:
      "https://opgsolutions.co.za/product/opg-porcelain-hard-body-glazed-ceramic-floor-tile-600-x-600/",
  },
};

export const products: Product[] = (catalogData as Product[]).map((product) => ({
  ...product,
  ...productEnhancements[product.slug],
  images: productEnhancements[product.slug]?.images ?? product.images,
}));

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.categorySlug === slug);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getFeaturedProducts() {
  const priority = [
    "18v-drill-kit",
    "46-piece-bit-set",
    "hardbody-matt-ceramics-floor-tile-600-600",
    "hardbody-glazed-ceramics-floor-tile-600-600",
    "heavy-duty-10m-extension-lead",
    "mega-safety-boot-steel-toe-cap",
    "25l-plastic-polycan",
    "mastercraft-metric-tool-set-147-piece",
  ];
  const picked = priority
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as Product[];
  return picked.length >= 8 ? picked : products.slice(0, 8);
}

export function getInStockProducts() {
  return products.filter((p) => p.availability === "in-stock");
}

export function getOnDemandProducts() {
  return products.filter((p) => p.availability === "on-demand");
}

const CATALOG_SUMMARY = products
  .map(
    (p) =>
      `[${p.id}] ${p.name}${p.price ? ` (R${p.price})` : " (Quote on request)"} — ${p.description}. Category: ${p.category}. Availability: ${p.availability}.`
  )
  .join("\n");

export const CLAUDE_CATALOG = CATALOG_SUMMARY;

export const CATEGORY_SUMMARY = categories
  .map((c) => `${c.name}: ${c.description} (${c.availability})`)
  .join("\n");
