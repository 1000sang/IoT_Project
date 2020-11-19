const socketIo = require('socket.io');
const redisClient = require('../redis');
const axios = require('axios');
const dotenv = require('dotenv');
const mqtt = require('mqtt');

dotenv.config()

const mqttOptions = {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    protocol: 'mqtt'
}

// client.on('message', function (topic, message) {
//     console.log(`토픽:${topic.toString()},메세지: ${message.toString()}`)
// })

module.exports = (server, app) => {
    const io = socketIo(server, { origin: '*:*' });
    const mqttClient = mqtt.connect(mqttOptions);

    app.set('io', io);
    const deviceRoom = io.of('/deviceRoom');

    mqttClient.on('connect', () => {
        console.log('connected : ' + mqttClient.connected)
    })

    mqttClient.on('error', (err) => {
        console.log(err)
    })

    deviceRoom.on('connection', (socket) => {
        console.log('device 네임스페이스 접속');
        let devices = null;
        let topics = null;

        socket.on('login', (data) => {
            console.log('login data', data)

            // redisClient.hgetall(`${data.userId}/device`, (err, obj) => {
            //     devices = Object.keys(obj);
            //     topics = Object.values(obj);

            //     devices.map((v) => {
            //         socket.join(v);
            //         console.log(`${v} 룸이 생성되었습니다.`);
            //         socket.to(`${v}`).emit('join', {
            //             msg: `${v}루에 입장하셧습니다.`
            //         })
            //     })

            //     topics.map((v, i) => {
            //         console.log(v)
            //         // mqttClient.subscribe(v);

            //     })

            //     // console.log('redisClient', Object.values(obj))
            //     // console.log('redisClient', Object.values(obj)[0])
            //     // console.log('redisClient deviceId', obj[0].deviceId)
            // })
        })

        socket.on('disconnect', () => {
            console.log('device 네임스페이스 접속 해제');
        })
    })
}

