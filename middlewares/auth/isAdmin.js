import User from "../../models/User.js";

export async function isAdmin(req, res, next) {
  try {
    if (!req?.userId) {
      return res.status(500).json({ error: "user Id Not Exists " });
    }
    let Id = req.userId;
    let isAdmin = await User.findById(Id);
    if(!isAdmin){
      return res.status(404).json({error : "Id Not Found (check Id is valide)"})
    }
    if (isAdmin.role?.toLowerCase() === "admin") {
      return next();
    }
    return res.status(403).json({ error: "Admin Only ..." });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}
