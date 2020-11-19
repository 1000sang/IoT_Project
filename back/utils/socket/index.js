const socketIo = require('socket.io');
const redisClient = require('../redis');
const axios = require('axios');

module.exports = (server, app) => {
    const io = socketIo(server, { origin: '*:*' });
    app.set('io', io);
    const device = io.of('/device');

    device.on('connection', (socket) => {
        console.log('device 네임스페이스 접속');
        socket.on('login', (data) => {
            console.log('login data', data)
            redisClient.hgetall(`${data.userId}/device`, (err, obj) => {
                const topics = Object.values(obj)
                topics.map((v, i) => {
                    console.log(v)
                })

                console.log('redisClient', Object.values(obj))
                console.log('redisClient', Object.values(obj)[0])
                // console.log('redisClient deviceId', obj[0].deviceId)
            })
        })
        // const req = socket.request;
        // const { headers: { referer } } = req;
        // const roomId = referer
        //     .split('/')[referer.split('/'.length - 1)].
        //     replace(/\?.+/, '');
        // console.log('referer', referer)
        // console.log('roomId', roomId);
        // console.log('req', req)
        // console.log('req.session', req.session)
        socket.on('disconnect', () => {
            console.log('device 네임스페이스 접속 해제');
        })
    })

    // io.use((socket, next) => {
    //     try {
    //         sessionMiddleware(socket.request, socket.request.res, next);
    //     } catch (err) {
    //         console.log(err);
    //         next(err);
    //     }
    // });

    // io.on('connection', async (socket) => {
    //     try {
    //         console.log('sdfadf')
    //         // console.log(socket.request)
    //         // console.log(' ')
    //         // console.log(socket.request.res)
    //         console.log('asdfasdfs')
    //         console.log(socket.id)


    //         // const getSocket = await axios.get('http://localhost:3065/user/session');
    //         // console.log(getSocket)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // })
}

