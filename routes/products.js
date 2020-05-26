const express = require("express");
const router = express.Router();

router.get("/api/v1/products", (req, res) => {
  res.status(200).json({ success: true, msg: `All products` });
});
router.get("/api/v1/products/:id", (req, res) => {
  res.status(200).json({ success: true, msg: `Show product ${req.params.id}` });
});
router.post("/api/v1/products/create", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Create product ${req.params.id}` });
});
router.put("/api/v1/products/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update product ${req.params.id}` });
});
router.delete("/api/v1/products/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete product ${req.params.id}` });
});

module.exports = router;
