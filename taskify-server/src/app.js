import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongosanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import authRoutes from "./routes/auth.js";
import { errorHandler } from "./middlewares/error.js";
import appRoutes from "./routes/app.js";
import CacheService from "./services/cache/cacheService.js";
import MessageService from "./services/message-queue/messageService.js";
import MessageHandler from "./services/message-queue/messageHandler.js";
dotenv.config();

const cacheType = process.env.CACHE_TYPE || "redis";
const cacheService = new CacheService(cacheType);
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.ALLOWED_ORIGIN,
  })
);

app.set("cacheService", cacheService);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(
  "/",
  rateLimit({
    max: 3000,
    windowMs: 60 * 60 * 1000,
    message: "Too many Requests from this IP, please try again in an hour!",
  })
);

app.use(mongosanitize());
app.use(xss());

MessageService.connect()
  .then(() => {
    MessageService.sendMessage("queue_name", "Hello, World");
    MessageService.consumeMessages("queue_name", (queue, message) => {
      console.log("Received notification:", message);
      const messageHandler = new MessageHandler();
      messageHandler.consumeMessage(queue, message);
    });
  })
  .catch((error) => {
    console.error("Error connecting to messaging service:", error);
    MessageService.closeConnection();
  });

app.use("/auth", authRoutes);
app.use("/organization", appRoutes);
app.use(errorHandler);

export default app;
