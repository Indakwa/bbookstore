// adminModel.js

const { sequelize } = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');

// Define the Admin model
const Admin = sequelize.define('admin', {
  AdminID: {
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
  }
}, {
  tableName: 'admin' // Specify the table name explicitly
});

module.exports = Admin;
