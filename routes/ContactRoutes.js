const express = require("express");
const contactRouter = express.Router();
const sendContact = require("../controllers/ContactController");

contactRouter.post("/send", sendContact);
module.exports = contactRouter;
