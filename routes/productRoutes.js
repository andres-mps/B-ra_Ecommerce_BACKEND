const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");

router.get("/", productController.index);
router.get("/featured", productController.indexFeatured);
router.get("/admin/", productController.indexAdmin);
router.get("/:product", productController.show);

router.use(verifyToken);
router.post("/", isAdmin, productController.store);
router.patch("/:product", isAdmin, productController.update);
router.delete("/:product", isAdmin, productController.destroy);

module.exports = router;
