const { sequelize } = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');
const Cart = require('./cartModel');

const Order = sequelize.define('order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'complete'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'orders',
  timestamps: false
});

Order.hasMany(Cart, { foreignKey: 'orderId' });
Cart.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = Order;
