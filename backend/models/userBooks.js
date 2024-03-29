// userBookModel.js

const { sequelize } = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');

// Define the UserBook model
const UserBook = sequelize.define('userbook', {
  UserBookID: {
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
  },
  PurchaseDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ReadingProgress: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'userbook' // Specify the table name explicitly
});

module.exports = UserBook;
