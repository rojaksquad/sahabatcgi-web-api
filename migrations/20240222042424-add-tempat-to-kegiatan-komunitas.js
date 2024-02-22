'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('KegiatanKomunitas', 'tempat', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('KegiatanKomunitas', 'tempat');
  }
};
