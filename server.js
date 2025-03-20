const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const Lesson = require('./models/lesson');

const app = express();
app.use(bodyParser.json());

// Sync DB once, before server starts
sequelize.sync()
  .then(() => {
    console.log("✅ DB Synced");

    // Start Server AFTER DB is synced
    app.listen(3000, () => console.log('🚀 Server running on port 3000'));
  })
  .catch(err => console.error("❌ DB Sync Failed:", err));

// API Routes
app.get('/lessons', async (req, res) => {
  try {
    const lessons = await Lesson.findAll();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
});

app.post('/lessons', async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ error: "Failed to create lesson" });
  }
});
