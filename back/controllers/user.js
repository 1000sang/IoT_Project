const bcrypt = require('bcryptjs');
const userService = require('../service/user');

exports.getUser = async (req, res, next) => {
    const getUser = await userService.getUser();
    console.log(getUser)
    return res.send(getUser)
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


