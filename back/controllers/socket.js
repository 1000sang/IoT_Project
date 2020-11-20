const socketService = require('../service/socket');
const redisClient = require('../utils/redis');
const socket = require('../utils/socket');

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

        let room = null;

        const io = req.app.get('io');

        redisClient.hgetall(`${req.params.userId}/device`, (err, obj) => {
            console.log('obj', obj)
            if (err) {
                console.log('hgetall err', err)
                next(err);
            }
            if (obj) {
                console.log('ass')
                room = {
                    userId: req.params.userId,
                    deviceIds: Object.keys(obj),
                    topics: Object.values(obj)
                }
                console.log('room', room)

                io.of('/deviceRoom').emit('newRoom', room);

                // devices.map((v) => {
                //     socket.join(v);

                // })
            }
        })
        res.status(200).send('createSocketRoom oK');
    } catch (err) {
        console.log(err)
        next(err)
    }
}