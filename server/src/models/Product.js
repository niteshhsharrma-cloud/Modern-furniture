import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ["Sofa", "Bed", "Dining", "Table", "Chair", "Other"]
    },
    description: { type: String, required: true, trim: true, maxlength: 3000 },
    images: [{ type: String, trim: true }],
    dimensions: { type: String, trim: true, maxlength: 200 },
    material: { type: String, trim: true, maxlength: 200 },
    colors: [{ type: String, trim: true, maxlength: 60 }]
  },
  { timestamps: true }
);

productSchema.index({ category: 1, createdAt: -1 });

export default mongoose.model("Product", productSchema);
