const jwt = require('jsonwebtoken');


const { createError } = require('../utils/error/error');

const Errors = (exports.Errors = {
    FailureSignIn: createError('FailureSignIn'),
    UnknownError: createError('UnkownError')
})

exports.createToken = async (data) => {
    try {
        const token = jwt.sign(
            {
                ...data
            },
            process.env.JWT_SECRET
        );
        return token
    } catch (err) {
        throw new Errors.FailureSignIn()
    }
}

