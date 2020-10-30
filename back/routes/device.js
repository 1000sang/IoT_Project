const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/device');

router.get('/:id', deviceController.getDevice);
// router.post('/', deviceController.createDevice);

module.exports = router;