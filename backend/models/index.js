const sequelize = require('../config/database');
const Lesson = require('./lesson');
const User = require('./user')(sequelize);

// Define associations if needed (optional)
// Example:
// User.hasMany(Lesson);
// Lesson.belongsTo(User);

sequelize
  .sync()
  .then(() => {
    console.log('✅ Database Synced');
  })
  .catch((err) => {
    console.error('❌ Error syncing database:', err);
  });

module.exports = { sequelize, Lesson, User };
