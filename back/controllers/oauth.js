const bcrypt = require('bcrypt');
const oauthService = require('../service/oauth');
const userService = require('../service/user');
const { createError } = require('../utils/error/error');

const Errors = (exports.Errors = {
    FailureSignIn: createError('FailureSignIn'),
    UnknownError: createError('UnkownError')
})
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

        const token = await oauthService.createToken(data);
        return res.send(token)
    } catch (err) {
        next(err);
    }
}
