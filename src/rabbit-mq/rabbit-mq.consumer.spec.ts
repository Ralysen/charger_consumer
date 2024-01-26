import { ConsumeMessage } from 'amqplib';
import { RedisMethods } from '../redis/redis.methods';
import { RabbitMQConnection } from './rabbit-mq.connection';
import { RabbitMqConsumer } from './rabbit-mq.consumer';
import { payLoadUnion } from '../dto/payload-union.dto';

describe('RabbitMqConsumer tests', () => {
  let redisMethods: RedisMethods;
  let mqConnection: RabbitMQConnection;
  let rabbitMqConsumer: RabbitMqConsumer;

  const stationType = {
    id: '82090efe-0482-4ae5-907e-6c043e2765df',
    name: 'Very fast charging station',
    plug_count: 2,
    efficiency: 12.12,
  };

  redisMethods = {
    getPreviousObject: jest.fn().mockResolvedValue(stationType),
    setCacheData: jest.fn().mockResolvedValue(stationType),
  } as unknown as RedisMethods;

  mqConnection = {
    channel: {
      assertQueue: jest.fn(),
      consume: jest.fn().mockImplementation(async (queue, callback) => {
        callback('test');
      }),
      ack: jest.fn(),
      nack: jest.fn(),
    },
  } as unknown as RabbitMQConnection;

  beforeEach(async () => {
    rabbitMqConsumer = new RabbitMqConsumer(redisMethods, mqConnection);
  });

  describe('consume method test', () => {
    it('Should consume queue correctly', async () => {
      //Arrang
      jest.spyOn(rabbitMqConsumer, 'onMessage').mockResolvedValueOnce();

      //Act
      await rabbitMqConsumer.consume('test');

      //Assert
      expect(mqConnection.channel.assertQueue).toHaveBeenCalledWith('test', {
        durable: true,
      });
      expect(mqConnection.channel.consume).toHaveBeenCalledTimes(1);
      expect(rabbitMqConsumer.onMessage).toHaveBeenCalledTimes(1);
      expect(mqConnection.channel.ack).toHaveBeenCalledTimes(1);
    });
  });

  describe('onMessage method test', () => {
    it('Should complete onMessage successfully', async () => {
      //Arrange
      console.log = jest.fn();
      JSON.parse = jest.fn().mockImplementation((callback) => {
        callback;
      });
      payLoadUnion.parse = jest
        .fn()
        .mockReturnValue({ type: 'station_type', body: stationType });

      //Act
      await rabbitMqConsumer.onMessage(
        stationType as unknown as ConsumeMessage,
      );

      //Assert
      expect(redisMethods.setCacheData).toHaveBeenCalledWith(stationType);
      expect(redisMethods.getPreviousObject).toHaveBeenCalledWith(
        stationType.id,
      );
      expect(payLoadUnion.parse).toHaveBeenCalledTimes(1);
    });
  });
});
