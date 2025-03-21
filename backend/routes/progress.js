// routes/progress.js

const express = require('express');
const authenticateToken = require('../middleware/auth');
const Progress = require('../models/progress');

const router = express.Router();

// Update progress
router.post('/update', authenticateToken, async (req, res) => {
  const { userId, lessonId, status, score } = req.body;

  try {
    let progress = await Progress.findOne({ where: { userId, lessonId } });

    if (progress) {
      progress.status = status;
      progress.score = score;
      await progress.save();
    } else {
      progress = await Progress.create({ userId, lessonId, status, score });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// Get user progress
router.get('/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const progress = await Progress.findAll({ where: { userId } });
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

module.exports = router;
