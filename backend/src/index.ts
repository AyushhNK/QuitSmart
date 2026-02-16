import 'dotenv/config';
import { MONGO_URI, PORT } from './config/env';
import app from './app';
import { connectDB } from './config/db';
import { connectProducer } from './kafka/producer';
import { startConsumer } from './kafka/consumer';
import { start } from 'node:repl';


async function startServer() {
    await connectDB(MONGO_URI);
    await connectProducer();
    await startConsumer();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
startServer()