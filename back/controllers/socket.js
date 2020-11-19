const socketService = require('../service/socket');

exports.getSocket = async (req, res, next) => {
    console.log('getSocket API')
    // console.log(req.session.passport);
    const socket = req.app.get('io')
    console.log(socket)
    return res.send('a')
}

exports.createSocketRoom = async (req, res, next) => {
    try {
        console.log('createSocketRoom')
        console.log(req.body)
        // const payload = {
        //     userId: req,
        // }
        const socket = req.app.get('io');

        const device = socket.of('/device');
        device.on('connect', (socket) => {
            console.log('device 네임스페이스 접속')
            socket.on('disconnect', () => {
                console.log('device 네임스페이스 젒ㄱ 해제')
            })
        })


        // socket.device.on('connection', (socket) => {
        //     console.log('device 네임스페이스 접속');
        //     console.log('socket', socket)
        //     console.log('')
        //     console.log('socket request', socket.request)
        //     socket.on('disconnect', () => {
        //         console.log('device 네임스페이스 접속 해제');
        //     })
        // })

        // console.log('createSocketRoom userId param', payload);

        // const createRoom = await socketService.createRoom(payload);

        // const createSite = await siteService.createSite(payload);
        res.status(200).send('createSocketRoom oK');
    } catch (err) {
        next(err)
    }
}