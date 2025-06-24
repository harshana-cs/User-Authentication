const fs = require('fs');
const file = './users.json';

function getUsers() {
  if (!fs.existsSync(file)) return [];
  const data = fs.readFileSync(file);
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(file, JSON.stringify(users, null, 2));
}

module.exports = { getUsers, saveUsers };
