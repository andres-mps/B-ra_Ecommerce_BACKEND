const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const isOwner = require("../middlewares/isOwner");

router.post("/token", userController.token);
router.post("/", userController.store);

//router.use(verifyToken);

router.patch("/:id", /*isOwner,*/ userController.update);
router.delete("/:id", /*isOwner,*/ userController.destroy);

module.exports = router;
