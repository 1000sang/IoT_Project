const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

// process.env.REDIS_PORT, process.env.REDIS_HOST
const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

redisClient.watch('topic', (err) => {
    if (err) {
        console.log(err);
    }

    redisClient.lrange('topic', 0, 1, (err, arr) => {
        console.log('redisClient lrange', arr);
    })
})



module.exports = redisClient