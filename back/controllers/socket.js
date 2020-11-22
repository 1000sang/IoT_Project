const Room = require('../models/mongo/room');
const Device = require('../models/mongo/device');
const userService = require('../service/user');


// const socket = require('../utils/socket');

exports.getSocket = async (req, res, next) => {
    console.log('getSocket API')
    // console.log(req.session.passport);
    const socket = req.app.get('io')
    console.log(socket)
    return res.send('a')
}

exports.createRoom = async (req, res, next) => {
    try {
        const room = await Room.findOne({ _id: req.params.id });
        const io = req.app.get('io');

        if (!room) {
            console.log('room이 없습니다.')
        }

        res.send('createRoom OK')


    } catch (err) {
        console.log(err)
    }
}

exports.createSocketRoom = async (req, res, next) => {
    try {
        console.log('createSocketRoom')
        console.log(req.params.userId)

        const io = req.app.get('io');
        const mqttClient = req.app.get('mqtt');

        let deviceIds = [];
        let topics = [];

        const findOneUser = await userService.findOneUser(req.params.userId);

        await findOneUser.Devices.map((v) => {
            deviceIds.push(v.deviceId);
            topics.push(v.topic)
            mqttClient.subscribe(`${v.topic}`)
        })

        const payload = {
            userId: req.params.userId,
            deviceIds: deviceIds,
            topics: topics
        }

        console.log(payload)

        const room = new Room({
            userId: payload.userId,
            deviceId: payload.deviceIds,
            topic: payload.topics
        })

        const newRoom = await room.save();
        io.of('/deviceRoom').emit('newRoom', newRoom);


        res.redirect(`/socket/room/${newRoom._id}`)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.deleteSocketRoom = async (req, res, next) => {
    // try{
    console.log('delegeRoom')
    res.status(200).send('dddd')
    // }
}