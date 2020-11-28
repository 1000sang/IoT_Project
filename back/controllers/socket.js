const Room = require('../models/mongo/room');
const userService = require('../service/user');
const SensorData = require('../models/mongo/sensorData');

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

        console.log('sakdjfadkjf')

        res.send('createRoom OK')


    } catch (err) {
        console.log(err)
    }
}

exports.createSocketRoom = async (req, res, next) => {
    try {
        const io = req.app.get('io');

        let deviceIds = [];
        let topics = [];
        let datas = [];

        const findOneUser = await userService.findOneUser(req.body.userId);

        // console.log('socket', findOneUser);
        // console.log('sessionID', req.body.sessionID)

        await findOneUser.Devices.map(async (v) => {
            deviceIds.push(v.deviceId);
            topics.push(v.topic)
            let data = await SensorData.findOne({ topic: v })
            datas.push(data.data)
        })

        // await topics.map((v) => {
        //     // let data = await SensorData.findOne({ topic: v })
        //     console.log('data : ', data.data)
        //     datas.push({
        //         topic: v,
        //         data: SensorData.findOne({ topic: v }).data
        //     })
        // })

        console.log('datas: ', datas)

        const payload = {
            userId: req.body.userId,
            deviceIds: deviceIds,
            topics: topics,
            sessionID: req.body.sessionID
        }

        // const room = new Room({
        //     sessionID: payload.sessionID,
        //     userId: payload.userId,
        //     deviceId: payload.deviceIds,
        //     topic: payload.topics
        // })

        //redis에다 키는 userId고 벨류는 room _id넣음
        // redisClient.set(`roomId/${room.userId}`, `${room._id}`);

        // const newRoom = await room.save();
        io.of('/deviceRoom').emit('newRoom', payload);

        res.send('ok')
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