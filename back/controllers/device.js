
exports.createDevice = async (req, res, next) => {
    try {
        const findOneSite = await userService.findOneUserByEmail(req.body.email);

        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        req.body.password = hashedPassword;

        const createUser = await userService.createUser(req.body);
        res.status(200).send(createUser);
    } catch (err) {
        next(err)
    }
}