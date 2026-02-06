import 'dotenv/config';
import { MONGO_URI, PORT } from './config/env';
import app from './app';
import { connectDB } from './config/db';

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB(MONGO_URI);
});

