const express = require('express');
const router = express.Router();
const kategoriBukuController = require("../controller/Api/kategoriBukuController.js");
const {verifyToken, isAdmin} = require("../middleware/auth.js");

router.get("/", kategoriBukuController.index);
router.get("/:id", kategoriBukuController.show);
router.post("/", verifyToken, isAdmin, kategoriBukuController.store);
router.put("/:id", verifyToken, isAdmin, kategoriBukuController.update);
router.delete("/:id", verifyToken, isAdmin, kategoriBukuController.destroy);

module.exports = router;