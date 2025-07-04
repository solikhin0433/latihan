'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('buku', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id',
      },
      judul: {
        type: Sequelize.STRING(200),
        allowNull: false,
        field: 'judul'
      },
      penulis: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'penulis'
      },
      penerbit: {
        type: Sequelize.STRING(100),
        allowNull: true,
        field: 'penerbit'
      },
      tahunTerbit: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'tahun_terbit'
      },
      isbn: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: true,
        field: 'isbn'
      },
      jumlahHalaman: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'jumlah_halaman'
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'deskripsi'
      },
      kategoriBukuId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        field: 'kategori_buku_id',
        references: {
          model: 'kategoriBuku',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at',
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('buku');
  }
};
