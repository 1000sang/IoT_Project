const bcrypt = require('bcryptjs');
const oauthService = require('../service/oauth');
const userService = require('../service/user');
const deviceService = require('../service/device');
const { createError } = require('../utils/error/error');
const { verifyToken } = require('../utils/token');

const Errors = (exports.Errors = {
    FailureSignIn: createError('FailureSignIn'),
    UnknownError: createError('UnkownError')
})

exports.getTokenData = async (req, res, next) => {
    const tokenData = verifyToken(req.headers.authorization);

    return res.status(200).send(tokenData);
}

exports.createToken = async (req, res, next) => {
    try {
        const data = {
            email: req.body.email,
            password: req.body.password
        }

        const findOneUser = await userService.findUser(data);

        const compare = bcrypt.compareSync(data.password, findOneUser.dataValues.password);

        if (!compare) {
            throw new Errors.FailureSignIn()
        }

        data.userId = findOneUser.dataValues.userId;

        const findAllDeviceById = await deviceService.findAllDeviceById(data.userId);

        const tokenData = {
            email: findOneUser.dataValues.email,
            nickname: findOneUser.dataValues.nickname,
            deviceId: findAllDeviceById
        }

        const token = await oauthService.createToken(tokenData);
        return res.send(token)
    } catch (err) {
        next(err);
    }
}
