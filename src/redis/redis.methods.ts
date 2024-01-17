import IORedis from 'ioredis';
import * as dotenv from 'dotenv';

dotenv.config();

class RedisConnection {
  redisClient = new IORedis(
    `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` ||
      'redis://localhost:6379/',
  );

  async publish(key: string, value: string) {
    await this.redisClient.set(key, value);
  }

  async getByKey(key: string) {
    return await this.redisClient.get(key);
  }
}

const redisMethods = new RedisConnection();
export default redisMethods;
