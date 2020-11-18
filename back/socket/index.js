const io = require('socket.io')(http, { origin: '*:*' });
const dotenv = require('dotenv');

dotenv.config();


io.on('connection', (socket) => {
    console.log('user connected');
    console.log('socket', socket)
    console.log('socket cookie', socket.handshake.headers.cookie)
})

module.exports = io
