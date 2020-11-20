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

        let room = {
            userId: req.params.userId
        }

        const io = req.app.get('io');

        redisClient.hgetall(`${room.userId}/device`, (err, obj) => {
            if (err) {
                console.log('hgetall err', err)
                next(err);
            }
            if (obj) {
                room.deviceIds = Object.keys(obj)
                room.topics = Object.values(obj)

                // devices.map((v) => {
                //     socket.join(v);

                // })
            }
        })

        io.of('/deviceRoom').emit('newRoom', room);
        res.status(200).send('createSocketRoom oK');
    } catch (err) {
        console.log(err)
        next(err)
    }
}