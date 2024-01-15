"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
class RabbitMQConnection {
    async connect() {
        if (this.connected && this.channel)
            return;
        try {
            console.log('Connection to RabbitMQ');
            this.connection = await amqplib_1.default.connect('amqp://localhost:5672/');
            console.log('RabbitMQ connection is ready');
            this.channel = await this.connection.createChannel();
            console.log('Created channel successfully');
            this.connected = true;
        }
        catch (error) {
            console.log(error);
        }
    }
    async consume(handleIncomingNotification) {
        await this.channel.assertQueue('test', { durable: true });
        this.channel.consume('test', (msg) => {
            var _a;
            {
                if (!msg) {
                    return console.error(`Invalid incoming message`);
                }
                handleIncomingNotification((_a = msg === null || msg === void 0 ? void 0 : msg.content) === null || _a === void 0 ? void 0 : _a.toString());
                this.channel.ack(msg);
            }
        }, {
            noAck: false,
        });
    }
}
const mqConnection = new RabbitMQConnection();
exports.default = mqConnection;
