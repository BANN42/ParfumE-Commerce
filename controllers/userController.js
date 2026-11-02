import User from "../models/User.js";
import { EmailTransporter, generateOTP } from "../utils/generateOTP.js";
import generateToken from "../utils/generateToken.js";
import { config } from "dotenv";
config();

/*
 * Route Handler (Register)
 *
 *
 */

export async function Register(req, res, next) {
  let otpCode = generateOTP();
  let { username, email, password, birthday, phone, gender, img } = req.body;
  let user = new User({
    username,
    email,
    password,
    birthday,
    phone,
    gender,
    img,
    otp: String(otpCode),
  });

  try {
    await user.save();
  } catch (error) {
    next(error);
  }

  try {
    await EmailTransporter().sendMail({
      from: process.env.NodeMailer_MAIL,
      to: user.email,
      subject: "Verification OTP Number",
      text: `Your OTP code is ${otpCode}`,
    });
  } catch (error) {
    return res.status(503).json({
      message:
        "Account created, but OTP delivery failed. Please request another OTP.",
      userId: user._id,
    });
  }

 

  return res.status(201).json({
    message: "User created. Please verify your email.",
    userId: user._id,
  });
}

/*
 *  Route handle Login
 *
 *
 */

export async function Login(req, res) {
  try {
    let token = generateToken({ UID: req.userId }, "15m");
    res.cookie("token", token, {
      maxAge: 900000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.status(200).json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error,Please Try again" });
  }
}

// this is route handler is only for sending messages
