'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Change field name from 'isActive' to 'is_active'
    await queryInterface.renameColumn('Pengurus', 'isActive', 'is_active');
  },

  async down(queryInterface, Sequelize) {
    // Revert field name change from 'is_active' to 'isActive'
    await queryInterface.renameColumn('Pengurus', 'is_active', 'isActive');
  }
};
