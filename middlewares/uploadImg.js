import Cloudinary from "../config/cloudinary.js";

function CloudinaryUploadImageMiddleware(req, res, next) {
    try{
        let imageBase64 = req.file.buffer.toString('base64')
        let dataURI = `data:${req.file.mimetype};base64,${imageBase64}`
         Cloudinary.uploader.upload(dataURI , {
            allowed_formats: ["png" , 'jpeg' , "jpg"]
        } , function(error ,result) {
            if(error) {
                return res.status(400).json({error : error.message});
            }
            req.body.img = result.secure_url;
            next()
        } )
    }catch(error){
        console.log('this')
        return res.status(500).json({error : error.message});
    }
}


export default CloudinaryUploadImageMiddleware;