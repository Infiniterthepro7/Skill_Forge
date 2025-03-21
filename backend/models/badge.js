// models/badge.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class Badge extends Model {}

Badge.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Badge',
  timestamps: true,
});

// Associations
User.belongsToMany(Badge, { through: 'UserBadges', foreignKey: 'userId' });
Badge.belongsToMany(User, { through: 'UserBadges', foreignKey: 'badgeId' });

module.exports = Badge;
