import { productValidationCreateMultipleImages } from "../../../utils/productValidation.js";

export function validationProductMultipleImages(req, res, next) {
  try {
    const { error, value } = productValidationCreateMultipleImages(req.body);
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
    req.body = value;
    return next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error during product validation" });
  }
}
