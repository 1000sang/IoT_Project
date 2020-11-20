const socketIo = require('socket.io');
const axios = require('axios');
const dotenv = require('dotenv');
const mqtt = require('mqtt');

dotenv.config()


const mqttOptions = {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    protocol: 'mqtt'
}

const mqttClient = mqtt.connect(mqttOptions);

mqttClient.on('connect', () => {
    console.log('mqtt connected : ' + mqttClient.connected)
})

mqttClient.on('error', (err) => {
    console.log(err)
})
// mqttClient.subscribe('DHT11');
// mqttClient.on('message', function (topic, message) {
//     console.log(`토픽:${topic.toString()},메세지: ${message.toString()}`)
// })

module.exports = (server, app) => {
    const io = socketIo(server, { origin: '*:*' });

    app.set('io', io);
    app.set('mqtt', mqttClient);
    const deviceRoom = io.of('/deviceRoom');

    deviceRoom.on('connection', (socket) => {
        console.log('device 네임스페이스 접속');

        socket.on('disconnect', () => {
            console.log('device 네임스페이스 접속 해제');
            mqttClient.unsubscribe('DHT11')
        })
    })
    mqttClient.on('message', function (topic, message) {
        console.log(`토픽:${topic.toString()},메세지: ${message.toString()}`)
    })
}

