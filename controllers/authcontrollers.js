const bcrypt = require('bcryptjs');
const { getUsers, saveUsers } = require('../utils/userStorage');
const jwt = require('jsonwebtoken');
const SECRET = 'your_jwt_secret';

async function signup(req, res) {
  const { username, password } = req.body;
  const users = await getUsers();

  if (users.find(user => user.username === username)) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await saveUser({ username, password: hashedPassword });

  res.status(201).json({ msg: 'User created successfully' });
}

module.exports = { signup };
