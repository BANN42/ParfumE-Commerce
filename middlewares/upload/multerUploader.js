import { fileTypeFromBuffer } from "file-type";
import multer from "multer";



let storage = multer.memoryStorage();
let multerUplaoder = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default multerUplaoder;
