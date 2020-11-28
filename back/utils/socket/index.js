const socketIo = require('socket.io');
const axios = require('axios');
const dotenv = require('dotenv');
const mqtt = require('mqtt');
const redisQueue = require('../redis/redisQueue');
const redis = require('../redis')
const mongoose = require('mongoose');
const SensorData = require('../../models/mongo/sensorData');
const Device = require('../../models/mongo/device');

dotenv.config()

const mqttOptions = {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    protocol: 'mqtt'
}

const mqttClient = mqtt.connect(mqttOptions);

mqttClient.on('connect', () => {
    console.log('mqtt connected : ' + mqttClient.connected)
    //device DB에 topic 전부 구독
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

    deviceRoom.on('connection', async (socket) => {
        console.log('device 네임스페이스 접속');

        socket.on('disconnect', async (reason) => {
            console.log('device 네임스페이스 접속 해제');
        })
    });

    mqttClient.on('message', function (topic, message) {
        deviceRoom.emit(`${topic}`, message.toString());
        const data = JSON.parse(message);
        redisQueue.rpushRedisTopicQueue(data.topic);
        redisQueue.rpushRedisDataQueue(`${data.topic}`, `${data.data}`);

        redis.watch('topic', (err) => {
            if (err) {
                console.log(err);
            }

            redis.lpop('topic', async (err, topic) => {
                // console.log('redisClient lpop', arr);



                redis.lpop(`${topic}`, async (err, data) => {
                    // console.log('redisClient data lpop', arr);
                    //mongoDB 저장
                    const sensorData = new SensorData({
                        topic: topic,
                        data: data
                    })

                    await sensorData.save();
                })

            })
        })

        console.log(`토픽:${topic.toString()},메세지: ${message.toString()}`)
    })
}

