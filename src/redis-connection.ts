import IORedis, { Result, Callback } from "ioredis";
import * as dotenv from 'dotenv';


dotenv.config()


class RedisConnection {
    redisClient = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379/');

    async publish(key: string, value: string) {
        await this.redisClient.set(key, value);
    }

    async getByKey (key: string) {
        return new Promise(resolve => {
            this.redisClient.get(key).then(res => {
                if(!res) {
                    return null;
                }
                resolve(JSON.parse(res));
            })
        })
    }
}

const redisConnection = new RedisConnection();
export default redisConnection;