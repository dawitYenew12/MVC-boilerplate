import redis from 'redis';
import { logger } from './logger.js';

const client = redis.createClient();

client.on('error', (err) => {
  logger.error(err);
});

export default client;
