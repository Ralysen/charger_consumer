import mqConnection from './rabbit-mq.connection';
import cacheData from '../cache-updated-data';
import { payLoadValidator } from '../validation/validation.object-validator';

class RabbitMqConsumer {
  consume(queueName: string) {
    mqConnection.channel.assertQueue(queueName, { durable: true });
    mqConnection.channel.consume(
      'test',
      async (msg) => {
        {
          if (!msg) {
            return console.error(`Invalid incoming message`);
          }

          const result = payLoadValidator.parse(
            JSON.parse(msg.content.toString()),
          );

          console.log('Received message from RabbitMQ.');

          cacheData.setCacheData(result);

          mqConnection.channel.ack(msg);
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
