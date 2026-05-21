export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  features: string[];
  specs: { [key: string]: string };
  brand?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Aurelius Oak Sideboard",
    price: 1250,
    category: "Artisanal",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1000",
    description: "A masterpiece of mid-century design, handcrafted from sustainably sourced white oak with artisanal joinery.",
    features: ["Soft-close drawers", "Adjustable shelving", "Hand-rubbed oil finish"],
    specs: { "Material": "Solid Oak", "Dimensions": "72\"W x 18\"D x 30\"H", "Weight": "120 lbs" }
  },
  {
    id: 2,
    name: "Minimalist Cloud Sofa",
    price: 2400,
    category: "Modern",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000",
    description: "Experience weightless comfort with our modular cloud sofa, upholstered in premium performance linen.",
    features: ["Modular design", "Stain-resistant fabric", "Down-wrapped cushions"],
    specs: { "Material": "Linen Blend", "Dimensions": "110\"W x 40\"D x 32\"H", "Weight": "250 lbs" }
  },
  {
    id: 3,
    name: "Zenith Glass Coffee Table",
    price: 850,
    category: "Minimalist",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000",
    description: "A sculptural centerpiece featuring tempered glass and a precision-engineered steel base.",
    features: ["Tempered safety glass", "Architectural base", "Easy maintenance"],
    specs: { "Material": "Glass & Steel", "Dimensions": "42\" Diameter x 16\"H", "Weight": "85 lbs" }
  },
  {
    id: 4,
    name: "Heritage Leather Armchair",
    price: 1600,
    category: "Vintage",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000",
    description: "Full-grain Italian leather that develops a beautiful patina over time, set on solid walnut legs.",
    features: ["Top-grain leather", "Walnut frame", "Ergonomic support"],
    specs: { "Material": "Walnut & Leather", "Dimensions": "32\"W x 34\"D x 36\"H", "Weight": "60 lbs" }
  },
  {
    id: 5,
    name: "Lumière Floor Lamp",
    price: 450,
    category: "Modern",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed657f992a?auto=format&fit=crop&q=80&w=1000",
    description: "An elegant arc of brushed brass providing warm, atmospheric lighting for any contemporary living space.",
    features: ["Adjustable brightness", "Marble base", "LED integrated"],
    specs: { "Material": "Brass & Marble", "Dimensions": "18\"W x 72\"H", "Weight": "35 lbs" }
  },
  {
    id: 6,
    name: "Boreal Dining Set",
    price: 3200,
    category: "Artisanal",
    image: "https://images.unsplash.com/photo-1617806118233-18e16737a798?auto=format&fit=crop&q=80&w=1000",
    description: "A grand dining table with matching benches, celebrating the raw beauty of live-edge walnut.",
    features: ["Live-edge finish", "Seats 8 comfortably", "Custom iron legs"],
    specs: { "Material": "Live Edge Walnut", "Dimensions": "96\"W x 40\"D x 30\"H", "Weight": "300 lbs" }
  },
  {
    id: 7,
    name: "Nordic Nightstand",
    price: 350,
    category: "Minimalist",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=1000",
    description: "Clean lines and functional storage make this nightstand a perfect companion for minimalist bedrooms.",
    features: ["Push-to-open drawer", "Compact footprint", "Sustainable materials"],
    specs: { "Material": "Birch Plywood", "Dimensions": "18\"W x 16\"D x 24\"H", "Weight": "25 lbs" }
  },
  {
    id: 8,
    name: "Executive Velvet Desk Chair",
    price: 750,
    category: "Modern",
    image: "https://images.unsplash.com/photo-1505797149-35ebcb05a6fd?auto=format&fit=crop&q=80&w=1000",
    description: "Plush velvet upholstery combined with ergonomic adjustments for a stylish and productive workspace.",
    features: ["Height adjustable", "360-degree swivel", "Memory foam seat"],
    specs: { "Material": "Velvet & Chrome", "Dimensions": "26\"W x 26\"D x 38-42\"H", "Weight": "45 lbs" }
  },
  {
    id: 9,
    name: "Opal Marble Dining Table",
    price: 1850,
    category: "Modern",
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=1000",
    description: "Solid Carrara marble top with a pedestal base in matte black steel.",
    features: ["Natural marble veining", "Seats 6", "Stain-resistant sealant"],
    specs: { "Material": "Carrara Marble", "Dimensions": "72\"W x 36\"D x 30\"H", "Weight": "280 lbs" }
  },
  {
    id: 10,
    name: "Velvet Tufted Ottoman",
    price: 290,
    category: "Vintage",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000",
    description: "Classic tufted design in deep emerald velvet, perfect as a footrest or extra seating.",
    features: ["Deep button tufting", "Hardwood frame", "High-density foam"],
    specs: { "Material": "Velvet & Birch", "Dimensions": "24\"W x 24\"D x 18\"H", "Weight": "15 lbs" }
  },
  {
    id: 11,
    name: "Geometric Shelving Unit",
    price: 680,
    category: "Minimalist",
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=1000",
    description: "An open-frame bookshelf that creates a visual play of light and shadow.",
    features: ["Powder-coated steel", "Modular shelves", "Wall-mount hardware included"],
    specs: { "Material": "Steel", "Dimensions": "48\"W x 12\"D x 72\"H", "Weight": "70 lbs" }
  },
  {
    id: 12,
    name: "Artisan Ceramic Lamp",
    price: 180,
    category: "Artisanal",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=1000",
    description: "Hand-thrown ceramic base with a linen drum shade, each piece is unique.",
    features: ["Hand-thrown ceramic", "Linen shade", "Warm ambient glow"],
    specs: { "Material": "Ceramic & Linen", "Dimensions": "12\"W x 22\"H", "Weight": "8 lbs" }
  }
];
