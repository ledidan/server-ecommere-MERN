const express = require("express");
const { protect, admin } = require("../middleware/Auth");
const productRoute = express.Router();
const {
  getAllProduct,
  getSingleProduct,
  createProductReview,
  getAllProductByAdmin,
  deleteProductByAdmin,
  createProductByAdmin,
  updateProductByAdmin,
} = require("../controllers/ProductController");

// [GET] ALL PRODUCT

productRoute.get("/", getAllProduct);
// ?[GET] GET ALL PRODUCT BY ADMIN
productRoute.get("/all", protect, admin, getAllProductByAdmin);

// ?[DELETE] DELETE PRODUCT ID BY ADMIN
productRoute.delete("/:id/delete", protect, admin, deleteProductByAdmin);

// ?[POST] CREATE PRODUCT BY ADMIN
productRoute.post("/create", protect, admin, createProductByAdmin);

// ?[PUT] GET EDIT PRODUCT ID PAGE BY ADMIN
productRoute.put("/:id", protect, admin, updateProductByAdmin);

// [GET] SINGLE PRODUCT
productRoute.get("/:id", getSingleProduct);

// [POST] REVIEW PRODUCT
productRoute.post("/:id/review", protect, createProductReview);

module.exports = productRoute;
