"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Buku extends Model {
    static associate(models) {
      // Relasi dengan KategoriBuku
      Buku.belongsTo(models.KategoriBuku, {
        foreignKey: 'kategoriBukuId',
        as: 'kategori'
      });
    }
  }
  
  Buku.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      judul: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      penulis: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      penerbit: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      tahunTerbit: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'tahun_terbit'
      },
      isbn: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
      },
      jumlahHalaman: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'jumlah_halaman'
      },
      deskripsi: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      kategoriBukuId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'kategori_buku_id'
      },
    },
    {
      sequelize,
      modelName: "Buku",
      tableName: "buku",
      underscored: true,
    }
  );
  
  return Buku;
};