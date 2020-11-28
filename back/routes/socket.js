const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../utils/passport/confirmLogin');
const socketController = require('../controllers/socket');

router.get('/', socketController.getSocket);
router.get('/room/:id', socketController.createRoom)
router.post('/room', isLoggedIn, socketController.createSocketRoom);
router.delete('/room/:userId', socketController.deleteSocketRoom);

module.exports = router;