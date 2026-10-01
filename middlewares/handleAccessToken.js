import jwt from "jsonwebtoken"
function handleAccessToken(req, res, next) {
    return jwt.sign(req.body._id, process.env.SECRET_key);
}


