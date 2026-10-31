import User from "../models/User.js";
import { EmailTransporter, generateOTP } from "../utils/generateOTP.js";
import generateToken from "../utils/generateToken.js";
import { config } from "dotenv";
config();

const AboutToken = {
  tokenMaxAge: 900000,
};

/*
 * Route Handler (Register)
 *
 *
 */
export async function Register(req, res) {
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

    await EmailTransporter().sendMail({
      from: process.env.NodeMailer_MAIL,
      to: user.email,
      subject: "Verification OTP Number",
      text: `Your OTP code is ${otpCode}`,
    });
    req.session.userId = user._id;
    return res.status(201).json({ message: "The User Has Been Created" });
  } catch (error) {
    return res.status(409).json({
      error: `The ${Object.keys(error.keyPattern)[0]} is Already In Use`,
    });
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
      maxAge: 900000, // 15 minutes
      httpOnly: true, // Sécurisé contre XSS
      secure: true, // HTTPS uniquement
      sameSite: "strict", // Protection CSRF
    });
    return res.status(200).json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error,Please Try ag" });
  }
}
