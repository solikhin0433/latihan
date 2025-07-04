const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = {
  verifyToken(req, res, next) {
    // Ambil token dari header Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer TOKEN"

    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Token diperlukan untuk autentikasi",
      });
    }

    try {
      // Verifikasi token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        error: error.message,
      });
    }
  },

  isAdmin(req, res, next) {
    // Setelah verifyToken, cek apakah user adalah admin
    if (req.user.levelId !== 1) {
      return res.status(403).json({
        success: false,
        message: "Akses ditolak. Hanya Admin yang diizinkan.",
      });
    }
    next();
  },
};