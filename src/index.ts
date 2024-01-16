import mqConnection from './rabbit-mq/rabbit-mq-connection';
import * as dotenv from 'dotenv';
import redisConnection from './redis/redis-connection';
import { AnyObject } from 'redis-object-interface';

dotenv.config()

const handleIncomingNotification = (msg: string) => {
    try {
        const parsedMessage = JSON.parse(msg);

        return parsedMessage;
      } catch (error) {
        console.error(`Error While Parsing the message`);
      }
    };
    
    const listen = async () => {
      
      await mqConnection.connect();

      mqConnection.consume(handleIncomingNotification);
    
    };
  
  listen();
  