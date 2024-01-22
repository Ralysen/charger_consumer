import mqConnection from './rabbit-mq.connection';
import cacheData from '../cache-updated-data';
import { z } from 'zod';

class RabbitMqConsumer {
  private ChargingStationForm = z.object({
    id: z.string().uuid(),
    name: z.string(),
    device_id: z.string().uuid(),
    ip_address: z.string().ip({ version: 'v4' }),
    firmware_version: z.string(),
  });

  private ConnectorForm = z.object({
    id: z.string().uuid(),
    name: z.string(),
    priority: z.boolean(),
  });

  private StationTypeForm = z.object({
    id: z.string().uuid(),
    name: z.string(),
    plug_count: z.number(),
    efficiency: z.number(),
  });

  payLoadValidator = z.discriminatedUnion('type', [
    z.object({
      type: z.literal('charging_station'),
      body: this.ChargingStationForm,
    }),
    z.object({ type: z.literal('connector'), body: this.ConnectorForm }),
    z.object({ type: z.literal('station_type'), body: this.StationTypeForm }),
  ]);

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
