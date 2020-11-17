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
        if (redisClient.exists(`${userId}/device`)) {
            redisClient.del(`${userId}/device`);
        }
    } catch (err) {
        console.log(err);
        throw new Errors.UnknownRedisError();
    }
}
