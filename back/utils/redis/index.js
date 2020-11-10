const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

// process.env.REDIS_PORT, process.env.REDIS_HOST
const redisClient = redis.createClient();

redisClient.on('error', function (err) {
    console.log('Redis error: ' + err);
})

module.exports = redisClient