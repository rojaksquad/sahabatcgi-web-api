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
        title: `Donasi ke ELGEKA JABAR`,
        image_url: `/images/donasi.jpg`,
        content: dummyContent,
        donate_link: `http://www.donasi.com/elgekajabar`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    return queryInterface.bulkInsert("Donasis", dummyEntries);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Donasis", null, {});
  },
};
