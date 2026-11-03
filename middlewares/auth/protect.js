import jwt from "jsonwebtoken";
import { config } from "dotenv";
import User from "../../models/User.js";
config();

export async function checkUserIsAuthenticated(req, res, next) {
  try {
    let authorization = req.headers.authorization;
    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "No Authorized action must Login First",
      });
    }

    let token = authorization.split(" ")[1]?.trim();
    let decode = jwt.verify(token, process.env.SECRET_key);

    if (!decode.UID) {
      return res.status(401).json({
        error: "Invalid token payload",
      });
    }
    let user = await User.findById(decode.UID)
    if (!user) return res.status(401).json({ error: "The User Is Not Found" });
    req.userId = decode.UID;
    return next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token. Please login again.",
    });
  }
}
