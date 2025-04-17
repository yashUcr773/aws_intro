const { createClient } = require('redis');
require('dotenv').config()

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.error('Redis error:', err));

const connectRedis = async () => {
    await redisClient.connect();
    console.log('Redis connected');
};

module.exports = { redisClient, connectRedis }