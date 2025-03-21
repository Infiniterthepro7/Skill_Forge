// routes/badges.js

const express = require('express');
const authenticateToken = require('../middleware/auth');
const Badge = require('../models/Badge');
const User = require('../models/user');

const router = express.Router();

// Award badge to user
router.post('/award', authenticateToken, async (req, res) => {
  const { userId, badgeId } = req.body;

  try {
    const user = await User.findByPk(userId);
    const badge = await Badge.findByPk(badgeId);

    if (user && badge) {
      await user.addBadge(badge);
      res.status(200).json({ message: 'Badge awarded successfully' });
    } else {
      res.status(404).json({ error: 'User or Badge not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to award badge' });
  }
});

// Get user badges
router.get('/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: Badge,
    });
    res.status(200).json(user.Badges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch badges' });
  }
});

module.exports = router;
