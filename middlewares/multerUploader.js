import multer from "multer";


let storage = multer.memoryStorage(); // keep the mime as a buffer In RAM
let multerUplaoder = multer({storage : storage});


export default multerUplaoder;