const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../utils/passport/confirmLogin');
const socketController = require('../controllers/socket');

router.get('/', socketController.getSocket);
router.post('/room/:userId', socketController.createSocketRoom);
router.delete('/room/:userId', socketController.deleteSocketRoom);

module.exports = router;