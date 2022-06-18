const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandling");
const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticatedUser = catchAsyncError(async function (req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SEC);
  req.user = await User.findById(decodedData.id);

  next();
});

// authorize to acces the resource or not
exports.AuthorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role : ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
