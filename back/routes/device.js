const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../utils/passport/confirmLogin');
const deviceController = require('../controllers/device');

router.get('/', deviceController.getAllHasUser);
router.post('/', deviceController.createDevice);
router.post('/data', deviceController.getSensorData);
router.post('/:deviceId', deviceController.addDevice);

module.exports = router;