import { ConsumeMessage } from 'amqplib';
import { payLoadValidator } from '../validation/validation.object-validator';
import cacheData from '../cache-updated-data';
import mqConnection from './rabbit-mq.connection';

export const onMessage = async (msg: ConsumeMessage | null) => {
  {
    if (!msg) {
      throw new Error(`Invalid incoming message`);
    }

    const result = payLoadValidator.parse(JSON.parse(msg.content.toString()));

    cacheData.logPreviousObject(result);

    console.log('Received message from RabbitMQ.');

    cacheData.setCacheData(result);

    mqConnection.channel.ack(msg);
  }
};
