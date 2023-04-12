const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandling");
const cloudinary = require("cloudinary");

// post product --admin
exports.postProduct = catchAsyncError(async (req, res, next) => {
  let images = req.body.images;
  let imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLink.push({
      public_id: result.public_id,
      image_url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id;

  const product = await Product.create({ ...req.body, createdBy: req.user.id });
  res.status(201).json({
    success: true,
    product,
  });
});

// Update product --admin
exports.updateProduct = async (req, res, next) => {
  const prodId = req.params.productId;

  let product = await Product.findById(prodId);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  let images = req.body.images;
  if (images.length > 0) {
    //delete product images from cloudinary
    const imagesLinks = []; // for database

    // upload new photos to cloudinary
    for (let i = 0; i < images.length; i++) {
      console.log("images ", images[i]);
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      console.log("result--->", result);
      imagesLinks.push({
        public_id: result.public_id,
        image_url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(prodId, req.body, {
    runValidators: true,
    new: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Product Updated",
    product,
  });
};

// Delete product --admin
exports.deleteProduct = async (req, res) => {
  const prodId = req.params.productId;
  const product = await Product.findById(prodId);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  } else {
    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product Deleted",
    });
  }
};

exports.getProducts = async (req, res, next) => {
  const ITEM_PER_PAGE = 5;
  const totalProductsCount = await Product.countDocuments();
  const apifeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apifeature.query;
  let filteredProductsCount = products.length;
  apifeature.pagination(ITEM_PER_PAGE);
  products = await apifeature.query.clone();

  res.status(201).json({
    success: true,
    products,
    totalProductsCount,
    filteredProductsCount,
    ITEM_PER_PAGE,
  });
};

// Single product --admin
exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await Product.findById(prodId).populate(
    "reviews.user",
    "avatar"
  );
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  } else {
    res.status(201).json({
      success: true,
      product,
    });
  }
};

// get all products --admin
exports.getAllAdminProducts = async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({
    success: true,
    products,
  });
};

// create or update product review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  let review = {
    user: req.user._id,
    rating: Number(rating),
    name: req.user.name,
    comment,
  };
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (req.user._id.toString() === rev.user.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.numberOfReviews;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//get all product reviews
exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  console.log(product.reviews);
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let updatesReviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id
  );

  product.reviews = updatesReviews;
  product.numberOfReviews = updatesReviews.length;

  let total = 0;
  product.reviews.forEach((rev) => {
    total += rev.rating;
  });

  product.ratings = total / product.numberOfReviews;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});
