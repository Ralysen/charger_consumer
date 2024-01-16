import mqConnection from './rabbit-mq-connection';
import * as dotenv from 'dotenv';
import redisConnection from './redis-connection';
import { AnyObject } from 'redis-object-interface';

dotenv.config()

function getIdFromObject(obj: AnyObject): string | undefined {
  if (obj.updatedStation && obj.updatedStation.id) {
    return obj.updatedStation.id;
  } else if (obj.connector && obj.connector.id) {
    return obj.connector.id;
  } else if (obj.stationType && obj.stationType.id) {
    return obj.stationType.id;
  }
  return undefined;
}

const handleIncomingNotification = (msg: string) => {
    try {
        const parsedMessage = JSON.parse(msg);
        const id = getIdFromObject(parsedMessage);

        console.log(`Received Notification`, parsedMessage);

        redisConnection.publish(JSON.stringify(id), JSON.stringify(parsedMessage));
      } catch (error) {
        console.error(`Error While Parsing the message`);
      }
    };
    
    const listen = async () => {
      
      await mqConnection.connect();

      await mqConnection.consume(handleIncomingNotification);
    
    };
  
  listen();
  