import { ConsumeMessage } from 'amqplib';
import cacheData from '../cache-updated-data';
import { payLoadValidator } from '../dto/message.dto';

export const onMessage = async (msg: ConsumeMessage) => {
  {
    const result = payLoadValidator.parse(JSON.parse(msg.content.toString()));

    const previousObject = await cacheData.previousObject(result.body.id);

    console.log('Received message from RabbitMQ.');

    const newObject = await cacheData.setCacheData(result.body);

    console.log({
      type: result.type,
      previous: previousObject,
      current: newObject,
    });
  }
};
