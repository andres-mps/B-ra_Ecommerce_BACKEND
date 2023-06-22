const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.index);
//Dejarla como ultima!!! sino parametriza antes de entrar a las otras opciones de ruta luego de products
router.get("/:category", categoryController.show);
router.get("/admin/:category", categoryController.showCategory);
router.post("/create", categoryController.create);
router.patch("/admin/update/:category", categoryController.update);
router.delete("/:id", categoryController.destroy);

module.exports = router;
