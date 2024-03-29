// publisherSubmissionModel.js

const { sequelize } = require('../configs/dbConfig');
const { DataTypes } = require('sequelize');

// Define the PublisherSubmission model
const PublisherSubmission = sequelize.define('publishersubmission', {
  SubmissionID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  PublisherID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  BookID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  SubmissionDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'publishersubmission' // Specify the table name explicitly
});

module.exports = PublisherSubmission;
