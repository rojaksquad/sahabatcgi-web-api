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
        title: `Profil ${index + 1}`,
        content: dummyContent,
        image_url: `/images/profil.jpg`,
        ig_link: `http://www.instagram.com/elgekajabar`,
        twitter_link: `http://www.twitter.com/elgekajabar`,
        fb_link: `http://www.facebook.com/elgekajabar`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    return queryInterface.bulkInsert("ProfilKomunitas", dummyEntries);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ProfilKomunitas", null, {});
  },
};
