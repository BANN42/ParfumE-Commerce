import { userRegisterValidator } from "../../../utils/validationUserSchema.js";

export default function validationRegister(req, res, next) {
  try {
    let { error } = userRegisterValidator(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return next();
  } catch (error) {
    return next(error);
  }
}
