"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class KategoriBuku extends Model {
    static associate(models) {
      // Relasi dengan model buku
          KategoriBuku.hasMany(models.Buku, {
          foreignKey: 'kategoriBukuId',
          as: 'buku'
          });
    }
  }
  
  KategoriBuku.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      namaKategori: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'nama_kategori'
      },
    },
    {
      sequelize,
      modelName: "KategoriBuku",
      tableName: "kategoriBuku",
      underscored: true, // Menggunakan snake_case untuk field names
    }
  );
  
  return KategoriBuku;
};