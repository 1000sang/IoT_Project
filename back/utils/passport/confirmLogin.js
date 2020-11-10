const { createError } = require('../error/error');

const Errors = (exports.Errors = {
    NeedLogin: createError('NeedLogin'),
    NeedNotLogin: createError('NeedNotLogin')
})

exports.isLoggedIn = (req, res, next) => {
    console.log('isLoggedIn', req.session)
    if (req.isAuthenticated()) {
        next();
    } else {
        throw new Errors.NeedLogin()
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        throw new Errors.NeedNotLogin()
    }
}