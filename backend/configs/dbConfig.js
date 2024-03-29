const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('bbookstore', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Export the Sequelize instance and testConnection function
module.exports = { sequelize, testConnection };
