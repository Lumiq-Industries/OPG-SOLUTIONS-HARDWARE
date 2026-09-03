export const site = {
  name: "OPG Solutions",
  tagline: "Building Better Together",
  headline: "Your one-stop solution for home, business & building projects",
  email: "info@opgsolutions.co.za",
  phones: ["082 941 5728", "072 212 8072", "060 928 1544"],
  location: "Phiphidi / Masakona, Limpopo, South Africa",
  whatsapp: "27829415728",
  website: "https://opgsolutions.co.za",
} as const;

export const valueProps = [
  { title: "Quality Products", subtitle: "You can rely on", icon: "star" },
  { title: "Great Prices", subtitle: "Everyday", icon: "tag" },
  { title: "Expert Advice", subtitle: "Friendly service", icon: "users" },
  { title: "Delivery Available", subtitle: "Fast & reliable", icon: "truck" },
] as const;

export const storeModel = {
  inStock: {
    title: "In Store — Always Available",
    description: "Fast-moving everyday items kept in stock for immediate purchase.",
    categories: ["Electrical", "Plumbing", "Paint & Consumables", "Hardware & Tools"],
  },
  onDemand: {
    title: "On Demand — We Order For You",
    description: "Large and specialised items chosen from samples and catalogues, then ordered for delivery.",
    categories: ["Tiles", "Bathroom Sets", "Building Materials", "Roofing", "Water Tanks", "Geysers"],
    steps: ["Samples", "Catalogues", "Quotation", "Order", "Delivery"],
  },
} as const;
