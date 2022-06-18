const express = require("express");
const {
  processPayment,
  getStripeAPIkey,
} = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.post("/payment/process", isAuthenticatedUser, processPayment);
router.get("/stripeApiKey", isAuthenticatedUser, getStripeAPIkey);

module.exports = router;
