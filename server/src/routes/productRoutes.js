import { Router } from "express";
import {
  listProducts,
  getProduct,
  categories,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { requireAdmin } from "../middleware/auth.js";
import { uploadImages } from "../middleware/upload.js";

const router = Router();

router.get("/", listProducts);
router.get("/categories", categories);
router.get("/:id", getProduct);

router.post("/", requireAdmin, uploadImages, createProduct);
router.patch("/:id", requireAdmin, uploadImages, updateProduct);
router.delete("/:id", requireAdmin, deleteProduct);

export default router;
