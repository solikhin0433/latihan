const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../models");

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validasi input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email dan password diperlukan",
        });
      }

      // Cari user berdasarkan email
      const user = await db.User.findOne({
        where: { email },
        include: [
          {
            model: db.Level,
            as: "level",
            attributes: ["id", "name", "description"],
          },
        ],
      });

      // Jika user tidak ditemukan
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Email atau password tidak valid",
        });
      }

      // Verifikasi password
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Email atau password tidak valid",
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, levelId: user.levelId },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h", // Token berlaku 24 jam
        }
      );

      // Response dengan token
      res.status(200).json({
        success: true,
        message: "Login berhasil",
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            level: user.level,
          },
          token,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error saat login",
        error: error.message,
      });
    }
  },

  async logout(req, res) {
    // Dalam implementasi JWT sederhana, logout di sisi server tidak diperlukan
    // karena token disimpan di client
    // Namun bisa ditambahkan ke blacklist jika diperlukan

    res.status(200).json({
      success: true,
      message: "Logout berhasil",
    });
  },
};