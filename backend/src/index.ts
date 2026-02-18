import "dotenv/config";
import http from "http";
import { MONGO_URI, PORT } from "./config/env";
import app from "./app";
import { connectDB } from "./config/db";
import { connectProducer } from "./kafka/producer";
import { startConsumer } from "./kafka/consumer";
import { initSocket } from "./socket/socket";

async function startServer() {
  // Connect DB
  await connectDB(MONGO_URI);

  // Connect Kafka
  await connectProducer();
  await startConsumer();

  // 🔥 Create HTTP server instead of app.listen
  const server = http.createServer(app);

  // 🔥 Initialize socket
  initSocket(server);

  // Start server
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer();
