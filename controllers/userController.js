import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

/*
 * Route Handler (Register)
 *
 *
 */
export async function Register(req, res) {
  try {
    let { username, email, password, birthday, phone, gender, img } = req.body;
    let user = new User({
      username,
      email,
      password,
      birthday,
      phone,
      gender,
      img,
    });

    await user.save();
    return res.status(201).json({ message: "The User Has Been Created ..." });
  } catch (error) {
    if (error.code === 11000) {
    }
    return res
      .status(409)
      .json({
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
    res.cookie("access-token", token, {
      maxAge: 900000, // 15 minutes
      httpOnly: true, // Sécurisé contre XSS
      secure: true, // HTTPS uniquement
      sameSite: "strict", // Protection CSRF
    });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
