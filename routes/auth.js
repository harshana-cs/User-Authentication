const express = require('express');
const router = express.Router();
const { login  } = require('../controllers/authcontrollers');

// router.post('/signup', signup);
router.post('/login', login);


module.exports = router;
