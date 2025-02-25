// filepath: /d:/development project/AI Developer/Backend/services/redis.service.js
import Redis from 'ioredis';

const createRedisClient = (retries = 5) => {
    const redisClient = new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
    });

    redisClient.on('connect', () => {
        console.log('Redis connected');
    });

    redisClient.on('error', (err) => {
        console.error('Redis error:', err);
        if (retries > 0) {
            console.log(`Retrying to connect to Redis... (${retries} retries left)`);
            setTimeout(() => createRedisClient(retries - 1), 5000);
        }
    });

    return redisClient;
};

const redisClient = createRedisClient();

export default redisClient;