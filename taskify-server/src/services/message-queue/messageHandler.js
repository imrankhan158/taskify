class MessageHandler {
  constructor() {}
  async consumeMessage(queue, message) {
    console.log("message", message, "queue", queue);
  }
}

export default MessageHandler;
