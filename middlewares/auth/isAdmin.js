import User from "../../models/User.js";

export async function isAdmin(req, res, next) {
  try {
    if (!req?.userId) {
      return res
        .status(401)
        .json({ error: "unauthorized , Please Login First " });
    }
    let Id = req.userId;
    let isAdmin = await User.findById(Id).select("role");
    if (!isAdmin) {
      return res.status(404).json({ error: "The User is not found " });
    }
    if (isAdmin.role !== "admin") {
      return res.status(403).json({ error: "Admin Only " });
    }
    return next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}
