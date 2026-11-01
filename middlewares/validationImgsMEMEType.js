import { fileTypeFromBuffer } from "file-type";
import Cloudinary from "../config/cloudinary.js";
import { makeImageBase64 } from "../utils/imageBase64.js";

const ALLOWED = ["image/jpeg", "image/png", "image/jpg"];

export async function validationMEMEType(req, res, next) {
  try {
    let files = req.files;
    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ error: "Product's Images are indeed to have" });
    }

    if (files.length > 8) {
      return res.status(400).json({
        error: "You can upload a maximum of 8 images.",
      });
    }

    for (const file of files) {
      const fileType = await fileTypeFromBuffer(file.buffer);

      if (!fileType || !ALLOWED.includes(fileType.mime)) {
        return res.status(415).json({
          error: "Only JPG, JPEG and PNG images are allowed.",
        });
      }
    }

    // do i need to check the images length like 8:
    /*
    something like 
    const nbrFiles =  8;
    if(files.length >8){
        return res.status(402).json({error : "Too Much Files Has been Uploaded Indeed Only"+nbrFiles})
    }
    */
    // await Promise.all(
    //   files.map(async function (file, i) {
    //     let img64 = makeImageBase64(file);
    //     let cFile = await Cloudinary.uploader.upload(img64);
    //     req.body.imgs[i] = cFile.secure_url;
    //     return cFile.public_id;
    //   }),
    // );

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while validating product images." });
  }
}
