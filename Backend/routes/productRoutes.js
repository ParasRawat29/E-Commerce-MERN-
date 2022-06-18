const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProduct,
  getIndex,
  postProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getAllReviews,
  deleteReview,
  getAllAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, AuthorizeRole } = require("../middleware/auth");

router.get("/products", getProducts);
router.get("/product/:productId", getProduct);
router.get(
  "/admin/products",
  isAuthenticatedUser,
  AuthorizeRole("admin"),
  getAllAdminProducts
);
router.post(
  "/add-product",
  isAuthenticatedUser,
  AuthorizeRole("admin"),
  postProduct
);
router.put(
  "/update-product/:productId",
  isAuthenticatedUser,
  AuthorizeRole("admin"),
  updateProduct
);
router.delete(
  "/delete-product/:productId",
  isAuthenticatedUser,
  AuthorizeRole("admin"),
  deleteProduct
);

router.put("/review/new", isAuthenticatedUser, createProductReview);
router.get("/reviews", isAuthenticatedUser, getAllReviews);
router.delete(
  "/delete",
  isAuthenticatedUser,
  AuthorizeRole("admin"),
  deleteReview
);

module.exports = router;
