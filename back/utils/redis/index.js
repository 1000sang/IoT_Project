const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

// process.env.REDIS_PORT, process.env.REDIS_HOST
let redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

redisClient.on('message', function () {
    console.log('Redis connected');
})

redisClient.on('error', function (err) {
    console.log('Redis error: ' + err);
})

module.exports = redisClient