import Cloudinary from "../../config/cloudinary.js";
import { makeImageBase64 } from "../../utils/imageBase64.js";

async function uploadToCloudinary(req, res, next) {
  try {
    let file = req.file;
    if (!file) {
      return next();
    }
    let imgBase64 = makeImageBase64(req.file);
    let uploadStatus = await Cloudinary.uploader.upload(imgBase64, {
      folder: process.env.APP_NAME + "/" + "users",
    });

    req.body.img = uploadStatus.secure_url;
    req.body.imgPublicId = uploadStatus.public_id;
    return next();
  } catch (error) {
    return next(error);
  }
}

export default uploadToCloudinary;
