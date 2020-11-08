const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../utils/passport/confirmLogin');
const siteController = require('../controllers/site');

router.post('/', isLoggedIn, siteController.createSite);

module.exports = router;