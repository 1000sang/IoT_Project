const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

redisClient.on('error', function (err) {
    console.log('Redis error: ' + err);
})

module.exports = redisClient