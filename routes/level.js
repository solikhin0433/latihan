const express = require("express");
const router = express.Router();
const levelController = require("../controller/Api/levelcontroller.js");
const {verifyToken, isAdmin} = require("../middleware/auth.js");


// Hapus baris yang error ini: router.post('/login', loginController.login)
router.get("/", levelController.getAllLevels);
router.get("/:id", levelController.getLevelById);
// router.post("/", levelController.createLevel);
// router.put("/:id", levelController.updateLevel);
// router.delete("/:id", levelController.deleteLevel);
// Protected routes
router.post("/", verifyToken, isAdmin, levelController.createLevel);
router.put("/:id", verifyToken, isAdmin, levelController.updateLevel);
router.delete("/:id", verifyToken, isAdmin, levelController.deleteLevel);
module.exports = router;
