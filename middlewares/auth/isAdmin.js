export function isAdmin(req, res, next) {
  try {
    // check the admin athentication
    // let {UID, role} = req.cookies;
    // if(role.toLowerCase() === 'admin' && isAdminUID(UID) ){
    //     return next();
    // }
    if(req.role === "admin") {
        return next()
    }
    return res.status(403).json({error: "Admin Only ..."});
    // redirect back not showing anything like any message( is admin or 'admin Only' ...etc)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
