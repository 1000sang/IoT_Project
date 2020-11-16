const { Site } = require('../models');
const { createError } = require('../utils/error/error');
const redisClient = require('../utils/redis');

const Errors = (exports.Errors = {
    UnknownRedisError: createError('UnknownRedisError')
})

exports.setRedisUsersDevices = async (userId, Devices) => {
    try {
        Devices.map((v, i) => {
            redisClient.hmset(`${userId}/device`, `${v.deviceId}`, `${v.topic}`)
        })

        // redisClient.hgetall(`${userId}/divice`, (err, obj) => {
        //     console.log(Object.values(obj))
        // })
    } catch (err) {
        console.log(err);
        throw new Errors.UnknownRedisError();
    }
}

exports.deleteRedisKeys = async (userId) => {
    try {
        console.log('userId', userId);
        console.log(`${userId}/device`)
        console.log(redisClient.exists(`${userId}/device`))
        if (redisClient.exists(`${userId}/device`)) {
            redisClient.del(`${userId}/device`);
        }
    } catch (err) {
        console.log(err);
        throw new Errors.UnknownRedisError();
    }
}

exports.findOneSite = async (siteCode) => {
    const exSite = await Site.findOne({
        where: {
            siteCode: siteCode
        }
    })
    if (exSite) {
        throw new Errors.DuplicateSiteError()
    }
    return exSite;
}

exports.findOneBySiteCode = async (siteCode) => {
    const findOneBySiteCode = await Site.findOne({
        where: {
            siteCode: siteCode
        }
    })
    if (!findOneBySiteCode) {
        throw new Errors.SiteCodeNotFound()
    }
    return findOneBySiteCode
}


exports.createSite = async (payload) => {
    try {
        return await Site.create({
            siteCode: payload.siteCode,
            siteName: payload.siteName
        })
    } catch (err) {
        switch (err.name) {
            case 'ValidationError':
                throw new Errors.BadSiteDataError()
            default:
                throw new Errors.UnknownError()
        }
    }
}

