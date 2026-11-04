import express from "express";

import {
  Login,
  Profile,
  Register,
  UpdatePassword,
  UpdateProfile,
  UpdateProfileImage,
} from "../controllers/userController.js";

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
import { isVerifiedAccount } from "../middlewares/validation/user/isVerifiedAccount.js";
import { verifyOTPType } from "../middlewares/verifyOTPType.js";
import {
  loginLimiter,
  resendEmailForgotPass,
  resendOtpLimiter,
  verifyOtpLimiter,
} from "../middlewares/security/rateLimiters.js";
import { checkUserIsAuthenticated } from "../middlewares/auth/protect.js";
import { validationUpdateProfile } from "../middlewares/validation/user/validationUserSchema.js";
import { validationChangedPassword } from "../middlewares/validation/user/validationPasswordChange.js";
import { isGuest } from "../middlewares/isGuest.js";
config();

const Node_Mailer = process.env.NodeMailer_MAIL;

const userAuthRoutes = express.Router();

/*
 * @route : /register
 * @desc : create new account
 * @accessiblity : public
 * @method : POST
 */
userAuthRoutes.post(
  "/register",
  isGuest,
  multerUplaoder.single("img"),
  validationImageMemeType,
  validationRegister,
  uploadToCloudinary,
  Register,
);

/*
 * @Method : POST
 * @visibilty : Protected
 * @desc : send the OTP 6 digits
 * @route : /verify-otp
 */
userAuthRoutes.post(
  "/verify-otp",
  verifyOtpLimiter,
  verifyOTPType,
  verifyOtp,
  function (req, res) {
    return res.status(200).json({ message: "OTP is Correct" });
  },
);

/*
 * @desc: resend the Otp code
 * @method: POST
 * @access : protected
 * @route : /resend-otp
 */
userAuthRoutes.post(
  "/resend-otp",
  resendOtpLimiter,
  async function (req, res, next) {
    let otpCode = generateOTP();
    let { email } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ error: "The Email Not Found" });
    await EmailTransporter().sendMail({
      from: Node_Mailer,
      to: user.email,
      subject: "Verification OTP Number",
      text: `Your OTP code is ${otpCode}`,
    });
    user.otp = otpCode;
    user.otpAge = String(Date.now() + 10 * 60 * 1000);
    await user.save();
    next();
  },
  function (req, res) {
    return res.status(200).json({ message: "The OTP has been resended" });
  },
);

/*
 * @route : /login
 * @desc : login into my account
 * @accessiblity : public
 * @method : POST
 */
userAuthRoutes.post(
  "/login",
  isGuest,
  loginLimiter,
  validationLogin,
  isValideAccount,
  isVerifiedAccount,
  Login,
);

// profile
userAuthRoutes.get("/profile", checkUserIsAuthenticated, Profile);

/*
 * @desc : update user claim/s
 * @method : POST
 * @accessiblity : private
 * @url : /update-claims
 */

userAuthRoutes.patch(
  "/update-profile",
  checkUserIsAuthenticated,
  validationUpdateProfile,
  UpdateProfile,
);

// update profile image
userAuthRoutes.patch(
  "/update-photo-profile",
  checkUserIsAuthenticated,
  multerUplaoder.single("img"),
  validationImageMemeType,
  uploadToCloudinary,
  UpdateProfileImage,
);

// resset password
userAuthRoutes.patch(
  "/change-password",
  checkUserIsAuthenticated,
  validationChangedPassword,
  UpdatePassword,
);

// forgot password
userAuthRoutes.post('/forgot-password', isGuest, resendEmailForgotPass)
// logout

export default userAuthRoutes;
