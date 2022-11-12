const express = require("express");
const OAuth2Router = express.Router();
const passport = require("passport");

const CLIENT_URL = "https://shop-client-danz.vercel.app";

OAuth2Router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfully access",
      user: req.user,
    });
  }
});

OAuth2Router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

OAuth2Router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

OAuth2Router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

OAuth2Router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = OAuth2Router;
