import jwt from "jsonwebtoken";
import { config } from "dotenv";
import crypto from "crypto";
config();

let SECRET_KEY =
  process.env.SECRET_key ||
  (function () {
    return crypto.randomBytes(64).toString("hex");
  })();
function generateToken(payload, expiresIn, algorithm = "HS256") {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: expiresIn,
    algorithm: algorithm,
  });
}

export default generateToken;

