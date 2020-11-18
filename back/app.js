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
const RedisStore = require('connect-redis')(session);
const redisClient = require('./utils/redis');

const routers = require('./routes');
const db = require('./models');
const passportConfig = require('./utils/passport');
const errMsg = require('./utils/error/errorMessage');

const webSocket = require('./utils/socket');

dotenv.config()

const mqtt = require('mqtt');
const mqttOptions = {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    protocol: 'mqtt'
}
const client = mqtt.connect(mqttOptions);

const app = express();

const sessionMiddleware = session({
    store: new RedisStore({
        client: redisClient,
        logErrors: true,
        ttl: 60 * 60
    }),
    saveUninitialized: false,
    resave: false,
    secret: process.env.PASSPORT_SECRET,
    cookie: {
        sameSite: 'lax'
    }
});
app.use('/favicon.ico', () => { });
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

passportConfig();

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(helmet());
} else {
    app.use(morgan('dev'));
}

app.use(cookieParser(process.env.PASSPORT_SECRET));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: true,
    credentials: true,
}));

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
    console.log('err', err);
    res.status(500).send(errMsg.createErrMsg(err))
});

const http = require('http').createServer(app);
// const io = require('socket.io')(http, { origin: '*:*' });

// io.on('connection', (socket) => {
//     console.log('app socket connection')
// })

// io.on('connection', (socket) => {
//     console.log('user connected');
//     console.log('socket', socket)
//     console.log('socket cookie', socket.handshake.headers.cookie)
//     console.log(socket.request.geaders.cookie)
// })

// io.use(function (socket, next) {
//     // const cookie = socket.request.headers.cookie
//     // const cookieParse = cookie.split('=');
//     // console.log(cookieParser.signedCookie(cookieParse[1], process.env.PASSPORT_SECRET))
//     // console.log(cookieParse)
//     // console.log('session', socket.request)

//     // app.get('/socket', (req, res) => {
//     //     console.log('get socket')
//     //     console.log('req.session', req.session)
//     //     console.log('req.sessionId', req.sessionID)
//     // })
//     io.on('connection', (socket) => {

//         console.log('connection')
//         app.get('/socket', (req, res) => {
//             console.log('get socket')
//             console.log('req.session', req.session)
//             console.log('req.sessionId', req.sessionID)
//         })
//     })
// })

// app.listen(3065, () => {
//     console.log('서버 실행 중');
// });

const server = http.listen(3065, () => {
    console.log('connected')
});

webSocket(server, app, sessionMiddleware);