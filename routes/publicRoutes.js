const express = require("express");
const router = express.Router();
const { featuredProducts, categories } = require("../controllers/pagesController");

router.get("/products/featured", featuredProducts);
router.get("/products/categories", categories);

module.exports = router;
