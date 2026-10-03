import jwt from "jsonwebtoken";
import { config } from "dotenv";
import crypto from "crypto";
config();

const SECRET_KEY =
  process.env.JWT_SECRET ||
  process.env.SECRET_key ||
  (function () {
    return crypto.randomBytes(64).toString("hex");
  })();

function generateToken(payload, expiresIn, algorithm = "HS256") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn, algorithm });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

export default generateToken;
