const socketService = require('../service/socket');

exports.getSocket = async (req, res, next) => {
    console.log('getSocket API')
    return res.send(req.session.passport)
}

exports.createSocketRoom = async (req, res, next) => {
    try {
        const payload = {
            userId: req.params.userId,
        }
        console.log('createSocketRoom userId param', payload);

        const createRoom = await socketService.createRoom(payload);

        const createSite = await siteService.createSite(payload);
        res.status(200).send(createSite);
    } catch (err) {
        next(err)
    }
}