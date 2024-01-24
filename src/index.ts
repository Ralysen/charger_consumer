import mqConnection from './rabbit-mq/rabbit-mq.connection';
import * as dotenv from 'dotenv';
import mqConsumer from './rabbit-mq/rabbit-mq.consumer';
import 'reflect-metadata';

dotenv.config();

const listen = async () => {
  await mqConnection.connect();

  mqConsumer.consume(process.env.RABBIT_MQ_QUEUE || 'test');
};

listen();
