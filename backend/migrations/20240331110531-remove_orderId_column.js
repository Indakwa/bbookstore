'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cart', 'orderId', {
      type: Sequelize.INTEGER,
      allowNull: true // Modify as per your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('cart', 'orderId');
  }
};
