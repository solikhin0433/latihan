const express = require('express');
const router = express.Router();
const bukuController = require ("../controller/Api/bukuController.js");
const { verifyToken, isAdmin } = require("../middleware/auth.js");

router.get("/", bukuController.index);
router.get("/:id", bukuController.show);
router.post("/", verifyToken, isAdmin, bukuController.store);
router.put("/:id", verifyToken, isAdmin, bukuController.update);
router.delete("/:id", verifyToken, isAdmin, bukuController.destroy);

module.exports = router;