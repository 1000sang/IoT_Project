const Room = require('../models/mongo/room');
const userService = require('../service/user');
const SensorData = require('../models/mongo/sensorData');

exports.getSocket = async (req, res, next) => {
    console.log('getSocket API')
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
        //let deviceName = [];

        const findOneUser = await userService.findOneUser(req.body.userId);

        // console.log('socket', findOneUser);
        // console.log('sessionID', req.body.sessionID)

        await findOneUser.Devices.map((v) => {
            deviceIds.push(v.deviceId);
            topics.push(v.topic);
        });

        //deviceName 찾는 코드 추가해야함

        for (let i = 0; i < topics.length; i++) {
            let data = await SensorData.findOne({ topic: topics[i] }).sort({ createAt: -1 });
            datas.push(data.data)
        }

        const payload = {
            userId: req.body.userId,
            deviceIds: deviceIds,
            topics: topics,
            datas: datas,
            sessionID: req.body.sessionID
        }

        io.of('/deviceRoom').emit('newRoom', payload);

        res.send(payload)
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