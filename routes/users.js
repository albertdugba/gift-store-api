const express = require("express");
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const User = require("../models/User");

const router = express.Router();
