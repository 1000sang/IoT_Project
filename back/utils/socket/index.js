const socketIo = require('socket.io');
const axios = require('axios');
const dotenv = require('dotenv');


dotenv.config()

module.exports = (server, app) => {
    const io = socketIo(server, { origin: '*:*' });

    app.set('io', io);
    const deviceRoom = io.of('/deviceRoom');

    deviceRoom.on('connection', (socket) => {
        console.log('device 네임스페이스 접속');

        socket.on('disconnect', () => {
            console.log('device 네임스페이스 접속 해제');
        })
    })
}

