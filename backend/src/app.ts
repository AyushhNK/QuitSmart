import express from 'express';
import router from './routes/routes';
import errorHandler from './middleware/errorHandler';
import { setupSwagger } from './swagger/index';
import { apiThrottler } from './middleware/throttler.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api", apiThrottler, router);

setupSwagger(app);

app.use(errorHandler)

export default app;