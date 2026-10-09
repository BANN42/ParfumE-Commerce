import Cloudinary from "../../config/cloudinary.js";

async function uploadToCloudinary(req, res, next) {
  try {
    if (!req.file && (!req.files || req.files.length === 0)) {
      return res.status(400).json({ error: "Image/s Not Provided ..." });
    }

    let files = [];

      if (req.file) {
      files = [req.file];
    } else if (Array.isArray(req.files)) {
      files = req.files;
    } else if (typeof req.files === "object") {
      files = Object.values(req.files).flat();
    }

    // if (req.file) {
    //   files = [req.file];
    // }
    // if (req.files) {
    //   files = req.files;
    // }

    let multerPromises = files.map(function (file) {
      let dataURI = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      return Cloudinary.uploader.upload(dataURI, {
        allowed_formats: ["png", "jpeg", "jpg"],
      });
    });

    let r = await Promise.all(multerPromises);

    // register auth route conflet with upload multiple images for a product

    if (req.file) {
      req.body.img = r[0].secure_url;
    }
    if (req.files) {
      req.body.imgs = r.map(function (img) {
        return img.secure_url;
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default uploadToCloudinary;
