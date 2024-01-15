import IORedis, { Result, Callback } from "ioredis";
import * as dotenv from 'dotenv';

dotenv.config()

const redisClient = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379/');

class RedisConnection {

    async publish(notigicationObject: any) {
        
    }
}

const redisConnection = new RedisConnection();
export default redisConnection;