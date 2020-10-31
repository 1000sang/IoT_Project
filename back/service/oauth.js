const { createToken } = require('../utils/token');
const { createError } = require('../utils/error/error');

const Errors = (exports.Errors = {
    FailureSignIn: createError('FailureSignIn'),
    UnknownError: createError('UnkownError')
})

exports.createToken = async (data) => {
    try {
        return createToken(data);
    } catch (err) {
        throw new Errors.FailureSignIn()
    }
}

