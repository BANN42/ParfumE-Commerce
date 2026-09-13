import express from "express";
import { m_validationProductClaims } from "../middlewares/validation/validationProductClaims.js";
import { createProduct, getProducts } from "../controllers/productController.js";
import Product from "../model/Product.js";
const productRoutes = express.Router();


/*
* Method : POST
* Desc : add New Parfum
* Accessbility : Public
* URL : /add-product
*/

 
productRoutes.post('/add-product' ,m_validationProductClaims,  async function(req, res) {
  try{
    await createProduct(req, res)
  }catch(error){
    return res.status(500).json({error : error.message})
  }
})

/*
* Method : GET
* Desc : add New Parfum
* Accessbility : Public
* URL : /all-products
*/

productRoutes.get('/all-products' , async function(req, res) {
  try{
  await getProducts(req, res);
  }catch(error){
    return res.status(500).json({error : error.message})
  }
});

/*
* Method : GET
* Desc : add New Parfum
* Accessbility : Public
* URL : /all-products
*/
// pagination



export default productRoutes;