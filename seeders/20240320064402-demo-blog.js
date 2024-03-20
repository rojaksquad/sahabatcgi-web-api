"use strict";

const { v4: uuidv4 } = require('uuid');
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dummyEntries = Array.from({ length: 5 }).map((_, index) => {
      const dummyContent = faker.lorem.paragraph();
      const authorId = uuidv4(); // Generate random UUID for author ID
      const authorName = faker.person.fullName(); // Generate random name for author name

      return {
        id: index + 1,
        author_id: authorId,
        author_name: authorName,
        title: `Blog ${index + 1}`,
        content: dummyContent,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    return queryInterface.bulkInsert("Blogs", dummyEntries);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Blogs", null, {});
  },
};
