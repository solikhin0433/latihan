const db = require("../../models");

module.exports = {
  async getAllLevels(req, res) {
    try {
      const levels = await db.Level.findAll();
      res.status(200).json({
        success: true,
        data: levels,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching levels",
        error: error.message,
      });
    }
  },

  async getLevelById(req, res) {
    try {
      const { id } = req.params;
      const level = await db.Level.findByPk(id);

      if (!level) {
        return res.status(404).json({
          success: false,
          message: "Level not found",
        });
      }

      res.status(200).json({
        success: true,
        data: level,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching level",
        error: error.message,
      });
    }
  },

  async createLevel(req, res) {
    try {
      const { name, description } = req.body;
      const level = await db.Level.create({
        name,
        description,
      });

      res.status(201).json({
        success: true,
        message: "Level created successfully",
        data: level,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating level",
        error: error.message,
      });
    }
  },

  async updateLevel(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const level = await db.Level.findByPk(id);
      if (!level) {
        return res.status(404).json({
          success: false,
          message: "Level not found",
        });
      }

      await level.update({ name, description });

      res.status(200).json({
        success: true,
        message: "Level updated successfully",
        data: level,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating level",
        error: error.message,
      });
    }
  },

  async deleteLevel(req, res) {
    try {
      const { id } = req.params;
      const level = await db.Level.findByPk(id);

      if (!level) {
        return res.status(404).json({
          success: false,
          message: "Level not found",
        });
      }

      await level.destroy();

      res.status(200).json({
        success: true,
        message: "Level deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting level",
        error: error.message,
      });
    }
  },
};
