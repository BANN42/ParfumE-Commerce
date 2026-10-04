import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const SECRET_KEY = process.env.SECRET_key;

function generateToken(payload, expiresIn, algorithm = "HS256") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn, algorithm });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

export default generateToken;
