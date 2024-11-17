import express from 'express';
import cors from 'cors';
import router from './routers/index.js';
import logger from './utils/logger.js';
import { env } from './utils/env.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );
  app.use(cors());

  // app.use(logger);

  app.use(router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port = Number(env('PORT', '3000'));

  app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
};
