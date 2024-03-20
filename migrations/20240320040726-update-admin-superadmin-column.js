'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Admins', 'superAdmin', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false // Default value for the superAdmin column
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Admins', 'superAdmin');
  }
};
