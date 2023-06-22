const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.index);
router.get("/admin/", productController.indexAdmin);
router.get("/featured", productController.indexFeatured);
router.get("/:product", productController.show);

router.post("/", productController.store);
router.patch("/:product", productController.update);
router.delete("/:product", productController.destroy);

module.exports = router;
