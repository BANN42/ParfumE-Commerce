import multer from "multer";

function handleUploadImage(req, res, next) {
    try{
        let {img} = req.body;
        let storage = multer.memoryStorage()
        let upload = multer({ storage: storage });

    app.post('/upload', upload.single('image'), async (req, res) => {
        const result = await cloudinary.uploader.upload_stream({
        folder: 'uploads'
    }).end(req.file.buffer);
  
     res.json({ message : "The Image Has Been Uploaded .." });
});
    }catch(error) {
        return res.status(500).json({error : error.message});
    }
}

export default handleUploadImage;