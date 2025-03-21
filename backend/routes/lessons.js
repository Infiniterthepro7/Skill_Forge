const express = require('express');
const authenticateToken = require('../middleware/auth');
const lesson = require('../models/lesson'); // lowercase, matches file

const router = express.Router();

// Get Lessons by Language
router.get('/:language', authenticateToken, async (req, res) => {
  const { language } = req.params;
  try {
    const lessons = await lesson.findAll({ where: { language } });
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

module.exports = router;
