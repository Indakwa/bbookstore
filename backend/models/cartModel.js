const { sequelize } = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');
const Book = require('./bookModel');

const Cart = sequelize.define('cart', {
  CartID: {
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
  tableName: 'cart',
  timestamps: false  
});

// Define association with the Book model
Cart.belongsTo(Book, { foreignKey: 'BookID' });

module.exports = Cart;
