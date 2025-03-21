// backend/models/index.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Import models
const User = require('./user.js')(sequelize, DataTypes); // Correct (function-based)
const Lesson = require('./lesson'); // Direct import
const Progress = require('./progress'); // Direct import

// Export all
module.exports = { sequelize, User, Lesson, Progress };
