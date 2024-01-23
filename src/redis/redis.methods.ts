import IORedis from 'ioredis';
import * as dotenv from 'dotenv';
import { PayLoadType } from '../dto/object-types.dto';

dotenv.config();

class RedisMethods {
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

  async getPreviousObject(value: string) {
    const previousObject = await this.getByKey(value);

    if (previousObject) {
      return JSON.parse(previousObject) as PayLoadType;
    }
    return null;
  }

  async setCacheData(value: PayLoadType) {
    try {
      console.log('Entry message to redis.');

      await this.publish(value.id, JSON.stringify(value));

      return value;
    } catch (error) {
      throw new Error(`Internal server error: ${error}`);
    }
  }
}

const redisMethods = new RedisMethods();
export default redisMethods;
