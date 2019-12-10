import express from 'express';
import 'express-async-errors';
import log4js from 'log4js';
import httpStatus from 'http-status-codes';
import helmet from 'helmet';
import { errors } from 'celebrate';
import { createRouter } from 'express-laravel-router';
import swagger from './swagger';
import routes from './routes';

const logger = log4js.getLogger('app');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }));

swagger(app);
routes(createRouter(app));

app.use(errors());

app.use((req, res) => res.status(httpStatus.NOT_FOUND).json({
  message: 'Not found',
  data: null,
}));

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error(`Internal server error: ${err}`);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    message: 'Internal server error',
    data: null,
  });
});

export default app;
