'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('KegiatanKomunitas', {
      fields: ['title'],
      type: 'unique',
      name: 'unique_title_constraint'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('KegiatanKomunitas', 'unique_title_constraint');
  }
};
