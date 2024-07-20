'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Alter the existing ENUM type to include 'GIST'
    await queryInterface.sequelize.query(
      `ALTER TYPE "enum_Berita_kategori" ADD VALUE 'GIST';`
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Remove 'GIST' from the ENUM type
    await queryInterface.sequelize.query(
      `ALTER TYPE "enum_Berita_kategori" DROP VALUE 'GIST';`
    );
  }
};
