"use strict";

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dummyEntries = Array.from({ length: 5 }).map((_, index) => {
      const dummyContent = faker.lorem.paragraph();
      const dummyKategori = faker.helpers.arrayElement(['perkembanganKomunitas', 'perkembanganCML']);

      return {
        id: index + 1,
        title: `Berita ${index + 1}`,
        content: dummyContent,
        image_url: `/images/Berita${index + 1}.jpg`,
        kategori: dummyKategori,
        doi_link: 'https://www.google.com',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    return queryInterface.bulkInsert("Berita", dummyEntries);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Berita", null, {});
  },
};
