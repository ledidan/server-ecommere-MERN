const express = require("express");
const protect = require("../middleware/Auth");
const orderRouter = express.Router();
const {
  orderCreate,
  getOrderById,
  updateOrderPaid,
  getOrderByUser,
} = require("../controllers/OrderController");
// CREATE ORDER
orderRouter.post("/", protect, orderCreate);
// GET ORDER BY ID
orderRouter.get("/:id", protect, getOrderById);

// ORDER IS PAID
orderRouter.put("/:id/pay", protect, updateOrderPaid);

// USERS LOGIN ORDER
orderRouter.get("/", protect, getOrderByUser);

module.exports = orderRouter;
