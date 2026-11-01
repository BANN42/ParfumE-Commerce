import User from "../../../models/User.js";

export async function verifyOtp(req, res, next) {
  try {
    let userId =   req.userId;
    let { otpCode } = req.body;
    if (!userId)
      return res
        .status(401)
        .json({ error: "The Session is Expired, please register again " });
    let targetUser = await User.findById(userId);
    if (!targetUser) return res.status(404).json({ error: "User Not Exists" });
    if (targetUser.otp === otpCode && +Date.now() <= +targetUser.otpAge) {
      targetUser.otp = null;
      targetUser.otpAge = null;
      targetUser.isVerified = true;
      await targetUser.save();
      return next();
    }

    return res.status(400).json({ error: "The Otp Code is Invalide " });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error, Please Try Again" });
  }
}
