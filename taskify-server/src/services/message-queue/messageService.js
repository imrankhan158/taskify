import amqplib from "amqplib";

class MessagingService {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  static async connect() {
    try {
      this.connection = await amqplib.connect(process.env.RABBITMQ_URL);
      this.channel = await this.connection.createChannel();
      return Promise.resolve(this.channel);
    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error);
      throw error;
    }
  }

  static async sendMessage(queue, message) {
    try {
      await this.channel.assertQueue(queue);
      await this.channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(message))
      );
    } catch (error) {
      console.error("Error sending message via RabbitMQ:", error);
      throw error;
    }
  }

  static async consumeMessages(queue, messageHandler) {
    try {
      await this.channel.assertQueue(queue);
      this.channel.consume(queue, (msg) => {
        if (msg !== null) {
          messageHandler(queue, JSON.parse(msg.content.toString()));
          this.channel.ack(msg);
        }
      });
    } catch (error) {
      console.error("Error consuming messages from RabbitMQ:", error);
      throw error;
    }
  }

  static async closeConnection() {
    try {
      await this.connection.close();
    } catch (error) {
      console.error("Error closing RabbitMQ connection:", error);
    }
  }
}

export default MessagingService;
