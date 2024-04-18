'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InfoRs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_rs: {
        type: Sequelize.STRING
      },
      lokasi_rs: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      link_maps: {
        type: Sequelize.TEXT
      },
      latlong: {
        type: Sequelize.TEXT
      },
      info_kontak: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('InfoRs');
  }
};