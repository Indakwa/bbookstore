'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add CartItems and TotalPrice columns to the Transaction table
    await queryInterface.addColumn('transaction', 'CartItems', {
      type: Sequelize.JSON,
      allowNull: false
    });
    
    await queryInterface.addColumn('transaction', 'TotalPrice', {
      type: Sequelize.FLOAT,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove CartItems and TotalPrice columns from the Transaction table
    await queryInterface.removeColumn('transaction', 'CartItems');
    await queryInterface.removeColumn('transaction', 'TotalPrice');
  }
};
