'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Admins', 'email', 'username');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Admins', 'username', 'email');
  }
};
