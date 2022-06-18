const express = require("express");
const {
  createOrder,
  getOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const { isAuthenticatedUser, AuthorizeRole } = require("../middleware/auth");
const router = express.Router();

router.get("/order/:orderId", isAuthenticatedUser, getOrder);
router.post("/order/new", isAuthenticatedUser, createOrder);
router.get("/myOrders", isAuthenticatedUser, getMyOrders);
router.get(
  "/admin/orders",
  isAuthenticatedUser,
  AuthorizeRole("admin"),
  getAllOrders
);

router.put(
  "/admin/order/:orderId",
  isAuthenticatedUser,
  AuthorizeRole("admin"),
  updateOrderStatus
);
router.delete(
  "/admin/order/:orderId",
  isAuthenticatedUser,
  AuthorizeRole("admin"),
  deleteOrder
);
module.exports = router;
