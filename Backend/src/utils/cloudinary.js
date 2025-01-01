import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
import ApiError from "./apiError.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {

    try {
        if (!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })

        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

const removeFromCloudinary = async (actualPath) => {

    const fileds = actualPath.split('/')
    const fileName = fileds[fileds.length - 1].split('.')[0]

    try {
        return await cloudinary.uploader.destroy(fileName)

    } catch (error) {
        throw new ApiError(500, 'Error in deleting file from cloudinary')
    }
}
export {
    uploadOnCloudinary,
    removeFromCloudinary
};