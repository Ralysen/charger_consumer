import redisMethods from './redis/redis.methods';

class CacheData {
  async logPreviousObject(value: any) {
    const objectBody = value;

    const previousObject = await redisMethods.getByKey(objectBody.body.id);

    if (previousObject) {
      console.log(`Previous: `, JSON.parse(previousObject));
    }
  }

  async setCacheData(value: any) {
    try {
      console.log('Entry message to redis.');

      await redisMethods.publish(value.body.id, JSON.stringify(value.body));

      console.log(`New: `, value.body);
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }
}

const cacheData = new CacheData();
export default cacheData;
