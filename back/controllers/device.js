// const bcrypt = require('bcryptjs');
// const userService = require('../service/user');

exports.getDevice = async (req, res, next) => {
    const id = req.params.id
    console.log(id)
    return res.send(id)
}

// exports.createUser = async (req, res, next) => {
//     try {
//         const findOneUser = await userService.findOneUserByEmail(req.body.email)

//         const hashedPassword = await bcrypt.hash(req.body.password, 12);
//         req.body.password = hashedPassword;

//         const createUser = await userService.createUser(req.body);
//         res.status(200).send(createUser);
//     } catch (err) {
//         next(err)
//     }
// }


