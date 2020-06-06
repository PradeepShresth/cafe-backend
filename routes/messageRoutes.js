const express = require('express');

const messageControllers = require('../controllers/messageControllers');

const router = express.Router();

router.post('/', messageControllers.addMessage);

module.exports = router;