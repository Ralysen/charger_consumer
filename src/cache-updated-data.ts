import redisMethods from './redis/redis.methods';
import objectValidator from './validation/validation.object-validator';
import { AnyObject } from 'class.any-object';

class CacheData {
  async setCacheData(value: AnyObject) {
    try {
      console.log('Entry message to redis.');
      const type = value.type;
      const body = value.body;

      const objectBody = objectValidator.validate(type, body);

      if (!objectBody) {
        console.error('Unknown input object!');
        return null;
      }

      const previousObject = await redisMethods.getByKey(objectBody.id);

      if (previousObject) {
        console.log(`Previous: `, JSON.parse(previousObject));
      }

      await redisMethods.publish(objectBody.id, JSON.stringify(objectBody));

      console.log(`New: `, value);
    } catch (error) {
      console.error(error);
    }
  }
}

const cacheData = new CacheData();
export default cacheData;
