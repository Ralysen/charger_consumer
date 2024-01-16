import client, { Channel, Connection } from "amqplib";
import * as dotenv from 'dotenv';

import redisConnection from "../redis/redis-connection";
import getIdFromObject from "../Object-handling/object-handling.get-id-from-object";
type HandlerCB = (msg: string) => any;

dotenv.config()

class RabbitMQConnection {
    connection!: Connection;
    channel!: Channel;
    private connected!: Boolean;

    async connect() {
        if(this.connected && this.channel) return;

        try {
            console.log('Connection to RabbitMQ');

            this.connection = await client.connect(
                `amqp://${process.env.CLOUDAMQP_HOST}:${process.env.CLOUDAMQP_PORT}` || 'amqp://localhost:5672/'
            );

            console.log('RabbitMQ connection is ready');

            this.channel = await this.connection.createChannel();

            console.log('Created channel successfully');

            this.connected = true;
        } catch (error) {
            console.log(error);
        }
    }

    consume(handleIncomingNotification: HandlerCB) {
        let prevRes: Object;
        this.channel.assertQueue('test', { durable: true });
        this.channel.consume('test', async (msg) => {
            {
                if (!msg) {
                    return console.error(`Invalid incoming message`);
                }
                
                const result = handleIncomingNotification(msg.content.toString());
    
                console.log('Received message from RabbitMQ.');

                const id = getIdFromObject.getId(result);
                
                const res = await redisConnection.getByKey(JSON.stringify(id));

                console.log(`Previous: `, res)

                await redisConnection.publish(JSON.stringify(id), JSON.stringify(result));

                console.log(`New: `, result);
                this.channel.ack(msg);
              }
            },
            {
              noAck: false,
            }

        )
    }
}

const mqConnection = new RabbitMQConnection();
export default mqConnection
