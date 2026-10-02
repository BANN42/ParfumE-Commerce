import express from "express";
import validationRegister from "../middlewares/validation/validationRegister.js";
import { appendUserInDatabase } from "../controllers/userController.js";
import multerUplaoder from "../middlewares/multerUploader.js";
import uploadToCloudinary from "../middlewares/uploadToCloudinary.js";
import { isValideAccount } from "../middlewares/isValideAccount.js";
import { validationLogin } from "../middlewares/validationLogin.js";
import generateToken from "../utils/generateToken.js";
import { dd } from "../middlewares/dd.js";

const userAuthRoutes = express.Router();

// register

userAuthRoutes.post(
  "/register",
  multerUplaoder.single("img"),
  uploadToCloudinary,
  validationRegister,
  async function (req, res) {
    try {
      await appendUserInDatabase(req, res);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
);

// verify Account

// login
userAuthRoutes.post('/login' , validationLogin , isValideAccount,  function(req, res) {
  try{
    let token  = generateToken({UID: req.body.userId}, "15")
   res.cookie("access-token",token ,  {
     maxAge: 900000, // 15 minutes
     httpOnly: true, // Sécurisé contre XSS
     secure: true, // HTTPS uniquement
     sameSite: "strict", // Protection CSRF
   });
   return res.status(200).json({token})
  }catch(error) {
    return res.status(500).json({error: error.message})
  }
})
 

// update Account Claims

// logout

export default userAuthRoutes;
