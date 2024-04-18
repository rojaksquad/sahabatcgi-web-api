"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dummyEntries = Array.from({ length: 5 }).map((_, index) => {
      return {
        id: index + 1,
        nama_rs: `rumah sakit ` + index + 1,
        lokasi_rs: `lokasi rumahsakit` + index + 1,
        image_url: `/images/rumahsakit${index + 1}.jpg`,
        link_maps: `https://maps.google.com/`,
        latlong: `17770, 292094`,
        info_kontak: `0829478339184`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    return queryInterface.bulkInsert("InfoRs", dummyEntries);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("InfoRs", null, {});
  },
};
