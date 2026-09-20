import Product from "../models/Product.js";
import { uploadImages, deleteImageByUrl } from "../utils/images.js";

const allowedCategories = new Set(["Sofa", "Bed", "Dining", "Table", "Chair", "Other"]);

function parseColors(value) {
  if (Array.isArray(value)) return value.map(String).map((x) => x.trim()).filter(Boolean);
  return String(value || "").split(",").map((x) => x.trim()).filter(Boolean);
}

function parseExistingImages(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function productInput(body) {
  const name = String(body.name || "").trim();
  const price = Number(body.price);
  const category = String(body.category || "").trim();
  const description = String(body.description || "").trim();

  if (!name || !Number.isFinite(price) || price < 0 || !allowedCategories.has(category) || !description) {
    const error = new Error("Name, valid price, category and description are required.");
    error.statusCode = 400;
    throw error;
  }

  return {
    name,
    price,
    category,
    description,
    dimensions: String(body.dimensions || "").trim(),
    material: String(body.material || "").trim(),
    colors: parseColors(body.colors)
  };
}

export async function listProducts(req, res) {
  const filter = {};
  if (req.query.category && allowedCategories.has(req.query.category)) {
    filter.category = req.query.category;
  }

  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 100);
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Product.countDocuments(filter)
  ]);

  res.json({
    products,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) }
  });
}

export async function getProduct(req, res) {
  const product = await Product.findById(req.params.id).lean();
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json({ product });
}

export async function categories(_req, res) {
  const values = await Product.distinct("category");
  res.json({ categories: values.filter((x) => allowedCategories.has(x)).sort() });
}

export async function createProduct(req, res) {
  const input = productInput(req.body);
  const images = await uploadImages(req.files);
  const product = await Product.create({ ...input, images });
  res.status(201).json({ product });
}

export async function updateProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found." });

  const input = productInput(req.body);
  const existingImages = parseExistingImages(req.body.existingImages);

  const removedImages = product.images.filter((image) => !existingImages.includes(image));
  const newImages = await uploadImages(req.files);

  product.set({ ...input, images: [...existingImages, ...newImages] });
  await product.save();

  await Promise.all(removedImages.map(deleteImageByUrl));

  res.json({ product });
}

export async function deleteProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found." });

  await product.deleteOne();
  await Promise.all(product.images.map(deleteImageByUrl));

  res.json({ message: "Product deleted." });
}
