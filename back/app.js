const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const redis = require('redis');
const redisClient = require('./utils/redis');
const RedisStore = require('connect-redis')(session);

const routers = require('./routes');
const db = require('./models');
const passportConfig = require('./utils/passport');
const errMsg = require('./utils/error/errorMessage');

dotenv.config()

const mqtt = require('mqtt');
const mqttOptions = {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    protocol: 'mqtt'
}
const client = mqtt.connect(mqttOptions);
let redisHost = '';

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

passportConfig();

app.use(cookieParser(process.env.PASSPORT_SECRET));

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(helmet());
    redisHost = process.env.REDIS_HOST
} else {
    app.use(morgan('dev'));
    redisHost = 'localhost';
}

app.use(session({
    store: new RedisStore({
        client: redisClient
    }),
    saveUninitialized: true,
    resave: false,
    secret: process.env.PASSPORT_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());

db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공 ')
    })
    .catch(console.error);

client.on('connect', () => {
    console.log('connected : ' + client.connected)
})
client.on('error', (err) => {
    console.log(err)
})

client.subscribe('DHT11');
client.on('message', function (topic, message) {
    console.log(`토픽:${topic.toString()},메세지: ${message.toString()}`)
})

app.use('/', routers);
app.use(function (err, req, res, next) {
    res.status(500).send(errMsg.createErrMsg(err))
});

app.listen(3065, () => {
    console.log('서버 실행 중');
});