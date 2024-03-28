'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ProfilKomunitas', 'visi', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('ProfilKomunitas', 'misi', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ProfilKomunitas', 'visi');
    await queryInterface.removeColumn('ProfilKomunitas', 'misi');
  }
};
