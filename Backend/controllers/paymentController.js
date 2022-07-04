const catchAsyncErrors = require("../middleware/catchAsyncError");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const catchAsyncError = require("../middleware/catchAsyncError");
const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils");

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

exports.checkout = catchAsyncErrors(async (req, res, next) => {
  const options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.status(200).json({ sucess: true, order });
});

exports.paymentVerification = catchAsyncErrors(async (req, res, next) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const isVerified = validatePaymentVerification(
    { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
    razorpay_signature,
    process.env.RAZORPAY_API_SECRET
  );
  if (isVerified) {
    return res.redirect(
      `http://localhost:3000/success?referenceId=${razorpay_payment_id}`
    );
  } else res.status(400).json({ success: false });
});

exports.getRazorpayKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ success: true, keyId: process.env.RAZORPAY_API_KEY });
});
