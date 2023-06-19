const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const atLeastOwner = require("../middlewares/atLeastOwner");

router.use(verifyToken);

router.get("/", isAdmin, orderController.index);
router.get("/:userId", atLeastOwner, orderController.index);

router.post("/", orderController.store);
router.patch("/:id", orderController.update);
router.delete("/:id", orderController.destroy);

module.exports = router;
