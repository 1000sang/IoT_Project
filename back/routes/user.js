const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../utils/passport/confirmLogin');
const userController = require('../controllers/user');

router.get('/', userController.getUser);
router.get('/session', userController.getSesssion);
router.post('/', isNotLoggedIn, userController.createUser);
router.post('/login', isNotLoggedIn, userController.login);
router.post('/logout', isLoggedIn, userController.logout);

module.exports = router;