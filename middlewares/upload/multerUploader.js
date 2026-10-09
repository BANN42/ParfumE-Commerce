import multer from "multer";

let storage = multer.memoryStorage(); // keep the mime as a buffer In RAM
let multerUplaoder = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default multerUplaoder;
