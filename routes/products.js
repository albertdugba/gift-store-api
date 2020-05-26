const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProduct,
  createProducts,
  updateProducts,
  deleteProducts,
} = require("../controllers/products");

router.route("/").get(getAllProducts).post(createProducts);

router.route("/:id").get(getProduct).put(updateProducts).delete(deleteProducts);

module.exports = router;
