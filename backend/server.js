// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const { sequelize, User, Lesson, Progress } = require('./models/index');

dotenv.config();

const app = express();
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
// More routes will be added later

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Sync Database Models
sequelize.sync({ force: true }) 
  .then(() => console.log("✅ Database Synced Successfully!"))
  .catch((err) => console.error("Database sync failed", err));


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

