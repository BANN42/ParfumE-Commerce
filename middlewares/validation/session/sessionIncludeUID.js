// check the session if it includes the userId

export function sessionIncludeUID(req, res, next) {
  try {
    let userId = req.session.userId;
    if (!userId)
      return res
        .status(403)
        .json({ error: "Unauthorized to access , Please Login" });
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
