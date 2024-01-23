import { ConsumeMessage } from 'amqplib';
import { payLoadUnion } from '../dto/message-union.dto';
import mqConnection from './rabbit-mq.connection';
import cacheData from '../redis/redis.methods';
import * as dotenv from 'dotenv';

dotenv.config();

class RabbitMqConsumer {
  consume(queueName: string) {
    mqConnection.channel.assertQueue(queueName, { durable: true });
    mqConnection.channel.consume(
      process.env.RABBIT_MQ_QUEUE || 'test',
      async (msg) => {
        try {
          if (!msg) throw new Error(`Invalid incoming message`);
          await this.onMessage(msg);
          mqConnection.channel.ack(msg);
        } catch (error) {
          if (msg) {
            mqConnection.channel.nack(msg);
          }
          console.error(error);
        }
      },
      {
        noAck: false,
      },
    );
  }

  onMessage = async (msg: ConsumeMessage) => {
    {
      const result = payLoadUnion.parse(JSON.parse(msg.content.toString()));
      const previousObject = await cacheData.getPreviousObject(result.body.id);
      console.log('Received message from RabbitMQ.');
      const newObject = await cacheData.setCacheData(result.body);
      console.log({
        type: result.type,
        previous: previousObject,
        current: newObject,
      });
    }
  };
}

const mqConsumer = new RabbitMqConsumer();
export default mqConsumer;
