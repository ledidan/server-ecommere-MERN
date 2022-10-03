const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    users: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = orderSchema;
