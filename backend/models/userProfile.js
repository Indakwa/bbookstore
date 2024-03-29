// userprofileModel.js

const { sequelize } = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');

// Define the UserProfile model
const UserProfile = sequelize.define('userprofile', {
  ProfileID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ProfilePicture: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Biography: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'userprofile' // Specify the table name explicitly
});

module.exports = UserProfile;
