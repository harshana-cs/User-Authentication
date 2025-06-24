const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // your Mongoose model
const SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // store secret securely

async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Find user from DB
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Compare password hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid password' });
    }

    // Create JWT token
    const token = jwt.sign({ username: user.username, id: user._id }, SECRET, { expiresIn: '1h' });

    res.json({ msg: 'Login successful', token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
}

module.exports = { login };
