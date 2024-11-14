import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/index.js';
import logger from './utils/logger.js';
import { env } from './utils/env.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );
  app.use(cors());

  app.use(logger);

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
};
