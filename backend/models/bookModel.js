// bookModel.js

const { sequelize } = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');

// Define the Book model
const Book = sequelize.define('book', {
  BookID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  CoverImageURL: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  PublisherContact: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'book',
  timestamps: false 
});

module.exports = Book;
