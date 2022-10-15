const express = require("express");
const { protect, admin } = require("../middleware/Auth");
const orderRouter = express.Router();
const {
  orderCreate,
  getOrderById,
  updateOrderPaid,
  getOrderByUser,
  getAllOrderByAdmin,
} = require("../controllers/OrderController");

// ? GET ALL ORDER BY ADMIN
orderRouter.get("/all", protect, admin, getAllOrderByAdmin);

// GET ORDER BY ID
orderRouter.get("/:id", protect, getOrderById);

// ORDER IS PAID
orderRouter.put("/:id/pay", protect, updateOrderPaid);

// CREATE ORDER
orderRouter.post("/", protect, orderCreate);

// USERS LOGIN ORDER
orderRouter.get("/", protect, getOrderByUser);

module.exports = orderRouter;
