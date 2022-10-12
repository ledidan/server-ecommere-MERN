const express = require("express");
const protect = require("../middleware/Auth");
const productRoute = express.Router();
const {
  getAllProduct,
  getSingleProduct,
  createProductReview,
} = require("../controllers/ProductController");

// GET ALL PRODUCT
productRoute.get("/", getAllProduct);

// GET SINGLE PRODUCT
productRoute.get("/:id", getSingleProduct);

// POST REVIEW PRODUCT
productRoute.post("/:id/review", protect, createProductReview);

module.exports = productRoute;
