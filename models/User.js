import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
config();

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  birthday: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide a valide phone Number"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  img: {
    type: String,
  },
  imgPublicId: {
    type: String,
    default: null,
  },
  otp: {
    type: String,
    default: null,
  },
  otpAge: {
    type: String,
    default: () => String(Date.now() + 10 * 60 * 1000), // 10 mins
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// this hooks fully focus at the password Hash
UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
