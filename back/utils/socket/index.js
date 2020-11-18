const io = require('socket.io');

module.exports = (server) => {
    const socket = io(server, { origin: '*:*' });

    socket.on('connection', (socket, req) => {
        console.log('socket connect')
    })
}
