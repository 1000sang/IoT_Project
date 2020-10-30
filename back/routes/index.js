const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/oauth', require('./oauth'));
router.use('/device', require('./device'));

module.exports = router;