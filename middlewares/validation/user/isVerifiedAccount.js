import User from "../../../models/User.js";
import { EmailerSender, generateOTP } from "../../../utils/generateOTP.js";

export async function isVerifiedAccount(req, res, next) {
  try {
    let user = await User.findById(req.userId);

    if (!user.isVerified) {
      let otp = generateOTP();
      await EmailerSender(
        process.env.NodeMailer_MAIL,
        user.email,
        "Verification OTP Number",
        `The OTP Number is ${otp}`,
      );
      user.otp = otp;
      user.otpAge = () => String(Date.now() + 10 * 60 * 1000);
      await user.save();
      res.userId = user._id;
      return res.status(403).json({
        message: "Please Verify Your Account First Check The Email for OTP",
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
}
