import client, { Channel, Connection } from 'amqplib';
import * as dotenv from 'dotenv';

dotenv.config();

class RabbitMQConnection {
  connection!: Connection;
  channel!: Channel;
  private connected!: boolean;

  async connect() {
    if (this.connected && this.channel) return;

    try {
      console.log('Connection to RabbitMQ');

      this.connection = await client.connect(
        `amqp://${process.env.CLOUDAMQP_HOST}:${process.env.CLOUDAMQP_PORT}` ||
          'amqp://localhost:5672/',
      );

      console.log('RabbitMQ connection is ready');

      this.channel = await this.connection.createChannel();

      console.log('Created channel successfully');

      this.connected = true;
    } catch (error) {
      console.log(error);
    }
  }
}

const mqConnection = new RabbitMQConnection();
export default mqConnection;
