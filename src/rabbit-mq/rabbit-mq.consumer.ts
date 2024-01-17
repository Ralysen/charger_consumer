import mqConnection from './rabbit-mq.connection';
import cacheData from '../cache-updated-data';

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

          const result = JSON.parse(msg.content.toString());

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
