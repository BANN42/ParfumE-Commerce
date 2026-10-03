import Product from "../models/Product.js";
import { FrontPagination } from "../utils/pagination.js";
import { productValidationUpdating } from "../utils/ProductValidation.js";

export async function createProduct(req, res) {
  try {
    let currentClient = new Product(req.body);
    await currentClient.save();
    return res
      .status(201)
      .json({ message: "Product Has Been Added ...", ID: currentClient._id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getProducts(req, res) {
  try {
    const [page, limit, skip] = FrontPagination(
      req.query.page,
      req.query.limit,
    );

    const [nbDocuments, targetProducts] = await Promise.all([
      Product.countDocuments(),
      Product.find().skip(skip).limit(limit),
    ]);
    const totalPages = Math.ceil(nbDocuments / limit);

    return res
      .status(200)
      .json({ targetProducts, page, totalPages, nbDocuments });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getProductById(req, res) {
  try {
    let Id = req.params.id;
    let targetProduct = await Product.findById(Id);
    return targetProduct
      ? res.status(200).json({ targetProduct, isFounded: true })
      : res
          .status(404)
          .json({ isFounded: false, message: "Product Not Found" });
  } catch (error) {
    return error.name.toLowerCase() === "casterror"
      ? res.status(400).json({ error: "Enter A valide Id", isFounded: false })
      : res.status(500).json({ error: error.message });
  }
}

export async function updateProductById(req, res) {
  try {
    let targetProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
    );
    if (!targetProduct) {
      return res.status(404).json({ message: "Product Is Unknown..." });
    }
    return res
      .status(200)
      .json({
        message: "The Product Has Been Updated Successfuly",
        productID: targetProduct._id,
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function deleteProductById(req, res) {
  try {
    let targetProduct = await Product.findByIdAndDelete(req.params.id);
    if (!targetProduct) {
      return res.status(404).json({ error: "Product is Undefined" });
    }
    return res
      .status(200)
      .json({ message: "The Product Has Been Deleted Seccesfuly" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
