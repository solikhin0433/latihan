const bcrypt = require("bcrypt");
const db = require("../../models");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await db.User.findAll({
        include: [
          {
            model: db.Level,
            as: "level",
            attributes: ["id", "name", "description"],
          },
        ],
        attributes: { exclude: ["password"] },
      });

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching users",
        error: error.message,
      });
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await db.User.findByPk(id, {
        include: [
          {
            model: db.Level,
            as: "level",
            attributes: ["id", "name", "description"],
          },
        ],
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching user",
        error: error.message,
      });
    }
  },

  async createUser(req, res) {
    try {
      const { name, email, password, levelId } = req.body;

      // Hash password
      const hashedPassword = bcrypt.hashSync(password, 8);

      const user = await db.User.create({
        name,
        email,
        password: hashedPassword,
        levelId,
      });

      // Return user without password
      const userResponse = await db.User.findByPk(user.id, {
        include: [
          {
            model: db.Level,
            as: "level",
            attributes: ["id", "name", "description"],
          },
        ],
        attributes: { exclude: ["password"] },
      });

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: userResponse,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating user",
        error: error.message,
      });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password, levelId } = req.body;

      const user = await db.User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const updateData = { name, email, levelId };

      // Hash password if provided
      if (password) {
        updateData.password = bcrypt.hashSync(password, 8);
      }

      await user.update(updateData);

      // Return updated user without password
      const userResponse = await db.User.findByPk(id, {
        include: [
          {
            model: db.Level,
            as: "level",
            attributes: ["id", "name", "description"],
          },
        ],
        attributes: { exclude: ["password"] },
      });

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: userResponse,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating user",
        error: error.message,
      });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await db.User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      await user.destroy();

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting user",
        error: error.message,
      });
    }
  },
};