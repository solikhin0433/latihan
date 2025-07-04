const express = require("express");
const router = express.Router();
const userController = require("../controller/Api/usercontroller.js");
const { verifyToken, isAdmin } = require("../middleware/auth.js");

// router.get("/", userController.getAllUsers);
// router.get("/:id", userController.getUserById);
// router.post("/", userController.createUser);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);
router.get("/", verifyToken, userController.getAllUsers);
router.get("/:id", verifyToken, userController.getUserById);
router.post("/", verifyToken, isAdmin, userController.createUser);
router.put("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, isAdmin, userController.deleteUser);

module.exports = router;
