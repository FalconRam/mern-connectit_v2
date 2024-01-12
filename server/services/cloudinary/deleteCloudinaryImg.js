import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

export const deleteCloudinaryImg = async (id, folderName) => {
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
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECERT,
    });

    // Sample URL - https://res.cloudinary.com/<CloudName>/image/upload/<ImageVersion>/<FolderName>/<PublicId>.jpg
    // let assetName = imgCloudinaryURL.split("/")[8].split(".")[0]; // picking publicId
    // id is publicId
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(`${folder}/${id}`, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
    return result;
  } catch (error) {
    return error;
  }
};
