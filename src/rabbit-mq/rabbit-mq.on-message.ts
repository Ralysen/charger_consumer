import { ConsumeMessage } from 'amqplib';
import cacheData from '../cache-updated-data';
import { payLoadValidator } from '../dto/dto.message';

export const onMessage = async (msg: ConsumeMessage) => {
  {
    const result = payLoadValidator.parse(JSON.parse(msg.content.toString()));

    const previousObject = await cacheData.logPreviousObject(result.body);

    console.log('Received message from RabbitMQ.');

    const newObject = await cacheData.setCacheData(result.body);

    console.log({
      previousObject,
      newObject,
    });
  }
};
