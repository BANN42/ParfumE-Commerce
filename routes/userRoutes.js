import express from "express";
import validationRegister from "../middlewares/validation/user/validationRegister.js";
import { appendUserInDatabase } from "../controllers/userController.js";
import multerUplaoder from "../middlewares/upload/multerUploader.js";
import uploadToCloudinary from "../middlewares/upload/uploadToCloudinary.js";
import { isValideAccount } from "../middlewares/auth/isValideAccount.js";
import generateToken from "../utils/generateToken.js";
import { validationLogin } from "../middlewares/validation/user/validationLogin.js";
import { checkUserIsAuthenticated } from "../middlewares/auth/protect.js";

const userAuthRoutes = express.Router();

// register

userAuthRoutes.post(
  "/register",
  multerUplaoder.single("img"),
  uploadToCloudinary,
  validationRegister,
  appendUserInDatabase,
); 

// verify Account

// login
userAuthRoutes.post(
  "/login",
  validationLogin,
  isValideAccount,
  async function (req, res) {
    try {
      let token = generateToken({ UID: req.body.userId }, "15m");
      res.cookie("access-token", token, {
        maxAge: 900000, // 15 minutes
        httpOnly: true, // Sécurisé contre XSS
        secure: true, // HTTPS uniquement
        sameSite: "strict", // Protection CSRF
      });
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
);



userAuthRoutes.post('/test', checkUserIsAuthenticated ,  function(req, res) {
  return res.status(200).json({message: "All Good"})
})
// update Account Claims

// logout

export default userAuthRoutes;
 