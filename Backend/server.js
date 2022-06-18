const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();
let server;

// uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to uncaught Exception`);
  process.exit(1);
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  console.log("database connected");
  server = app.listen(process.env.PORT || "5000", () => {
    console.log(`server running at port ${process.env.PORT}`);
  });
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit();
  });
});
