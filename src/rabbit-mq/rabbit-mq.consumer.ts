import { ConsumeMessage } from 'amqplib';
import { payLoadUnion } from '../dto/payload-union.dto';
import { RabbitMQConnection } from '../rabbit-mq/rabbit-mq.connection';
import { RedisMethods } from '../redis/redis.methods';
import * as dotenv from 'dotenv';

dotenv.config();

export class RabbitMqConsumer {
  private redisMethods: RedisMethods;
  private mqConnection: RabbitMQConnection;

  constructor(redisMethods: RedisMethods, mqConnection: RabbitMQConnection) {
    this.redisMethods = redisMethods;
    this.mqConnection = mqConnection;
  }

  consume(queueName: string) {
    this.mqConnection.channel.assertQueue(queueName, { durable: true });
    this.mqConnection.channel.consume(
      process.env.RABBIT_MQ_QUEUE || 'test',
      async (msg) => {
        try {
          if (!msg) throw new Error(`Invalid incoming message`);
          await this.onMessage(msg);
          this.mqConnection.channel.ack(msg);
        } catch (error) {
          if (msg) {
            this.mqConnection.channel.nack(msg);
          }
          console.error(error);
        }
      },
      {
        noAck: false,
      },
    );
  }

  async onMessage(msg: ConsumeMessage) {
    {
      const result = payLoadUnion.parse(JSON.parse(msg.content?.toString()));
      const previousObject = await this.redisMethods.getPreviousObject(
        result.body.id,
      );
      console.log('Received message from RabbitMQ.');
      const newObject = await this.redisMethods.setCacheData(result.body);
      console.log({
        type: result.type,
        previous: previousObject,
        current: newObject,
      });
    }
  }
}
