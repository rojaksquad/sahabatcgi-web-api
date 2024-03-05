'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the 'caption' column from the 'Quote' table
    await queryInterface.removeColumn('Quotes', 'caption');
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, you can define a 'down' method to revert the changes
    // For example, if you want to add back the 'caption' column
    // This is optional and depends on your specific requirements
  }
};
