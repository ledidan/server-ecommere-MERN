const mongoose = require("mongoose");

const reviewsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
    default: 0,
  },
  comment: {
    type: String,
    require: true,
  },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});

const productSchema = mongoose.Schema(
  {
    image: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
    reviews: [reviewsSchema],
    rating: {
      type: Number,
      require: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      require: true,
      default: 0,
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
