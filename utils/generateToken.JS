import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const SECRET_KEY = process.env.SECRET_key;

function generateToken(payload, expiresIn) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn, algorithm: "HS256" });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, {
    algorithms: ["HS256"],
  });
}
    
export default generateToken;
