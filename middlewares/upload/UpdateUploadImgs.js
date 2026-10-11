// use this when it is not neccessary to Update the Product Images

export async function UpdateImagesCloudinary(req, res, next) {
    try {
        if(!req.file && !req.files ){
            return next()
        }
    }catch(error) {

    }
}