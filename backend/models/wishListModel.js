// wishlistModel.js

const { sequelize } = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');

// Define the Wishlist model
const Wishlist = sequelize.define('wishlist', {
  WishlistID: {
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
  tableName: 'wishlist' // Specify the table name explicitly
});

module.exports = Wishlist;
