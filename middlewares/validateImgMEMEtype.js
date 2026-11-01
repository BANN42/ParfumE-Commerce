import { fileTypeFromBuffer } from "file-type";
const ALLOWED = ["image/jpeg", "image/png", "image/jpg"];
async function validationImageMemeType(req, res, next) {
  try {
    if (!req.file) {
      return next();
    }
    let fileType = await fileTypeFromBuffer(req.file.buffer);
    if (!fileType || !ALLOWED.includes(fileType.mime)) {
      return res
        .status(415)
        .json({ error: "Only JPEG and PNG images are allowed." });
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export default validationImageMemeType;
