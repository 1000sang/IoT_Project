const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/device');

router.get('/:id', deviceController.getDevice);
router.post('/:id', deviceController.createDevice);

module.exports = router;