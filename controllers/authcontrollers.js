const bcrypt = require('bcryptjs');
const { getUsers, saveUsers } = require('../utils/userStorage');
const jwt = require('jsonwebtoken');
const SECRET = 'your_jwt_secret';

function signup(req, res) {
  const { username, password } = req.body;
  const users = getUsers();

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ username, password: hashedPassword });

  saveUsers(users);
  res.status(201).json({ msg: 'User registered successfully' });
}

module.exports = { signup };
