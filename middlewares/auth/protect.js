import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export async function checkUserIsAuthenticated(req, res, next) {
  try {
    // has header or not
    if (!req.headers.Authorization) {
      return res
        .status(401)
        .json({ error: "No Token included at the header " });
    }
    // user is authenticated when he has a valide token stored
    let token = req.headers.Authorization.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token Is Invalide Or Expired ." });
    }
    if (token) {
      jwt.verify(token, process.env.SECRET_key, function (error, decode) {
        if (error) {
          return res.status(401).json({ error: error.message });
        }
        req.userId = decode.UID;
        next();
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
