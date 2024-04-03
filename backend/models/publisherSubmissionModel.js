const { sequelize } = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');

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
  }
}, {
  tableName: 'publishersubmission',
  timestamps: false
});

module.exports = PublisherSubmission;
