import { productValidationUpdating } from "../../../utils/productValidation.js";

export function validationProductUpdate(req, res, next) {
  try {
    let { error } = productValidationUpdating(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
