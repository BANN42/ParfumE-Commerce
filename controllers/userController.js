import User from "../models/User.js";

export async function appendUserInDatabase(req, res) {
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
    console.log("11");
    return res.status(500).json({ error: error.message });
  }
}
