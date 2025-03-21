const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Lesson extends Model {}

Lesson.init(
  {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    title: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    content: { 
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    task: { 
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    difficulty: { 
      type: DataTypes.ENUM('Basic', 'Easy', 'Intermediate', 'Hard', 'Veteran'), 
      defaultValue: 'Basic' 
    },
    language: { 
      type: DataTypes.ENUM('C', 'C++', 'Python', 'Java', 'JavaScript'), 
      allowNull: false 
    }
  },
  {
    sequelize,
    modelName: 'Lesson',
  }
);

module.exports = Lesson;
