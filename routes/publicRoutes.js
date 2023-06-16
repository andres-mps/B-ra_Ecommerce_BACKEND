const express = require("express");
const router = express.Router();
const {
  featuredProducts,
  categories,
  products,
  styleProducts,
} = require("../controllers/pagesController");

router.get("/products", products);
router.get("/products/featured", featuredProducts);
router.get("/products/categories", categories);

//Dejarla como ultima!!! sino parametriza antes de entrar a las otras opciones de ruta luego de products
router.get("/products/:style", styleProducts);

module.exports = router;
