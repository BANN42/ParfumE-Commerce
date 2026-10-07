import express from "express";
import { validationProductMultipleImages } from "../middlewares/validation/product/validationProductMiddleware.js";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from "../controllers/productController.js";

import { validationProductUpdate } from "../middlewares/validation/product/validationProductUpload.js";
import { isValideId } from "../middlewares/isValideId.js";
import multerUplaoder from "../middlewares/upload/multerUploader.js";
import uploadToCloudinary from "../middlewares/upload/uploadToCloudinary.js";
import { checkUserIsAuthenticated } from "../middlewares/auth/protect.js";
import { isAdmin } from "../middlewares/auth/isAdmin.js";

const productRoutes = express.Router();

/*
 * Method : POST
 * Desc : add New product
 * Accessbility : Public
 * URL : /add-product
 */

productRoutes.post(
  "/add-product",
  checkUserIsAuthenticated,
  isAdmin, //
  multerUplaoder.array("imgs", 8),
  uploadToCloudinary,
  validationProductMultipleImages,
  createProduct,
);

/*
 * Method : GET
 * Desc : add New Parfum
 * Accessbility : Public
 * URL : /all-products
 */

productRoutes.get("/all-products", getProducts);

/*
 * Method : GET
 * Desc : get Parfum By id
 * Accessbility : Public
 * URL : /:id
 */

productRoutes.get("/:id", isValideId, getProductById);

/*
 * Method : POST
 * Desc : Update ProductByID
 * Accessbility : Public
 * URL : /:id
 */

productRoutes.put(
  "/:id",
  isValideId,
  validationProductUpdate,
  updateProductById,
);

productRoutes.delete("/:id", isValideId, deleteProductById);

export default productRoutes;
