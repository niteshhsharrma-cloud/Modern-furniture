import { connectDatabase } from "../config/db.js";
import Product from "../models/Product.js";

const products = [
  {
    name: "Modern 3-Seater Sofa",
    price: 85000,
    category: "Sofa",
    description: "A clean-lined three-seater sofa designed for comfortable everyday living.",
    dimensions: "78 × 34 × 32 in",
    material: "Solid wood frame + premium fabric",
    colors: ["Beige", "Grey", "Dark Brown"],
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"]
  },
  {
    name: "Classic King Bed",
    price: 72000,
    category: "Bed",
    description: "A practical king-size bed with a simple modern headboard.",
    dimensions: "78 × 72 in",
    material: "Seasoned hardwood + engineered board",
    colors: ["Walnut", "Natural", "Dark Brown"],
    images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"]
  },
  {
    name: "Six-Seater Dining Set",
    price: 68000,
    category: "Dining",
    description: "A spacious dining table with six matching chairs for family meals.",
    dimensions: "72 × 36 × 30 in",
    material: "Solid wood",
    colors: ["Natural", "Walnut"],
    images: ["https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80"]
  },
  {
    name: "Minimal Coffee Table",
    price: 18500,
    category: "Table",
    description: "A compact coffee table with a simple silhouette for modern living rooms.",
    dimensions: "42 × 24 × 17 in",
    material: "Engineered wood + veneer",
    colors: ["Oak", "Walnut"],
    images: ["https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80"]
  },
  {
    name: "Accent Lounge Chair",
    price: 24000,
    category: "Chair",
    description: "A comfortable accent chair suitable for reading corners and living rooms.",
    dimensions: "30 × 32 × 34 in",
    material: "Wood frame + upholstered fabric",
    colors: ["Olive", "Cream", "Grey"],
    images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80"]
  }
];

async function seed() {
  await connectDatabase();
  if (await Product.countDocuments()) {
    console.log("Products already exist. Nothing added.");
    process.exit(0);
  }

  await Product.insertMany(products);
  console.log("Sample products added.");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
