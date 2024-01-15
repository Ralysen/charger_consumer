"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rabbit_mq_connection_1 = __importDefault(require("./rabbit-mq-connection"));
const handleIncomingNotification = (msg) => {
    try {
        const parsedMessage = JSON.parse(msg);
        console.log(`Received Notification`, parsedMessage);
        // Implement your own notification flow
    }
    catch (error) {
        console.error(`Error While Parsing the message`);
    }
};
const listen = async () => {
    await rabbit_mq_connection_1.default.connect();
    await rabbit_mq_connection_1.default.consume(handleIncomingNotification);
};
listen();
