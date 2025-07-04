"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    static associate(models) {
      Level.hasMany(models.User, {
        foreignKey: "levelId",
        as: "users",
      });
    }
  }
  Level.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Level",
      tableName: "levels",
    }
  );
  return Level;
};
