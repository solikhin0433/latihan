'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('kategoriBuku', [
      {
        nama_kategori: 'Fiction',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nama_kategori: 'Non-Fiction',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nama_kategori: 'Science',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nama_kategori: 'Technology',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nama_kategori: 'Biography',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('kategoriBuku', null, {});
  }
};
