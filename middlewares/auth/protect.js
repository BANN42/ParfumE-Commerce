import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export function checkUserIsAuthenticated(req, res, next) {
  try {
    let authorization = req.headers.authorization;
    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "authorization Header is Empty Or Unformade (No Token Provided)",
      });
    }

    let token = authorization.split(" ")[1]?.trim();
    let decode = jwt.verify(token, process.env.SECRET_key)
    req.userId = decode.UID;
    return next()
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}
