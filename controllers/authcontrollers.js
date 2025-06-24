const jwt = require('jsonwebtoken');
const SECRET = 'your_jwt_secret'; // Use .env in real projects

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

module.exports = { signup, login };
