const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
  getAllProducts,
  getProduct,
  createProducts,
  updateProducts,
  deleteProducts,
} = require("../controllers/products");

router.route("/").get(getAllProducts).post(protect, createProducts);

router
  .route("/:id")
  .get(getProduct)
  .put(protect, updateProducts)
  .delete(protect, deleteProducts);

module.exports = router;
