const express = require("express");
const router = express.Router();
const { featuredProducts } = require("../controllers/pagesController");

router.get("/products/featured", featuredProducts);

module.exports = router;
