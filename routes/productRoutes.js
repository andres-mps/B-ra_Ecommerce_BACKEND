const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.index);
router.get("/featured", productController.indexFeatured);
router.get("/:product", productController.show); //Hay que hacer el cambio de beers a products

// Sin uso momentaneamente, no borrar
// router.get("/crear", productController.create);
// router.post("/", productController.store);
// router.get("/:id/editar", productController.edit);
// router.patch("/:id", productController.update);
// router.delete("/:id", productController.destroy);

module.exports = router;
