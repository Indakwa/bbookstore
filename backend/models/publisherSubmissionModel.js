const { sequelize } = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');
const User = require('./userModel');

const PublisherSubmission = sequelize.define('publishersubmission', {
  SubmissionID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  BookTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Synopsis: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Genre: {
    type: DataTypes.JSON,
    allowNull: false
  },
  Price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  requestStatus: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  },
  
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  BookURL: {
    type: DataTypes.STRING,
    allowNull: true // Allow null initially
  },
  CoverImageURL: {
    type: DataTypes.STRING,
    allowNull: true // Allow null initially
  },
  CopyrightURL: {
    type: DataTypes.STRING,
    allowNull: true // Allow null initially
  },
  PublisherContact: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'publishersubmission',
  timestamps: false
});

// Define association
PublisherSubmission.belongsTo(User, { foreignKey: 'UserID' });

module.exports = PublisherSubmission;
