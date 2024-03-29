// favoriteModel.js

const { sequelize } = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');

// Define the Favorite model
const Favorite = sequelize.define('favorite', {
  FavoriteID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  BookID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'favorite' // Specify the table name explicitly
});

module.exports = Favorite;
