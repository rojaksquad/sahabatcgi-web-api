'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ProfilKomunitas', 'email_komunitas', {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    });
    await queryInterface.addColumn('ProfilKomunitas', 'kontak_komunitas', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ProfilKomunitas', 'email_komunitas');
    await queryInterface.removeColumn('ProfilKomunitas', 'kontak_komunitas');
  }
};
