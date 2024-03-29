const { sequelize } = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');

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

module.exports = Cart;
