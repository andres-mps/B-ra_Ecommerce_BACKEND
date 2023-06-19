const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rutas relacionadas a los usuarios:
// ...

router.get("/token", userController.token);

router.post("/", userController.store);
router.patch("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;
