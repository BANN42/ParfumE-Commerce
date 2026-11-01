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
  try {
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
    await user.save();

    
    // await EmailTransporter()
    //   .sendMail({
    //     from: process.env.NodeMailer_MAIL,
    //     to: user.email,
    //     subject: "Verification OTP Number",
    //     text: `Your OTP code is ${otpCode}`,
    //   })

    req.userId = user._id;
    // req.session.userId = user._id;

    next();
  } catch (error) {
    return next(error);
  }
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

