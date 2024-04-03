// payPublisherModel.js

const { sequelize } = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');

const PayPublisher = sequelize.define('paypublisher', {
  PayPublisherID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PublisherContact: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  Status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'paypublisher',
  timestamps: false 
});

module.exports = PayPublisher;
