import { uploadOnCloudinary } from "../src/utils/cloudinary.js";
import multer from "multer";

// Configure Multer (Store files in 'uploads' temporarily)
const storage = multer.diskStorage({});
const upload = multer({ storage });

export const TestCont = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Received File:", req.file.path);

    // Upload the file to Cloudinary
    const response = await uploadOnCloudinary(req.file.path);
    console.log("Cloudinary Response:", response);

    return res.status(200).json({ url: response.secure_url });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ error: "File upload failed" });
  }
};

// Route Setup
export const uploadMiddleware = upload.single("image"); // "image" should match the frontend file input name
