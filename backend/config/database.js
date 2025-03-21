// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('skillforge', 'postgres', 'aryan@123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false // Disable logging; default: console.log
});

module.exports = sequelize;
