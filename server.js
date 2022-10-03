const express = require("express");
const app = express();
const morgan = require("morgan");
const products = require("./data/Products.js");
const dotenv = require("dotenv");
const connectDatabase = require("./config/MongoDB");
// Config .env
dotenv.config();
connectDatabase();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Load Product from server
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Single Product from server
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.use(morgan("combined"));
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`server ${PORT} is connected...`);
});
