const bcrypt = require('bcryptjs');
const { getUsers, saveUsers } = require('../utils/userStorage');
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

// const SECRET = 'your_jwt_secret';


const User = require('../models/User');

async function signup(req, res) {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });

    const savedUser = await newUser.save();

    console.log('✅ User saved:', savedUser);

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
}



async function logout(req, res) {
  const token = req.headers['authorization'];
  if (!token) { 
    return res.status(401).json({ msg: 'No token provided' });
  }     
  jwt.verify(token, SECRET, (err) => {
    if (err) {
      return res.status(401).json({ msg: 'Invalid token' });
    }
    res.json({ msg: 'Logout successful' });
  });
}
module.exports = { signup, login, logout };
