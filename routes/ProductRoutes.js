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
  getProductByCategory,
  getAllProductByAdmin,
} = require("../controllers/ProductController");

// ?[DELETE] DELETE PRODUCT ID BY ADMIN
productRoute.delete("/:id/delete", protect, admin, deleteProductByAdmin);

// ?[POST] CREATE PRODUCT BY ADMIN
productRoute.post("/create", protect, admin, createProductByAdmin);

// ?[PUT] GET EDIT PRODUCT ID PAGE BY ADMIN
productRoute.put("/:id", protect, admin, updateProductByAdmin);

// GET ALL PRODUCT BY ADMIN
productRoute.get("/all", protect, admin, getAllProductByAdmin);
// [GET] SINGLE PRODUCT
productRoute.get("/:id", getSingleProduct);

// [POST] REVIEW PRODUCT
productRoute.post("/:id/review", protect, createProductReview);
// [GET] Get Product By Category
productRoute.get("/:categories", getProductByCategory);
// [GET] ALL PRODUCT
productRoute.get("/", getAllProduct);

module.exports = productRoute;
