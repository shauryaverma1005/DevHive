import {v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload file on cloudinary
const uploadOnCloudinary = async (localPath: string): Promise<UploadApiResponse | null>=>{
    try {
        if(!localPath){
            return null;
        }

        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto"
        });

        if(fs.existsSync(localPath)){
            fs.unlinkSync(localPath);
        }

        return response;
    
    }catch(error){
        if(fs.existsSync(localPath)){
            fs.unlinkSync(localPath);
        }

        return null;
    }
};

interface deleteResponse {
    status: string,
    message: string,
    result?: any,
    error?: string
}

const deleteOnCloudinary = async (publicId : string): Promise<deleteResponse> =>{
    if(!publicId) { return { status : "skipped", message: "No publicId provided"} }

    try {
        const result = await cloudinary.uploader.destroy(publicId);

        return {
            status: "success",
            message: "cloudinary file deleted",
            result
        };
    } catch (error: unknown){
        const err = error as UploadApiErrorResponse;
        console.log(`Cloudinary delete failed: ${err.message}`);

        return {
            status: "error",
            message: "Failed to delete cloudinary file",
            error: err.message,
        };
    }
};

export {
    uploadOnCloudinary,
    deleteOnCloudinary
}

