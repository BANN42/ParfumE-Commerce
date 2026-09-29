  
import {  productValidationCreateMultipleImages } from "../../utils/ProductValidation.js";











export function validationProductMultipleImages(req, res, next) {
  try {
    let { error } = productValidationCreateMultipleImages(req.body);
    if (!error) {
      next();
    } else {
      return res.status(400).json({ error: error.message });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

