// transactionModel.js

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
  PaymentMethod: {
    type: DataTypes.STRING,
    allowNull: false
  },
  TotalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  TransactionStatus: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'transaction' // Specify the table name explicitly
});

module.exports = Transaction;
