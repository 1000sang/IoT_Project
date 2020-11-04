const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/device');

router.get('/', deviceController.getAllHasUser);
router.post('/', deviceController.createDevice);
router.post('/:deviceId', deviceController.addDevice);

module.exports = router;