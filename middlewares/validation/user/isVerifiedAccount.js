function isVerifiedAccount(req, res, next) {
  try {
    let userId = req.session.userId;
    if (!userId) return res.status(403).json({ error: "You Must" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}



// check the account is verified
// check the session is not expired otherwise should have a way to initialze it look more about enhance register . otp . verification phase
// then move to loggin
// optimize the code which already in use .
