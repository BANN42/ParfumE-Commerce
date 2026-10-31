import { fileTypeFromBuffer } from "file-type";
const ALLOWED = ["image/jpeg", "image/png", "image/jpg"];
async function validationImageMemeType(req, res, next) {
  try {
    let rType = await fileTypeFromBuffer(req.file.buffer);
    if (!rType || ALLOWED.includes(!rType.mime)) {
      return res.status(401).json({ error: "unauthorized file type" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "The Image is Required on that format JPEG JPG PNG" });
  }
}

export default validationImageMemeType;
