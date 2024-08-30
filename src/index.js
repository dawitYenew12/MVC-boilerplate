import http from 'http';
import config from './config/config.js';
import express from 'express';
import { logger } from './config/logger.js';
import loader from './loaders/index.js';
import { configureHandlebars } from './config/handlebars.js';

function exitHandler(server) {
  if (server) {
    server.close(() => {
      logger.info('server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}
function unExpectedErrorHandler(server) {
  return function (error) {
    logger.error(error);
    exitHandler(server);
  };
}

const startServr = async () => {
  const app = express();
  await loader(app);
  await configureHandlebars(app);
  const httpServer = http.createServer(app);
  const server = httpServer.listen(config.port, () => {
    logger.info('server listening on port 3000');
  });
  process.on('uncaughtException', unExpectedErrorHandler(server));
  process.on('unhandledRejection', unExpectedErrorHandler(server));
  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });
};

startServr();
