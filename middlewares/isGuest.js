import { config } from "dotenv";
config();

import jwt from "jsonwebtoken";
export async function isGuest(req, res, next) {
  try {
    let authorization = req.headers["authorization"];
    if (!authorization?.startsWith("Bearer ")) {
      return next();
    }
    // validation token
    const token = authorization.split(" ")[1].trim();
    let decode = jwt.verify(token, process.env.SECRET_key);
    if (decode) {
      return res.status(403).json({ error: "You Are Already Authenticated" });
    }
    return next();
  } catch (error) {

    return next(error)
  }
}
