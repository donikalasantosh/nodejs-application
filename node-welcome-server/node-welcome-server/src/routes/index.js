const express = require('express');
const welcomeController = require('../controllers/welcomeController');

const router = express.Router();

router.get('/welcome', welcomeController.sendWelcomeMessage);

module.exports = router;