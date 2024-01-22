import mqConnection from './rabbit-mq.connection';
import { onMessage } from './rabbit-mq.on-message';
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
          await onMessage(msg);
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
}

const mqConsumer = new RabbitMqConsumer();
export default mqConsumer;
