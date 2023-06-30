const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");

router.get("/", categoryController.index);
router.get("/admin/", categoryController.indexAdmin);

//Dejarla como ultima!!! sino parametriza antes de entrar a las otras opciones de ruta luego de products
router.get("/:category", categoryController.show);
//Ruta para obtener info de una categoria al edit
router.get("/admin/:category", categoryController.showCategory);

router.use(verifyToken);
//Ruta para crear categoria
router.post("/admin/create", isAdmin, categoryController.store);
//Ruta para actualizar una categoria
router.patch("/admin/update/:category", isAdmin, categoryController.update);
//Ruta para eliminar una categoria
router.delete("/admin/:id", isAdmin, categoryController.destroy);

module.exports = router;
