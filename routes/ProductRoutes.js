const express = require("express");
const { protect, admin } = require("../middleware/Auth");
const productRoute = express.Router();
const {
  getAllProduct,
  getSingleProduct,
  createProductReview,
  deleteProductByAdmin,
  createProductByAdmin,
  updateProductByAdmin,
  getAllProductByAdmin,
  listProductRelated,
  productListCategory,
  productListBySearchDesc,
  productListBySearchAsc,
} = require("../controllers/ProductController");

// ?[DELETE] DELETE PRODUCT ID BY ADMIN
productRoute.delete("/:id/delete", protect, admin, deleteProductByAdmin);

// ?[POST] CREATE PRODUCT BY ADMIN
productRoute.post("/create", protect, admin, createProductByAdmin);

// ?[PUT] GET EDIT PRODUCT ID PAGE BY ADMIN
productRoute.put("/:id", protect, admin, updateProductByAdmin);

/**
 * it will find the products based on the req product category
 * other products that has the same category, will be returned
 */
productRoute.get("/related/:productId", listProductRelated);
productRoute.get("/categories", productListCategory);
productRoute.post("/by/search", productListBySearchDesc);
// GET ALL PRODUCT BY ADMIN
productRoute.get("/all", protect, admin, getAllProductByAdmin);
// [GET] SINGLE PRODUCT
productRoute.get("/:id", getSingleProduct);

// [POST] REVIEW PRODUCT
productRoute.post("/:id/review", protect, createProductReview);

// [GET] ALL PRODUCT
productRoute.get("/", getAllProduct);

module.exports = productRoute;
