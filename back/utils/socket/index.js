const socketIo = require('socket.io');
const axios = require('axios');

module.exports = (server, app, sessionMiddleware) => {
    const io = socketIo(server, { origin: '*:*' });

    // io.use((socket, next) => {
    //     try {
    //         sessionMiddleware(socket.request, socket.request.res, next);
    //     } catch (err) {
    //         console.log(err);
    //         next(err);
    //     }
    // });

    io.on('connection', async (socket) => {
        try {
            console.log('sdfadf')
            console.log()
            const getSocket = await axios.get('http://localhost:3065/socket');
            console.log(getSocket)
        } catch (err) {
            console.log(err)
        }
    })
}
