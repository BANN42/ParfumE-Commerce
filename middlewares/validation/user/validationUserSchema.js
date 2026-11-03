import { validateUpdateProfile } from "../../../utils/validationUserSchema.js";

export function validationUpdateProfile(req, res, next) {
  let { error, value } = validateUpdateProfile(req.body);
  if (error) {
    return res.status(400).json({
      errors: error.details.map((detail) => detail.message),
    });
  }
  req.body = value;
  return next();
}
