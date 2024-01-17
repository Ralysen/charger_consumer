import mqConnection from "./rabbit-mq.connection";
import redisMethods from "../redis/redis.methods";
import getIdFromObject from "../Object-handling/object-handling.get-id-from-object";

class RabbitMqConsumer {
    
    consume() {
        mqConnection.channel.assertQueue('test', { durable: true });
        mqConnection.channel.consume('test', async (msg) => {
            {
                if (!msg) {
                    return console.error(`Invalid incoming message`);
                }
            
                const result = JSON.parse(msg.content.toString());

                console.log('Received message from RabbitMQ.');

                const id = getIdFromObject.getId(result);
                const res = await redisMethods.getByKey(JSON.stringify(id));

                console.log(`Previous: `, res);

                await redisMethods.publish(JSON.stringify(id), JSON.stringify(result));

                console.log(`New: `, result);

                mqConnection.channel.ack(msg);
              }
            },
            {
              noAck: false,
            }
        )
    }
}

const mqConsumer = new RabbitMqConsumer();
export default mqConsumer;