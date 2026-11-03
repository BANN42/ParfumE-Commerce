export function verifyOTPType(req, res, next) {
  try {
    const { otpCode } = req.body;

    if (!/^\d{6}$/.test(String(otpCode ?? ""))) {
      return res.status(400).json({
        error: "Please enter a valid 6-digit OTP.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
