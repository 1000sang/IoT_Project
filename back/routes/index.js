const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send('hello');
})
router.use('/user', require('./user'));
router.use('/oauth', require('./oauth'));
router.use('/site', require('./site'));
router.use('/device', require('./device'));
router.use('/socket', require('./socket'));

module.exports = router;