"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John Doe",
          email: "john@email.com",
          password: bcrypt.hashSync("password123", 8),
          levelId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane Smith",
          email: "jane@email.com",
          password: bcrypt.hashSync("password123", 8),
          levelId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bob Wilson",
          email: "bob@email.com",
          password: bcrypt.hashSync("password123", 8),
          levelId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
