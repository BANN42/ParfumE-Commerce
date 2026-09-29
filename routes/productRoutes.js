  import express from "express";
  import {
    validationProductMultipleImages,
  } from "../middlewares/validation/validationProductMiddleware.js";
  import {
    createProduct,
    deleteProductById,
    getProductById,
    getProducts, 
    updateProductById,
  } from "../controllers/productController.js";

  import { validationProductUpdate } from "../middlewares/validation/validationProductUpdate.js";
  import { isValideId } from "../middlewares/isValideId.js";
  import multerUplaoder from "../middlewares/multerUploader.js";
  import uploadToCloudinary from "../middlewares/uploadToCloudinary.js";

  const productRoutes = express.Router();

  /*
  * Method : POST
  * Desc : add New Parfum
  * Accessbility : Public
  * URL : /add-product
  */

  productRoutes.post(
    "/add-product",
    multerUplaoder.array("imgs", 8),
    uploadToCloudinary,
    validationProductMultipleImages, 
    async function (req, res) {
      try {
        await createProduct(req, res);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },
  );

  /*
  * Method : GET
  * Desc : add New Parfum
  * Accessbility : Public
  * URL : /all-products
  */

  productRoutes.get("/all-products", async function (req, res) {
    try {
      await getProducts(req, res);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  /*
  * Method : GET
  * Desc : get Parfum By id
  * Accessbility : Public
  * URL : /:id
  */

  productRoutes.get("/:id", isValideId, async function (req, res) {
    try {
      await getProductById(req, res);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

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
    async function (req, res) {
      try {
        await updateProductById(req, res);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },
  );

  productRoutes.delete("/:id", isValideId, async function (req, res) {
    try {
      await deleteProductById(req, res);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  export default productRoutes;
