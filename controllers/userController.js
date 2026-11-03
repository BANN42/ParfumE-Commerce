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
    return next(error);
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

export async function Profile(req, res, next) {
  try {
    let userId = req.userId;
    let user = await User.findById(userId).select("-password -otp -otpAge");
    if (!user) return res.status(404).json({ error: "User Not Found" });
    return res
      .status(200)
      .json({ message: "Profile Retreived Successfully", user });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

export async function UpdateProfile(req, res, next) {
  try {
    let userId = req.userId;
    let user = req.body;
    let updatedProfile = await User.findByIdAndUpdate(
      userId,
      {
        $set: user,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "User Not Found" });
    }

    return res.status(200).json({ message: "The Profile has been Updated" });
  } catch (error) {
    return res.status(500).json({ error: "Error Occured while Updating" });
  }
}

// update user profile image
export async function UpdateProfileImage(req, res, next) {
  try {
    if (!req.body.img || !req.body.imgPublicId) {
      return res.status(400).json({
        error: "Please upload a valid profile image.",
      });
    }
    let bodyImg = req.body.img;
    let userId = req.userId;
    let updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { img: bodyImg, imgPublicId: req.body.imgPublicId },
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-otp -password -otpAge");
    if (!updatedUser) return res.status(404).json({ error: "User Not Found" });
    return res.status(200).json({
      message: "The Image Has been updated Seccessfully",
      user: updatedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An Error Occured While Changing The USER profile" });
  }
}
