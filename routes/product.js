const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => {
  res.status(200).json({ message: "Product added successfully" });
});

module.exports = router;
