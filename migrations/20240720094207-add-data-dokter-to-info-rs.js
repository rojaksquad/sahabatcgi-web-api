'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('InfoRs', 'data_dokter', {
      type: Sequelize.STRING,
      allowNull: true,  // You can set it to false if it should not be nullable
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('InfoRs', 'data_dokter');
  }
};
