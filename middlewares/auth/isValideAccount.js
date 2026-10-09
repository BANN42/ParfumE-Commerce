import bcrypt from "bcryptjs";
import User from "../../models/User.js";

export async function isValideAccount(req, res, next) {
  try {
    // check the account is valide/ exists at the database
    let targetUser = await User.findOne({ email: req.body.email });
    if (!targetUser) {
      return res.status(404).json({ error: "User Not Found" });
    }
    let isTheSamePassword = await bcrypt.compare(
      req.body.password,
      targetUser.password,
    );

    if (!isTheSamePassword) {
      return res.status(400).json({ error: "Password/ Email incorrect ." });
    }
    req.userId = targetUser._id;
    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
