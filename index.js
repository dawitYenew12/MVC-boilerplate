import http from 'http';
import mongoose from 'mongoose';
import config from './config/config.js';
import app from './server.js';
import { logger } from './config/logger.js';

mongoose
  .connect(config.dbUri)
  .then(() => {
    logger.info('connected to mongodb');
  })
  .catch((err) => {
    logger.error(err);
  });

const httpServer = http.createServer(app);
const server = httpServer.listen(config.port, () => {
  logger.info('server listening on port 3000');
});

function exitHandler() {
  if (server) {
    server.close(() => {
      logger.info('server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}
function unExpectedErrorHandler(error) {
  logger.error(error);
  exitHandler();
}
process.on('uncaughtException', unExpectedErrorHandler);
process.on('unhandledRejection', unExpectedErrorHandler);
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

const variable = 'hello';
