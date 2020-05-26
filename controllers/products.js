// @desc   Get All Products
// @route  GET /api/v1/products
// @access  Public
exports.getAllProducts = (req, res, next) => {
  res.status(200).json({ success: true, msg: `All products` });
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
exports.createProducts = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Create product ${req.params.id}` });
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
