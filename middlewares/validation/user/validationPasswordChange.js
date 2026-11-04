import { validateChangePassword } from "../../../utils/validationUserSchema.js";

export function validationChangedPassword(req, res, next) {
  let { error } = validateChangePassword(req.body);
  if (error) {
    return res.status(400).json({
      errors: error.details.map((detail) => detail.message),
    });
  }
  return next();
}
