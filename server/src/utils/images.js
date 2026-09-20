import { cloudinary, cloudinaryConfigured } from "../config/cloudinary.js";
import { env } from "../config/env.js";

function uploadBuffer(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: env.cloudinary.folder,
        resource_type: "image"
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(file.buffer);
  });
}

export async function uploadImages(files = []) {
  if (!files.length) return [];

  if (!cloudinaryConfigured) {
    const error = new Error("Image uploads require Cloudinary configuration.");
    error.statusCode = 503;
    throw error;
  }

  const results = await Promise.all(files.map(uploadBuffer));
  return results.map((result) => result.secure_url);
}

export async function deleteImageByUrl(url) {
  if (!cloudinaryConfigured || !url) return;

  try {
    const marker = "/upload/";
    const index = url.indexOf(marker);
    if (index === -1) return;

    let publicId = url.slice(index + marker.length);
    publicId = publicId.replace(/^v\d+\//, "");
    publicId = publicId.replace(/\.[^/.]+$/, "");

    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch (error) {
    console.error("Cloudinary delete failed:", error.message);
  }
}