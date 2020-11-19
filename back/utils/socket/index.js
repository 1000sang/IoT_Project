const socketIo = require('socket.io');
const axios = require('axios');

module.exports = (server, app, sessionMiddleware) => {
    const io = socketIo(server, { origin: '*:*' });
    app.set('io', io);
    const device = io.of('/device');

    // const sessionStore = new sessionMiddleware();

    io.use((socket, next) => {
        try {
            sessionMiddleware(socket.request);
        } catch (err) {
            console.log(err);
            next(err);
        }
    });

    device.on('connection', (socket) => {
        console.log('device 네임스페이스 접속');
        socket.on('login', (data) => {
            console.log('login')
            console.log('login data', data)
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

