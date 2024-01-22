import redisMethods from './redis/redis.methods';
import { PayLoadType } from './dto/object-types.dto';

class CacheData {
  async previousObject(value: string) {
    let previousObject = await redisMethods.getByKey(value);

    if (!previousObject) {
      return null;
    }
    return JSON.parse(previousObject) as PayLoadType;
  }

  async setCacheData(value: PayLoadType) {
    try {
      console.log('Entry message to redis.');

      await redisMethods.publish(value.id, JSON.stringify(value));

      return value;
    } catch (error) {
      throw new Error(`Internal server error: ${error}`);
    }
  }
}

const cacheData = new CacheData();
export default cacheData;
