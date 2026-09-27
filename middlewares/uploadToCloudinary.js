import Cloudinary from "../config/cloudinary.js";

async function uploadToCloudinary(req, res, next) {
  try {
    let files = [];
    if (!req.file && !req.files) {
      return res.status(400).json({ error: "Image/s Not Provided ..." });
    }

    if (req.file) {
      files = [req.file];
    }
    if (req.files) {
      files = req.files;
    }
    let r = await Promise.all(
      files.map(function (file, index) {
        let dataURI = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        return Cloudinary.uploader.upload(dataURI, {
          allowed_formats: ["png", "jpeg", "jpg"],
        });
      }),
    );
    req.body.imgs = r.map(function (img) {
      return img.secure_url;
    });
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default uploadToCloudinary;
