const express = require('express');
const router = express.Router();

const { login  } = require('../controllers/authcontrollers');

const { signup,login, logout } = require('../controllers/authcontrollers');


// router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
