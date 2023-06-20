const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.index);
router.get("/featured", productController.indexFeatured);
router.get("/:product", productController.show);

router.post("/", productController.store);
router.patch("/:id", productController.update);
router.delete("/:id", productController.destroy);

module.exports = router;
