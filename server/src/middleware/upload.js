import multer from "multer";

const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);

const storage = multer.memoryStorage();

export const uploadImages = multer({
  storage,
  limits: { files: 5, fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowed.has(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG and WebP images are allowed."));
    }
    cb(null, true);
  }
}).array("images", 5);
