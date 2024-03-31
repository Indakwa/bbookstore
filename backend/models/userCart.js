const { sequelize } = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');
const Book = require('./bookModel'); 

const UserCart = sequelize.define('usercart', {
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
  tableName: 'usercart',
  timestamps: false  
});

// Define association with the Book model
UserCart.belongsTo(Book, { foreignKey: 'BookID' });

module.exports = UserCart;
