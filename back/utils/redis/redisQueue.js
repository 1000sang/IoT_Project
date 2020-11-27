const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

// process.env.REDIS_PORT, process.env.REDIS_HOST
const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

exports.pushRedisTopicQueue = (message) => {
    const data = JSON.parse(message);
    console.log(data.topic)

    redisClient.rpush('topic', data.topic);
    redisClient.watch('topic', (err) => {
        if (err) {
            console.log(err)
        }

        this.pushRedisDataQueue(data.topic, data.data)
    })
};

exports.pushRedisDataQueue = (topic, data) => {
    redisClient.rpush(topic, data)
}