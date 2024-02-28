"use strict";

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dummyEntries = Array.from({ length: 1 }).map((_, index) => {
      const dummyContent = faker.lorem.paragraph();
      const randomDate = faker.date.past();

      return {
        id: index + 1,
        title: `Aturan ${index + 1}`,
        content: dummyContent,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    return queryInterface.bulkInsert("AturanBlogs", dummyEntries);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("AturanBlogs", null, {});
  },
};
