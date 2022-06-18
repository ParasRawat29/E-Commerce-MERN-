const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandling");

// create new Order
exports.createOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalAmount,
    orderStatus,
  } = req.body;
  // const user = req.user.id
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalAmount,
    orderStatus,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({ success: true, order });
});

// get single order --admin
exports.getOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId)
    .populate("user", "name email")
    .populate("orderItems.product", "price");
  if (!order) {
    return next(new ErrorHandler("No order Found ", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//get logged in user order
exports.getMyOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
});

// get all orders --Admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  const totalAmount = orders.reduce((acc, curr) => {
    return acc + curr.totalAmount;
  }, 0);
  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});

// update order status
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);
  console.log(req.body);
  if (!order) {
    return next(new ErrorHandler("No Order Exist", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order Already Delivered", 400));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;

  if (order.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(201).json({
    success: true,
    order,
  });
});
// update stock
const updateStock = async (productId, quantity) => {
  const product = await Product.findById(productId);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
  return;
};

// delete order
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    return next(new ErrorHandler("No Such Order", 404));
  }
  await order.remove();
  res.status(201).json({
    success: true,
  });
});
