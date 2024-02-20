"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: 'john@example',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: 'jane@example',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        firstName: "Michael",
        lastName: "Johnson",
        email: 'michael@example',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        firstName: "Emily",
        lastName: "Williams",
        email: 'emily@example',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        firstName: "David",
        lastName: "Brown",
        email: 'david@example',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async(queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};