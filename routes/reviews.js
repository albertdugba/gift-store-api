const Product = require("../models/Product");
const Review = require("../models/Review");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc   Get All Reviews
// @route  GET /api/v1/product/:productId
// @access  Public
exports.getAllReviews = asyncHandler(async (req, res, next) => {
  if (req.params.productId) {
    const reviews = Review.find({ product: req.params.id });
    res
      .status(200)
      .json({ sucess: true, count: reviews.length, data: reviews });
  } else {
    res.status(200).json(res.advancedResults);
  }
});
