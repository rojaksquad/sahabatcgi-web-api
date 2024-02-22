'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('KegiatanKomunitas', 'date', {
      type: Sequelize.DATEONLY
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('KegiatanKomunitas', 'date', {
      type: Sequelize.DATE
    });
  }
};
