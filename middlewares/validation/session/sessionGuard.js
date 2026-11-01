// this module destroy the session after a cople of time of not using it

export function sessionGuard(req, res, next) {
  try {
    let sessionId = req.session.id;
    let userId = req.session.userId;
    if (!sessionId || !userId)
      return res
        .status(400)
        .json({ error: "Session is Expired Please Login Again" });
    if (Date.now() - req.session.createdAt < 1000 * 60 * 60 * 24) {
      return next();
    }
    return res.status(403).json({ error: "Token Has  Expired " });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
