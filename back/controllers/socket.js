const socketService = require('../service/socket');

exports.getSocket = async (req, res, next) => {
    console.log('getSocket API')
    // console.log(req.session.passport);
    const socket = req.app.get('io')
    console.log(socket)
    return res.send('a')
}

exports.createSocketRoom = async (req, res, next) => {
    try {
        console.log('createSocketRoom')
        console.log(req.params.userId)

        res.status(200).send('createSocketRoom oK');
    } catch (err) {
        next(err)
    }
}