// publisherCatalogModel.js

const { sequelize } = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');

// Define the PublisherCatalog model
const PublisherCatalog = sequelize.define('publishercatalog', {
  CatalogID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  PublisherID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  BookID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'publishercatalog' // Specify the table name explicitly
});

module.exports = PublisherCatalog;
