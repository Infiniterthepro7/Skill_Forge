// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  points: { type: DataTypes.INTEGER, defaultValue: 0 },
  badges: { type: DataTypes.JSON, defaultValue: [] }, // Array of badge IDs
  level: { type: DataTypes.ENUM('Basic', 'Easy', 'Intermediate', 'Hard', 'Veteran'), defaultValue: 'Basic' }
});

module.exports = User;
