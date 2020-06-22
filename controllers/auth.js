const crypto = require("crypto");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const sendEmail = require("../utils/sendEmail");

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

// @desc   Get current logged in User
// @route  GET /api/v1/auth/me
// @access  Private

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.json({ success: true, data: user });
});

// @desc   Update User Details
// @route  PUT /api/v1/auth/me
// @access  Private

exports.updateUserDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.json({ success: true, data: user });
});

//============== Forgot Password ==============================//
// @desc    Login User
// @route   POST /api/v1/auth/forgotpassword
// @access  Private'

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  const resetToken = user.getResetPasswordToken();

  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  // create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host",
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you 
  (or someone else) has requested to reset the password.
   Please reset your password using this link:\n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json({ success: true, data: "Email sent" });
  } catch (error) {
    console.error(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email could not be sent", 500));
  }

  // get reset token

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

//============== Reset Password Link ==============================//
// @desc  Reset Password
// @route  POST /api/v1/auth/resetpassword/:resettoken
// @access  Public

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // get hashed token

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  // create a user
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendTokenResponse(user, 200, res);
});
