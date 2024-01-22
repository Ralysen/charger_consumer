import mqConsumer from './rabbit-mq/rabbit-mq.consumer';
import redisMethods from './redis/redis.methods';

class CacheData {
  async setCacheData(value: any) {
    try {
      console.log('Entry message to redis.');

      const objectBody = mqConsumer.payLoadValidator.parse(value);

      const previousObject = await redisMethods.getByKey(objectBody.body.id);

      if (previousObject) {
        console.log(`Previous: `, JSON.parse(previousObject));
      }

      await redisMethods.publish(
        objectBody.body.id,
        JSON.stringify(objectBody.body),
      );

      console.log(`New: `, objectBody.body);
    } catch (error) {
      console.error(error);
    }
  }
}

const cacheData = new CacheData();
export default cacheData;
