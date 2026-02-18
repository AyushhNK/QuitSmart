import express from 'express';
import router from './routes/routes';
import errorHandler from './middleware/errorHandler';
import { setupSwagger } from './swagger/index';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api", router);

setupSwagger(app);

app.use(errorHandler)

export default app;