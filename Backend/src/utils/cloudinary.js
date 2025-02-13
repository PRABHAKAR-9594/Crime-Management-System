import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) throw new Error("Please provide a file");

    // Determine file type (image or video)
    const fileExtension = path.extname(localFilePath).toLowerCase();
    const isVideo = [".mp4", ".mov", ".avi", ".mkv", ".webm"].includes(fileExtension);

    // Upload with different settings for images/videos
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: isVideo ? "video" : "image",
      folder: isVideo ? "videos" : "images", // Organize files in folders
      use_filename: true,
      unique_filename: false,
    });

    // Remove local file after successful upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;
  } catch (error) {
    // Cleanup local file on error
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    throw new Error(`Error uploading file: ${error.message}`);
  }
};

const removeFromCloudinary = async (cloudinaryUrl) => {
  try {
    if (!cloudinaryUrl) throw new Error("Cloudinary URL is required");

    // Extract public ID from the Cloudinary URL
    const publicId = cloudinaryUrl.split("/").pop().split(".")[0];

    // Delete the file
    const response = await cloudinary.uploader.destroy(publicId);
    
    return response;
  } catch (error) {
    throw new Error(`Error deleting file: ${error.message}`);
  }
};

export { uploadOnCloudinary, removeFromCloudinary };
