const { sequelize } = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');

// Define the Transaction model
const Transaction = sequelize.define('transaction', {
  TransactionID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  TransactionDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  CartItems: {
    type: DataTypes.JSON, // Assuming CartItems will be stored as JSON data
    allowNull: false
  },
  TotalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  TransactionStatus: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'transaction',
  timestamps: false 
});

module.exports = Transaction;
