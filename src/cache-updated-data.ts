import redisMethods from './redis/redis.methods';
import {
  ChargingStationForm,
  ConnectorForm,
  StationTypeForm,
} from './validation/validation.object-validator';
import { z } from 'zod';

type PayLoadType =
  | z.infer<typeof ChargingStationForm>
  | z.infer<typeof ConnectorForm>
  | z.infer<typeof StationTypeForm>;

class CacheData {
  async logPreviousObject(value: PayLoadType) {
    const previousObject = await redisMethods.getByKey(value.id);

    if (previousObject) {
      return JSON.parse(previousObject);
    }
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
