"use strict";

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dummyEntries = Array.from({ length: 5 }).map((_, index) => {
      const dummyContent = faker.lorem.paragraph();
      const randomDate = faker.date.past();

      return {
        id: index + 1,
        title: `Kegiatan ${index + 1}`,
        content: dummyContent,
        image_url: `/images/KegiatanKomunitas${index + 1}.jpg`,
        date: randomDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    return queryInterface.bulkInsert("KegiatanKomunitas", dummyEntries);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("KegiatanKomunitas", null, {});
  },
};
