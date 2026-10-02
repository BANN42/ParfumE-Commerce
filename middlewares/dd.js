export function dd(req, res, next){
    console.log(req.body , "this is dd")
    console.log(req.body.img , "this is dd")
    next()
}


