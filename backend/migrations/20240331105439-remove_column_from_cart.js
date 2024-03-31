'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the 'orderId' column from the 'cart' table
    await queryInterface.removeColumn('cart', 'orderId');
  },

  down: async (queryInterface, Sequelize) => {
    // If you need to revert the migration, you can add the 'orderId' column back to the 'cart' table
    await queryInterface.addColumn('cart', 'orderId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'orders', // Assuming 'orders' is the name of the referenced table
        key: 'id'       // Assuming 'id' is the primary key of the referenced table
      }
    });
  }
};
