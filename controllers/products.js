const Product = require("../models/Product");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc   Get All Products
// @route  GET /api/v1/products
// @access  Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res
    .status(200)
    .json({ success: true, count: products.length, data: products });
});

// @desc   Get A Single Products
// @route  GET /api/v1/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorResponse(
        `Product cannot be found with Id of ${req.params.id}`,
        404,
      ),
    );
  }

  res.status(200).json({ success: true, data: product });
});

// @desc   Create All Products
// @route  POST /api/v1/products
// @access  Private
exports.createProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
});

// @desc   Update All Products
// @route  UPDATE /api/v1/products/:id
// @access Private
exports.updateProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(
      new ErrorResponse(
        `Product cannot be found with Id of ${req.params.id}`,
        404,
      ),
    );
  }

  res.status(200).json({ success: true, data: product });
});

// @desc   Delete All Products
// @route  DELETE /api/v1/products
// @access Private
exports.deleteProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(
      new ErrorResponse(
        `Product cannot be found with Id of ${req.params.id}`,
        404,
      ),
    );
  }

  res.status(200).json({ success: true, data: {} });
});
