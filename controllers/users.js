const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");

//============== Admin User ==============================//
// @desc  Register User
// @route  POST /api/v1/auth/users
// @access  Private/Admin

exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//============== Get a Single User ==============================//
// @desc  Register User
// @route  POST /api/v1/auth/user/:id
// @access  Private/Admin

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({ sucess: true, data: user });
});

//============== Create User ==============================//
// @desc  Register User
// @route  POST /api/v1/auth/users
// @access  Private/Admin

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({ sucess: true, data: user });
});

//============== Update User ==============================//
// @desc  Register User
// @route  PUT /api/v1/auth/users/:id
// @access  Private/Admin

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({ sucess: true, data: user });
});

//============== Delete User ==============================//
// @desc  Register User
// @route  DELETE /api/v1/auth/users/:id
// @access  Private/Admin

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res.status(201).json({ sucess: true, data: {} });
});
