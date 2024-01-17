import { AnyObject } from 'redis-object-interface';
import getIdFromObject from './Object-handling/object-handling.get-id-from-object';
import redisMethods from './redis/redis.methods';

class CacheData {
  async setCacheData(value: AnyObject) {
    try {
      console.log('Entry message to redis.');
      const id = getIdFromObject.getId(value);

      const previousObject = await redisMethods.getByKey(
        JSON.stringify(id),
      );

      if (previousObject) {
        console.log(`Previous: `, JSON.parse(previousObject));
      }

      await redisMethods.publish(JSON.stringify(id), JSON.stringify(value));

      console.log(`New: `, value);
    } catch (error) {
      console.error(error);
    }
  }
}

const casheData = new CacheData();
export default casheData;
