import express from "express";
import validationRegister from "../middlewares/validation/validationRegister.js";
import { appendUserInDatabase } from "../controllers/userController.js";
import multerUplaoder from "../middlewares/multerUploader.js";
import uploadToCloudinary from "../middlewares/uploadToCloudinary.js";

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

// update Account Claims

// logout

export default userAuthRoutes;
