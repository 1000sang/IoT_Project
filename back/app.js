const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routers = require('./routes');
const db = require('./models');

const errMsg = require('./utils/error/errorMessage');

// const mqtt = require('mqtt');
// const client = mqtt.connect('mqtt://test.mosquitto.org');

const app = express();

app.use(cors({
    origin: true,
    credentials: false,
}))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

dotenv.config()

// setInterval(
//     () => {
//         client.publish('test', 'hello');
//     }, 2000
// );

// client.subscribe('test');
// client.on('message', function (topic, message) {
//     console.log(`토픽:${topic.toString()},메세지: ${message.toString()}`)
// })

db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공 ')
    })
    .catch(console.error);

app.use('/', routers);
app.use(function (err, req, res, next) {
    res.status(500).send(errMsg.createErrMsg(err))
});

app.listen(3065, () => {
    console.log('서버 실행 중');
});