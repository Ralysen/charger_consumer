import { RabbitMQConnection } from './rabbit-mq/rabbit-mq.connection';
import * as dotenv from 'dotenv';
import { RabbitMqConsumer } from './rabbit-mq/rabbit-mq.consumer';
import 'reflect-metadata';
import { RedisMethods } from './redis/redis.methods';

dotenv.config();

const listen = async () => {
  const mqConnection = new RabbitMQConnection();
  const redisMethods = new RedisMethods();
  await mqConnection.connect();
  const rabbitMQConsumer = new RabbitMqConsumer(redisMethods, mqConnection);

  rabbitMQConsumer.consume(process.env.RABBIT_MQ_QUEUE || 'test');
};

listen();
