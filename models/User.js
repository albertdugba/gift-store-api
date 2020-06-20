const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },

  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "seller"],
    default: "user",
  },

  password: {
    type: String,
    required: [true, "Please add a password"],
    minLength: 6,
    select: false,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password
UserSchema.pre("save", async function (next) {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);

  next();
});

// Sign JWT token
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match entered passwords to a hashed password in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bycrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
