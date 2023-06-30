const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");

router.post("/token", adminController.token);

router.use(verifyToken);
router.use(isAdmin);

router.get("/", adminController.index);

router.get("/:id", adminController.indexAdmin);
router.post("/create", adminController.store);
router.patch("/update/:id", adminController.update);
router.delete("/:id", adminController.destroy);

module.exports = router;
