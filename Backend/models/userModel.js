const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: [true, "enter your name"],
    maxLength: [30, "cannot exceed 30 characters"],
    minLength: [4, "name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "enter your Email ID"],
    unique: true,
    validate: [validator.isEmail, "enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "enter your password"],
    minLength: [5, "password should be 5 charaters long"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      reqired: true,
    },
    image_url: {
      type: String,
      default: null,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPassword: String,
  resetPasswordExpire: Date,
});

// generate JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SEC, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};

// compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
