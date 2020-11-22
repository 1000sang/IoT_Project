const Room = require('../models/mongo/room');
const userService = require('../service/user');


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

        let deviceIds = [];
        let topics = [];

        const findOneUser = await userService.findOneUser(req.params.userId);

        await findOneUser.Devices.map((v) => {
            console.log('map', v)
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