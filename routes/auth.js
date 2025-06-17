// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Registration route (for new users)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user'   // default role is 'user'
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login route (issues JWT on success)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });
    // Generate JWT containing user ID and role
    const token = jwt.sign(
      { id: user._id, role: user.role },                    // payload
      process.env.JWT_SECRET || 'supersecretkey',           // secret key for signing
      { expiresIn: '1h' }
    );
    res.json({ token });  // Return the JWT to the client
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
