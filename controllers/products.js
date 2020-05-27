const Product = require("../models/Product");

// @desc   Get All Products
// @route  GET /api/v1/products
// @access  Public
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false });
    console.error(error);
  }
};

// @desc   Get A Single Products
// @route  GET /api/v1/products/:id
// @access  Public
exports.getProduct = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show product ${req.params.id}` });
};
// @desc   Create All Products
// @route  POST /api/v1/products
// @access  Private
exports.createProducts = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false });
    console.error(error);
  }
};
// @desc   Update All Products
// @route  UPDATE /api/v1/products/:id
// @access Private
exports.updateProducts = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update product ${req.params.id}` });
};
// @desc   Delete All Products
// @route  DELETE /api/v1/products
// @access Private
exports.deleteProducts = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete product ${req.params.id}` });
};
