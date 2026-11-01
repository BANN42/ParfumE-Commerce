import User from "../../../models/User.js";
import { EmailerSender, generateOTP } from "../../../utils/generateOTP.js";

export async function isVerifiedAccount(req, res, next) {
  try {
    let {  isVerified, email } = await User.findById(req.userId);

    if (!isVerified) {
      
      let otp = generateOTP();
      await EmailerSender(
        process.env.NodeMailer_MAIL,
        email,
        "Verification OTP Number",
        `The OTP Number is ${otp}`,
      );
      res.userId = req.userId
      return res.status(403).json({
        message: "Please Verify Your Account First Check The Email for OTP",
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
}
