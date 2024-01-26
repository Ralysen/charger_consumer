import IORedis from 'ioredis';
import * as dotenv from 'dotenv';
import { PayLoadType } from '../dto/object-types.dto';

dotenv.config();

export class RedisMethods {
  private redisClient: IORedis;

  constructor(ioRedis: IORedis) {
    this.redisClient = ioRedis;
  }

  async getPreviousObject(value: string) {
    const previousObject = await this.redisClient.get(value);

    if (previousObject) {
      return JSON.parse(previousObject) as PayLoadType;
    }
    return null;
  }

  async setCacheData(value: PayLoadType) {
    try {
      console.log('Entry message to redis.');

      this.redisClient.set(value.id, JSON.stringify(value));

      return value;
    } catch (error) {
      throw new Error(`Internal server error: ${error}`);
    }
  }
}
