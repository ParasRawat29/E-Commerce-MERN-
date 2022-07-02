const mongoose = require("mongoose");

const schema = mongoose.Schema;

const productSchema = new schema({
  name: {
    type: String,
    required: [true, "enter name of product"],
  },
  description: {
    type: String,
    required: [true, "enter description of the product"],
  },
  price: {
    type: Number,
    required: [true, "enter price of product"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        reqired: true,
      },
      image_url: {
        type: String,
        reqired: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "enter product category"],
  },
  stock: {
    type: Number,
    maxLength: [4, "cannot exceed 3 characters"],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        reqired: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
