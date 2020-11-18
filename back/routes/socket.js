const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../utils/passport/confirmLogin');
const socketController = require('../controllers/socket');

router.post('/:userId', isLoggedIn, socketController.createSocketRoom);

module.exports = router;