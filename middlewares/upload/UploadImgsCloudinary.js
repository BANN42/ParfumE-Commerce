// use this when it is not neccessary to Update the Product Images

import Cloudinary from "../../config/cloudinary";
import { makeImageBase64 } from "../../utils/imageBase64";

export async function UploadImagesCloudinary(req, res, next) {
  try {
    // the user Can Upload from One Till X images eg8;
    let files = [];
    if (!req.files) {
      return res
        .status(400)
        .json({ error: "Product  Images Must Be Uploaded " });
    }

    // if (req.files) files = req.files;

    // let Base64Images = files.map(function (file) {
    //   return makeImageBase64(file);
    // });

    const uploadedFiles = await Promise.all(
      files.map(async function (file) {
        await Cloudinary.uploader.upload(makeImageBase64(file));
      }),
    );

    req.body.imgs = uploadedFiles.map(function (file) {
      file.secure_url;
    });
    next();
  } catch (error) {
    return res.status(500).json({
      error: "An Issue Has Been Occured While Uploading The Product Images",
    });
  }
}
