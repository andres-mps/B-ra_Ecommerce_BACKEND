const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const atLeastOwner = require("../middlewares/atLeastOwner");

router.use(verifyToken);

router.get("/", isAdmin, orderController.index);
router.get("/:userId", atLeastOwner, orderController.show);

router.post("/:userId", orderController.store);
router.patch("/:id", isAdmin, orderController.update);
router.delete("/:id", isAdmin, orderController.destroy);

module.exports = router;
