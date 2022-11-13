const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDatabase = require("./config/MongoDB");
const ImportData = require("./ImportData.js");
const productRoute = require("./routes/ProductRoutes");
const userRouter = require("./routes/UserRoutes");
const { errorHandler, notFound } = require("./middleware/Errors");
const orderRouter = require("./routes/OrderRoutes");
const categoryRouter = require("./routes/CategoryRoutes");
const contactRouter = require("./routes/ContactRoutes");
const passport = require("passport");
const cookieSession = require("cookie-session");
const OAuth2Router = require("./routes/OAuth2Routes");
require("./middleware/Passport");
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
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(
  cookieSession({ name: "session", keys: ["bon"], maxAge: 24 * 60 * 80 * 1000 })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "/public")));
// LOAD API
app.use("/api/v1/import", ImportData);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/auth", OAuth2Router);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
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
