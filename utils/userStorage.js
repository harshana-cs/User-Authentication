const User = require('../models/User');

// Get all users
async function getUsers() {
  return await User.find({});
}

// Save new user (create)
async function saveUsers(userData) {
  const user = new User(userData);
  return await user.save();
}

module.exports = { getUsers, saveUsers };
