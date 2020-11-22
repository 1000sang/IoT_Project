const socketService = require('../service/socket');
const redisClient = require('../utils/redis');
const Room = require('../models/mongo/room');
const userService = require('../service/user');
const deviceService = require('../service/device')

// const socket = require('../utils/socket');

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

        const io = req.app.get('io');
        const mqttClient = req.app.get('mqtt');

        const findOneUser = await userService.findOneUser(req.params.userId);

        const payload = {
            userId: req.params.userId,
            deviceIds: findOneUser.Devices.deviceId,
            topics: findOneUser.Devices.topic
        }

        console.log(payload)

        // redisClient.hgetall(`${req.params.userId}/device`, (err, obj) => {
        //     console.log('obj', obj)
        //     if (err) {
        //         console.log('hgetall err', err)
        //         next(err);
        //     }
        //     if (obj) {
        //         console.log('obj')
        //         payload.userId = req.params.userId;
        //         payload.deviceIds = Object.keys(obj);
        //         payload.topics = Object.values(obj)

        //         // console.log('room', room)

        //         // room.topics.map((v) => {
        //         //     console.log('topics', v);

        //         //     mqttClient.subscribe(`${v}`)
        //         //     // socket.join(v);
        //         // })

        //         // io.of('/deviceRoom').emit('newRoom', room);

        //         // devices.map((v) => {
        //         //     socket.join(v);

        //         // })
        //     } else {
        //         const findAllDeviceById = deviceService.findAllDeviceById(req.params.userId)
        //         console.log(findAllDeviceById)
        //     }
        // })

        // console.log('payload', payload);
        // const room = new Room({
        //     userId: payload.userId,
        //     deviceId: payload.deviceId,
        //     topic: payload.topic
        // })

        // const newRoom = await room.save();
        // io.of('/deviceRoom').emit('newRoom', newRoom);

        res.status(200).send('createSocketRoom oK');
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.deleteSocketRoom = async (req, res, next) => {
    // try{

    // }
}