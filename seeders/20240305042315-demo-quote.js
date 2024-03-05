"use strict";

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dummyEntries = Array.from({ length: 5 }).map((_, index) => {
      const dummyQuote = faker.lorem.paragraph();

      return {
        id: index + 1,
        author_name: `Author ${index + 1}`,
        image_url: `/images/Quote${index + 1}.jpg`,
        quote: dummyQuote,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    return queryInterface.bulkInsert("Quotes", dummyEntries);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Quotes", null, {});
  },
};
