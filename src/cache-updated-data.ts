import redisMethods from './redis/redis.methods';
import { payLoadValidator } from './validation/validation.object-validator';

class CacheData {
  async setCacheData(value: any) {
    try {
      console.log('Entry message to redis.');
      const type = value.type;
      const body = value.body;

      const objectBody = payLoadValidator.parse(value);

      if (!objectBody) {
        console.error('Unknown input object!');
        return null;
      }

      const previousObject = await redisMethods.getByKey(objectBody.body.id);

      if (previousObject) {
        console.log(`Previous: `, JSON.parse(previousObject));
      }

      await redisMethods.publish(objectBody.body.id, JSON.stringify(objectBody));

      console.log(`New: `, value);
    } catch (error) {
      console.error(error);
    }
  }
}

const cacheData = new CacheData();
export default cacheData;
