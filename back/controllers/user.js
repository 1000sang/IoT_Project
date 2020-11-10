const bcrypt = require('bcryptjs');
const passport = require('passport');

const { verifyToken } = require('../utils/token');
const userService = require('../service/user');

exports.getUser = async (req, res, next) => {
    if (req.user) {
        console.log(req.headers);
        const user = await userService.getUser(req.user.userId);
    } else {
        return res.status(200).json(null);
    }

    return res.status(200).json(user);
}

exports.getSesssion = async (req, res, next) => {
    try {
        const session = req.session.key;
        console.log(session);
        return res.status(200).json(session)
    } catch (err) {
        console.log('getSession', err);
        next(err);
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const findOneUser = await userService.findOneUserByEmail(req.body.email);

        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        req.body.password = hashedPassword;

        const createUser = await userService.createUser(req.body);
        res.status(200).send(createUser);
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if (loginErr) {
                console.log(loginErr);
                return next(loginErr);
            }

            const findOneUser = await userService.findOneUser(user.userId);

            return res.status(200).send(findOneUser)
        })
    })(req, res, next);
}

exports.logout = async (req, res, next) => {
    try {
        console.log('logout', req.session);
        req.logout(() => {
            console.log('logout process');
            req.session.destroy();
            console.log('logout destroy');
            res.send('ok')
        });

        // req.session.destroy();
        // res.send('ok');
        // req.session.save(() => {
        //     res.send('ok')
        // })
    } catch (err) {
        console.log(err)
        // next(err)
    }
}