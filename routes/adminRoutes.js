const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/token", adminController.token);
router.get("/", adminController.index);

router.post("/", adminController.store);
router.patch("/:id", adminController.update);
router.delete("/:id", adminController.destroy);

module.exports = router;
