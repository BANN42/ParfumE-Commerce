import User from "../../../models/User.js";
import {
  EmailerSender,
  EmailTransporter,
  generateOTP,
} from "../../../utils/generateOTP.js";
import { config } from "dotenv";
config();

export async function sendOtpMail(req, res, next) {
  try {
    let otpCode = generateOTP();
    let userId = req.userId;
    let user = await User.findById(userId);
    if (!userId || !user)
      return res.status(403).json({ error: "User's Id Is Invalide" });

    let info = await EmailTransporter().sendMail({
      from: process.env.NodeMailer_MAIL,
      to: user.email,
      subject: "Verification OTP Number",
      text: `Your OTP code is ${otpCode}`,
    });

    if (info.messageId) {
      return res.status(201).json({ message: "The User Has Been Added" });
    }
  } catch (error) {
    return next(error);
  }
}
