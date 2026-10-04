import { userRegisterValidator } from "../../../utils/validationUserSchema.js";

userRegisterValidator;

export default function validationRegister(req, res, next) {
  try {
    let { error } = userRegisterValidator(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
 