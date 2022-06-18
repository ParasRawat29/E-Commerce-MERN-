const express = require("express");
const {
  registerUser,
  signUser,
  logout,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUserRole,
} = require("../controllers/userController");
const { isAuthenticatedUser, AuthorizeRole } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/signin", signUser);
router.get("/logout", logout);
router.get("/profile", isAuthenticatedUser, getUserDetails);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.put("/profile/update", isAuthenticatedUser, updateProfile);
router.get(
  "/admin/getAllUsers",
  isAuthenticatedUser,
  AuthorizeRole("admin"),
  getAllUsers
);
router.get(
  "/admin/getSingleUser/:id",
  isAuthenticatedUser,
  AuthorizeRole("admin"),
  getSingleUser
);
router.put(
  "/admin/updateUserRole/:id",
  isAuthenticatedUser,
  AuthorizeRole("admin"),
  updateUserRole
);
router.delete(
  "/admin/deleteUser/:id",
  isAuthenticatedUser,
  AuthorizeRole("admin"),
  deleteUser
);

module.exports = router;
