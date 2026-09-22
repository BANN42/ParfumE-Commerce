import multer from "multer";

let storage = multer.memoryStorage();


let m_uploadMulterMiddleware = multer({storage: storage})

export default m_uploadMulterMiddleware;