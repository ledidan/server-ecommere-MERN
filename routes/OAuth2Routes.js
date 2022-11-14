const express = require("express");
const OAuth2Router = express.Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000";

OAuth2Router.get("/login/success", (req, res) => {
  res.status(200).json({
    success: true,
    message: "successfully access",
    user: req.user,
  });
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

OAuth2Router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy(function (err) {
    if (!err) {
      res
        .status(200)
        .clearCookie("connect.sid", { path: "/" })
        .json({ status: "Success" });
    } else {
      // handle error case...
      res.status(403).json({ message: "failed to logout" });
    }
  });
  // req.session.destroy((e) => {
  //   req.logout();
  //   res.redirect(CLIENT_URL);
  // });
});

module.exports = OAuth2Router;
