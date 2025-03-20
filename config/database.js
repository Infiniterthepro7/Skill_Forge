const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('skillforge', 'postgres', 'aryan@123', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
