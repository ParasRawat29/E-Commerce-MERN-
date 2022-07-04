const express = require("express");
const {
  checkout,
  getRazorpayKey,
  paymentVerification,
} = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.post("/payment/process", isAuthenticatedUser, checkout);
router.get("/payment/key", isAuthenticatedUser, getRazorpayKey);
router.post(
  "/payment/paymentverification",
  isAuthenticatedUser,
  paymentVerification
);

module.exports = router;
