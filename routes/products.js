const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

const {
  getAllProducts,
  getProduct,
  createProducts,
  updateProducts,
  deleteProducts,
} = require("../controllers/products");

router
  .route("/")
  .get(getAllProducts)
  .post(protect, authorize("user,admin"), createProducts);

router
  .route("/:id")
  .get(getProduct)
  .put(protect, authorize("user,admin"), updateProducts)
  .delete(protect, authorize("user,admin"), deleteProducts);

module.exports = router;
