import express from "express";

import { Login, Register } from "../controllers/userController.js";

import validationRegister from "../middlewares/validation/user/validationRegister.js";
import multerUplaoder from "../middlewares/upload/multerUploader.js";
import uploadToCloudinary from "../middlewares/upload/uploadToCloudinary.js";
import { isValideAccount } from "../middlewares/auth/isValideAccount.js";
import { validationLogin } from "../middlewares/validation/user/validationLogin.js";
import validationImageMemeType from "../middlewares/validateImgMEMEtype.js";
import { verifyOtp } from "../middlewares/validation/user/verifyOtp.js";
import { EmailTransporter, generateOTP } from "../utils/generateOTP.js";
import User from "../models/User.js";
import { config } from "dotenv";
import { sendOtpMail } from "../middlewares/validation/user/sendOtpMail.js";
import { isVerifiedAccount } from "../middlewares/validation/user/isVerifiedAccount.js";
config();

const userAuthRoutes = express.Router();

/*
 * @route : /register
 * @desc : create new account
 * @accessiblity : public
 * @method : POST
 */
userAuthRoutes.post(
  "/register",
  multerUplaoder.single("img"),
  validationImageMemeType,
  validationRegister,
  uploadToCloudinary,
  Register,
  sendOtpMail,
);

/*
 * @Method : POST
 * @visibilty : Protected
 * @desc : send the OTP 6 digits
 * @route : /verify-otp
*/
userAuthRoutes.post("/verify-otp", verifyOtp, function (req, res) {
  return res.status(200).json({ message: "OTP is Correct" });
});

userAuthRoutes.post(
  "/resend-otp",
  async function (req, res, next) {
    let otpCode = generateOTP();
    let user = await User.findById(req.session.userId);
    await EmailTransporter().sendMail({
      from: process.env.NodeMailer_MAIL,
      to: user.email,
      subject: "Verification OTP Number",
      text: `Your OTP code is ${otpCode}`,
    });

    user.otp = otpCode;
    await user.save();

    next();
  },
  function (req, res) {
    return res.status(200).json({ message: "The OTP has been resended" });
  },
);

// resent OTP code

/*
 * @route : /login
 * @desc : login into my account
 * @accessiblity : public
 * @method : POST
 */
userAuthRoutes.post("/login",validationLogin,isValideAccount,isVerifiedAccount ,   Login);
// update Account Claims

// logout

export default userAuthRoutes;
