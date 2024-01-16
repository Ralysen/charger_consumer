import client, { Channel, Connection } from "amqplib";
import * as dotenv from 'dotenv';
import redisConnection from './redis-connection'
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
                process.env.RABBITMQ_HOST || 'amqp://localhost:5672/'
            );

            console.log('RabbitMQ connection is ready');

            this.channel = await this.connection.createChannel();

            console.log('Created channel successfully');

            this.connected = true;
        } catch (error) {
            console.log(error);
        }
    }

    async consume(handleIncomingNotification: HandlerCB) {
        await this.channel.assertQueue('test', { durable: true });

        this.channel.consume('test', (msg) => {
            {
                if (!msg) {
                  return console.error(`Invalid incoming message`);
                }
                
                handleIncomingNotification(msg?.content?.toString());
                
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