import express from "express";

import { Login, Register } from "../controllers/userController.js";

import validationRegister from "../middlewares/validation/user/validationRegister.js";
import multerUplaoder from "../middlewares/upload/multerUploader.js";
import uploadToCloudinary from "../middlewares/upload/uploadToCloudinary.js";
import { isValideAccount } from "../middlewares/auth/isValideAccount.js";
import { validationLogin } from "../middlewares/validation/user/validationLogin.js";




const userAuthRoutes = express.Router();

/*
 * route : /register
 * accessiblity : public
 * method : POST
 */
userAuthRoutes.post(
  "/register",
  multerUplaoder.single("img"),
  uploadToCloudinary,
  validationRegister,
  Register,
);

// verify Account

// login
userAuthRoutes.post("/login", validationLogin, isValideAccount, Login);

// update Account Claims

// logout

export default userAuthRoutes;
