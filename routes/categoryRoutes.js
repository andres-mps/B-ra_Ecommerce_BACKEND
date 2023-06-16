const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/categories", categoryController.index);

//Dejarla como ultima!!! sino parametriza antes de entrar a las otras opciones de ruta luego de products
router.get("/categories/:category", categoryController.show);

// Sin uso momentaneamente, no borrar
// router.get("/crear", productController.create);
// router.post("/", productController.store);
// router.get("/:id/editar", productController.edit);
// router.patch("/:id", productController.update);
// router.delete("/:id", productController.destroy);

module.exports = router;
