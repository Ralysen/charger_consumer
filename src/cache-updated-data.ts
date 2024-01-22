import redisMethods from './redis/redis.methods';

class CacheData {
  async logPreviousObject(value: any) {
    const previousObject = await redisMethods.getByKey(value.body.id);

    if (previousObject) {
      return JSON.parse(previousObject);
    }
  }

  async setCacheData(value: any) {
    try {
      console.log('Entry message to redis.');

      await redisMethods.publish(value.body.id, JSON.stringify(value.body));

      return value.body;
    } catch (error) {
      throw new Error(`Internal server error: ${error}`);
    }
  }
}

const cacheData = new CacheData();
export default cacheData;
