const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ msg: 'Profile data', user: req.user });
});

module.exports = router;
