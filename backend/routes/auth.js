// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../utils/hash');
const User = require('../models/user');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const password_hash = await hashPassword(password);
  try {
    const user = await User.create({ name, email, password_hash });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Email already in use' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const validPassword = await comparePassword(password, user.password_hash);
  if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
