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

  sendTokenResponse(user, 200, res);
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

  sendTokenResponse(user, 200, res);
});

//============== Forgot Password ==============================//
// @desc    Login User
// @route   POST /api/v1/auth/forgotpassword
// @access  Private'

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  // get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  res.status(200).json({ success: true, data: user });
});

// get token from user, send cookie
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
