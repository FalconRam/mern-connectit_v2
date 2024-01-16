import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

export const convertImgToCloudinaryURL = async (
  imgBase64,
  public_id,
  folderName
) => {
  try {
    let folder;
    switch (folderName) {
      case "Posts":
        folder = process.env.CONNECTIT_POSTS;
        break;
      case "ProfilePicture":
        folder = process.env.CONNECTIT_PROFILEPICTURE;
        break;
      case "BgWallPicture":
        folder = process.env.CONNECTIT_PROFILEBGWALLPICTURE;
        break;
      default:
        break;
    }
    // Configuration
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECERT,
    });

    // Upload
    const cloudinaryResponse = await cloudinary.uploader.upload(imgBase64, {
      public_id: public_id,
      folder: folder,
    });
// console.log(cloudinaryResponse);
    return cloudinaryResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
