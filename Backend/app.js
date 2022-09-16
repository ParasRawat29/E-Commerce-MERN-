const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const errorMiddleware = require("./middleware/Error");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

//CONFIG
const app = express();

require("dotenv").config();
app.use(cors());
app.use(
  bodyParser.urlencoded({ extended: true, limit: "500mb", extended: true })
);

app.use(express.json({ limit: "500mb" }));
app.use(cookieParser());
app.use(fileUpload());

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);

/**************          DEPLOY          ************************ */
app.use(express.static(path.join(__dirname, "../Frontend/build")));
console.log(path.join(__dirname, "../Frontend/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../Frontend/build/index.html"));
});

app.use(errorMiddleware);

module.exports = app;
