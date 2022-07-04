const cloudinary = require("cloudinary");
const bcryptjs = require("bcryptjs");

const Product = require("../models/productModel");
const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandling");
const sendToken = require("../utils/jwtToken");

// Register User
exports.registerUser = catchAsyncError(async (req, res) => {
  const { name, email } = req.body;
  const hashedPassWord = await bcryptjs.hash(req.body.password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassWord,
    avatar: {
      public_id: "This is public Id",
      image_url: "This is avatar url",
    },
  });
  sendToken(user, req, res, 201);
});

// Sign In user
exports.signUser = catchAsyncError(async (req, res, next) => {
  console.log("in sign in");
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Enter Email or Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, req, res, 200);
});

// Logout User
exports.logout = catchAsyncError(async (req, res, next) => {
  // make cookie token value as null
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logout Succesful",
  });
});

// get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
});

// update password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isMatchedPassword = await user.comparePassword(req.body.oldPassword);
  if (isMatchedPassword === false) {
    return next(new ErrorHandler("Password incorrect", 400));
  }

  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new ErrorHandler("Password did not match", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, req, res, 200);
});

// update user profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newData = {
    name: req.body.newName,
    email: req.body.newEmail,
  };
  // saving new photo in cloud and removing the old one
  if (req.body.avatar != "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: "150",
      crop: "scale",
    });

    newData.avatar = {
      public_id: myCloud.public_id,
      image_url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    runValidators: true,
    new: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, user });
});

// get all users (admin)
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// get single users (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`No User Exists with Id:${req.params.id}`));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// update user role (admin)
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  await User.findByIdAndUpdate(req.params.id, newData, {
    runValidators: true,
    new: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true });
});

// delete user (admin)
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`No User Exists with Id:${req.params.id}`));
  }
  // coludinary se dleete karn hai photo

  await user.remove();
  res.status(200).json({ success: true });
});
