const deviceService = require('../service/device');
const siteService = require('../service/site');
const userService = require('../service/user');
const { verifyToken } = require('../utils/token');

exports.createDevice = async (req, res, next) => {
    try {
        const tokenData = verifyToken(req.headers.authorization)

        const payload = {
            email: tokenData.email,
            nickname: tokenData.nickname,
            siteCode: req.body.siteCode,
            topic: req.body.topic
        }

        const findOneBySiteCode = await siteService.findOneBySiteCode(payload.siteCode);
        const findOneIdByEmail = await userService.findOneIdByEmail(payload.email);

        const createDevice = await deviceService.createDevice(payload);
        res.status(200).send(createDevice);
    } catch (err) {
        next(err)
    }
}