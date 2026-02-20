import "dotenv/config";
import http from "http";
import { MONGO_URI, PORT } from "./config/env";
import app from "./app";
import { connectDB } from "./config/db";
import { connectProducer } from "./kafka/producer";
import { startConsumer } from "./kafka/consumer";
import { initSocket } from "./socket/socket";
import logger from "./utils/logger";


async function startServer() {
  // Connect DB
  await connectDB(MONGO_URI);
  logger.info("Connected to MongoDB");

  // Connect Kafka
  await connectProducer();
  logger.info("Connected to Kafka Producer");
  await startConsumer();
  logger.info("Kafka Consumer started");

  // 🔥 Create HTTP server instead of app.listen
  const server = http.createServer(app);

  // 🔥 Initialize socket
  initSocket(server);

  // Start server
  server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

startServer();
