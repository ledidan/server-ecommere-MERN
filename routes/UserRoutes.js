const express = require("express");
const userRouter = express.Router();
const protect = require("../middleware/Auth");
const {
  userAuth,
  userRegister,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/UserController");
// [POST] GET ALL USERS
userRouter.post("/login", userAuth);

// [POST] REGISTER
userRouter.post("/", userRegister);

// [GET] PROFILE
userRouter.get("/profile", protect, getUserProfile);

// [PUT] UPDATE PROFILE
userRouter.put("/profile", protect, updateUserProfile);

module.exports = userRouter;
