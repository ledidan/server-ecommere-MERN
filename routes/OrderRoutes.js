const express = require("express");
const asyncHandler = require("express-async-handler");
const Order = require("../models/OrderModel");

const orderRouter = express.Router();

orderRouter.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No ordered items");
    } else {
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      const createOrder = await order.save();
      res.status(200).json(createOrder);
    }
  })
);

module.exports = orderRouter;
