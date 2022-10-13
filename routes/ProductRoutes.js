const express = require("express");
const { protect, admin } = require("../middleware/Auth");
const productRoute = express.Router();
const {
  getAllProduct,
  getSingleProduct,
  createProductReview,
  getAllProductByAdmin,
  deleteProductByAdmin,
} = require("../controllers/ProductController");

// [GET] ALL PRODUCT
productRoute.get("/", getAllProduct);

// [GET] GET ALL PRODUCT BY ADMIN
productRoute.get("/all", protect, admin, getAllProductByAdmin);

// [DELETE] DELETE PRODUCT BY ID
productRoute.delete("/:id", protect, admin, deleteProductByAdmin);
// [GET] SINGLE PRODUCT
productRoute.get("/:id", getSingleProduct);

// [POST] REVIEW PRODUCT
productRoute.post("/:id/review", protect, createProductReview);

module.exports = productRoute;
