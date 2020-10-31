const { verifyToken } = require('../utils/token')

exports.getDevice = async (req, res, next) => {
    const id = req.params.id
    console.log(id)
    return res.send(id)
}

exports.createDevice = async (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = verifyToken(token);
    return res.send(token)
}

