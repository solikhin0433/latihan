"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "levels",
      [
        {
          name: "Admin",
          description: "Administrator",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "User",
          description: "Regular User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Guest",
          description: "Guest User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("levels", null, {});
  },
};
