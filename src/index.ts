import client, { Channel, Connection, ConsumeMessage } from 'amqplib';
import mqConnection from './rabbit-mq-connection';
import IORedis, { Result, Callback } from "ioredis";
import * as dotenv from 'dotenv';

dotenv.config()
const redisClient = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379/');

const handleIncomingNotification = (msg: string) => {
    try {
  
        const parsedMessage = JSON.parse(msg);
    
        console.log(`Received Notification`, parsedMessage);
        return parsedMessage;
    } catch (error) {
       console.error(`Error While Parsing the message`);
    }
  };

  
  
  const listen = async () => {
  
    await mqConnection.connect();
  
    const result = await mqConnection.consume(handleIncomingNotification);
    redisClient.set('1', result)
  };
  
  listen();