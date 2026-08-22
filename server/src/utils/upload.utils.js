import dotenv from "dotenv"
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

dotenv.config({path: "./.env"});


cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})

console.log(
    `cloudinary://${process.env.CLOUDINARY_API_KEY}:****@${process.env.CLOUDINARY_CLOUD_NAME}`
);

console.log(
    await cloudinary.api.ping()
);
export const uploadImages = async(localFilePath) => {
  try {
    // check file path is avalible or not
    if(!localFilePath) return null;

    // upload image 

    const response = await cloudinary.uploader.upload(
   
      localFilePath,{
        resource_type:"auto"
      }
    )
    console.log("rsponse", response)
    fs.unlinkSync(localFilePath);
    return response.secure_url;
  } catch (error) {
    console.log("cloudinary error", error);
    if(localFilePath && fs.existsSync(localFilePath)){
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
}