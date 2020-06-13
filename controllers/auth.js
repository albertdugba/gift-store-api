const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

//============== Register User ==============================//
// @desc  Register User
// @route  POST /api/v1/auth/register
// @access  Private

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // create a user
  const user = await User.create({ name, email, password, role });

  // create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

//============== Login User ==============================//
// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Private

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credientials", 401));
  }

  // check if user password matches entered password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credientials", 401));
  }

  // create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
