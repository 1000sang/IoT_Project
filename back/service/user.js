const { User } = require('../models');
const { createError } = require('../utils/error/error');

const Errors = (exports.Errors = {
    BadUserDataError: createError('BadUserDataError'),
    DuplicateUserEmailError: createError('DuplicateUserEmailError'),
    FailureSignIn: createError('FailureSignIn'),
    UnknownError: createError('UnkownError')
})

exports.getUser = (req, res, next) => {
    return 'a'
}

exports.findOneUserByEmail = async (email) => {
    const exUser = await User.findOne({
        where: {
            email: email
        }
    })
    if (exUser) {
        throw new Errors.DuplicateUserEmailError()
    }
    return exUser;
}

exports.findUser = async ({ email }) => {
    const findUser = await User.findOne({
        where: {
            email: email
        }
    });
    if (!findUser) {
        throw new Errors.FailureSignIn()
    }
    return findUser;
}

exports.createUser = async (body) => {
    try {
        return await User.create({
            email: body.email,
            nickname: body.nickname,
            password: body.password
        })
    } catch (err) {
        switch (err.name) {
            case 'ValidationError':
                throw new Errors.BadUserDataError(err.message)
            default:
                throw new Errors.UnknownError(err.message)
        }
    }
}

