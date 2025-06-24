const bcrypt = require('bcryptjs');
const { getUsers, saveUsers } = require('../utils/userStorage');
const jwt = require('jsonwebtoken');
const SECRET = 'your_jwt_secret';


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

function login(req, res) {
  const { username, password } = req.body;
  const users = getUsers();
  
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ msg: 'Invalid password' });
  }

  const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });

  res.json({ msg: 'Login successful', token });
}
function logout(req,res){
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
