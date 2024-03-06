"use strict";

const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10; // Salt rounds for bcrypt
    const dummyEntries = Array.from({ length: 1 }).map((_, index) => {
      const plainPassword = faker.internet.password(); // Generate a random password

      // Hash the password using bcrypt
      const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);

      return {
        id: index + 1,
        email: `admin@elgeka.com`,
        password: hashedPassword, // Store the hashed password in the database
        full_name: `Admin ${index + 1}`,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    return queryInterface.bulkInsert("Admins", dummyEntries);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Admins", null, {});
  },
};
