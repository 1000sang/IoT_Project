const siteService = require('../service/site');

exports.createSite = async (req, res, next) => {
    try {
        const payload = {
            siteCode: req.body.siteCode,
            siteName: req.body.siteName
        }
        const findOneSite = await siteService.findOneSite(payload.siteCode);

        const createSite = await siteService.createSite(payload);
        res.status(200).send(createSite);
    } catch (err) {
        next(err)
    }
}