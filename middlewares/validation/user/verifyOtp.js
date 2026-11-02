import User from "../../../models/User.js";

export async function verifyOtp(req, res, next) {
  try {
    let { otpCode, email } = req.body;
    let targetUser = await User.findOne({ email: email });
    if (!targetUser) return res.status(404).json({ error: "User Not Exists" });
    if (+targetUser.otp === +otpCode) {
      if (+Date.now() <= +targetUser.otpAge) {
        targetUser.otp = null;
        targetUser.otpAge = null;
        targetUser.isVerified = true;
        await targetUser.save();
        return next();
      } else {
        return res.status(400).json({ error: "The OTP is Expired " });
      }
    } else {
      return res.status(400).json({ error: "The OTP is Ivalide" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error, Please Try Again" });
  }
}
