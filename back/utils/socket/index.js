const io = require('socket.io');

module.exports = (server, sessionMiddleware) => {
    const socket = io(server, { origin: '*:*' });
    socket.use((socket, next) => {
        sessionMiddleware(socket.request, socket.request.res, next);
    });



    socket.on('connection', (socket) => {
        console.log('socket connect')
        console.log('socket.request', socket.request);
        console.log('sessionId', socket.request.session)
    })
}
