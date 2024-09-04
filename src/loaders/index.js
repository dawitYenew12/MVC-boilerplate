import fs from 'fs';
import mongooseLoader from './mongoose.js';
import expressLoader from './express.js';
import { logger } from '../config/logger.js';
import subscribers from '../subscribers/user.js';
import EventEmitter from '../utils/eventEmitter.js';
import redisClient from '../config/redis.js';
import { createWorker } from '../backgound-tasks/workers/index.js';

export default async (app) => {
  await mongooseLoader();
  logger.info('mongoose initiated!');
  await redisClient.connect();
  logger.info('Redis initiated!');
  await expressLoader(app);
  logger.info('express app initiated!');
  Object.keys(subscribers).forEach((eventName) => {
    EventEmitter.on(eventName, subscribers[eventName]);
  });
  fs.access('uploads', fs.constants.F_OK, async (err) => {
    if (err) {
      await fs.promises.mkdir('uploads');
    }
  });

  const workers = [
    { name: 'ImageProcessor', filename: 'imageProcessor.js' },
    { name: 'CacheProcessor', filename: 'cacheProcessor.js' },
  ];

  workers.forEach(async (worker) => {
    await createWorker(worker.name, worker.filename);
  });
};
