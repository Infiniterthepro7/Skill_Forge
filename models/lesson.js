const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lesson = sequelize.define('Lesson', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  task: {
    type: DataTypes.STRING,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
});

module.exports = Lesson;
