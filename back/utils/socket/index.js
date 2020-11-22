const socketIo = require('socket.io');
const axios = require('axios');
const dotenv = require('dotenv');
const mqtt = require('mqtt');
const mongoose = require('mongoose');
const { session } = require('passport');
// const Devices = require('../../models/mongo/device');
dotenv.config()

const mqttOptions = {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    protocol: 'mqtt'
}

const mqttClient = mqtt.connect(mqttOptions);

mqttClient.on('connect', () => {
    console.log('mqtt connected : ' + mqttClient.connected)
    // device.save({ deviceId: '1', topic: '1/DHT11' })
})

mqttClient.on('error', (err) => {
    console.log(err)
})
// mqttClient.subscribe('DHT11');
// mqttClient.on('message', function (topic, message) {
//     console.log(`토픽:${topic.toString()},메세지: ${message.toString()}`)
// })

module.exports = (server, app, sessionMiddleware) => {
    const io = socketIo(server, { origin: '*:*' });

    app.set('io', io);
    app.set('mqtt', mqttClient);
    const deviceRoom = io.of('/deviceRoom');
    io.use((socket, next) => {
        sessionMiddleware(socket.request, socket.request.res, next)
    })

    deviceRoom.on('connection', async (socket) => {
        console.log('device 네임스페이스 접속');
        console.log('socket request ', socket.request.sessionID)

        socket.on('disconnect', async (reason) => {
            console.log('device 네임스페이스 접속 해제');
            //axios delete API
            // await axios.delete(`/socket/room/${userData.userId}`);
            // mqttClient.unsubscribe('1/DHT11')
            // mqttClient.unsubscribe('8/DHT11')
        })
    })
    mqttClient.on('message', function (topic, message) {
        deviceRoom.emit(`${topic}`, {
            message: message.toString()
        })
        console.log(`토픽:${topic.toString()},메세지: ${message.toString()}`)
    })
}

