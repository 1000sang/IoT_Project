const express = require('express');
const router = express.Router();
const oauthController = require('../controllers/oauth');

router.post('/', oauthController.createToken);

module.exports = router;