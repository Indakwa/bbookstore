const { sequelize } = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');

// Define the User model
const User = sequelize.define('user', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Role: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'user', // Specify the table name explicitly
  timestamps: false // Disable automatic timestamps
});

module.exports = User;
