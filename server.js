const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDatabase = require("./config/MongoDB");
const ImportData = require("./ImportData.js");
const productRoute = require("./routes/ProductRoutes");
const userRouter = require("./routes/UserRoutes");
const { errorHandler, notFound } = require("./middleware/Errors");
const orderRouter = require("./routes/OrderRoutes");
// Config .env
dotenv.config();
// Connect DB
connectDatabase();

// Stringify JSON
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// LOAD API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
// Error Handler
app.use(notFound);
app.use(errorHandler);

app.use(morgan("combined"));
const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  console.log(`server ${PORT} is connected...`);
});

// TESTING
// Load Product from server
// app.get("/api/products", (req, res) => {
//   res.json(products);
// });

// Single Product from server
// app.get("/api/products/:id", (req, res) => {
//   const product = products.find((p) => p._id === req.params.id);
//   res.json(product);
// });
