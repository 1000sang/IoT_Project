const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../utils/passport/confirmLogin');
const oauthController = require('../controllers/oauth');

router.get('/', isLoggedIn, oauthController.getTokenData);
router.post('/', isLoggedIn, oauthController.createToken);

module.exports = router;