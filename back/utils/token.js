const jwt = require('jsonwebtoken');

exports.verifyToken = (token) => {
    return jwt.verify(token.split('Bearer ')[1], process.env.JWT_SECRET);
}

exports.createToken = (data) => {
    return jwt.sign({ ...data }, process.env.JWT_SECRET)
}
