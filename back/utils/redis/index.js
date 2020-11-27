const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

// process.env.REDIS_PORT, process.env.REDIS_HOST
const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

exports.pushRedisTopicQueue = (message) => {
    const data = JSON.parse(message);

    redisClient.rpush('topic', data.topic);
}
exports.pushRedisDataQueue = (topic, data) => {
    redisClient.rpush(topic, data);
}

exports.redisClient = redisClient