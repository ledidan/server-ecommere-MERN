const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");

// @desc    get all product
// @route   GET /api/products/
// @access  Public

const getAllProduct = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber || 1);
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ _id: -1 });
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get ID Single Product
// @route   GET /api/products/:id
// @access  Public

const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

// @desc    Create Product Review
// @route   POST /api/products/:id/review
// @access  Private

const createProductReview = asyncHandler(async (req, res) => {
  // *Declare rating and comment in request body
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  // Find already reviewed
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    //* Push req.review in user array
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
      timestamps: true,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, b) => b.rating + a, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Reviews added" });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

module.exports = { getAllProduct, getSingleProduct, createProductReview };
