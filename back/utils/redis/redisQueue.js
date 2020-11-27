const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

// process.env.REDIS_PORT, process.env.REDIS_HOST
const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

exports.rpushRedisTopicQueue = (message) => {
    redisClient.rpush('topic', data.topic);
}
exports.rpushRedisDataQueue = (topic, data) => {
    redisClient.rpush(topic, data);
}