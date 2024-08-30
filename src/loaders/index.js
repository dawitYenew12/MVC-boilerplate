import mongooseLoader from './mongoose.js';
import expressLoader from './express.js';
import { logger } from '../config/logger.js';
import subscribers from '../subscribers/user.js';
import EventEmitter from '../utils/eventEmitter.js';

export default async (app) => {
  await mongooseLoader();
  logger.info('mongoose initiated!');
  await expressLoader(app);
  logger.info('express app initiated!');
  Object.keys(subscribers).forEach((eventName) => {
    EventEmitter.on(eventName, subscribers[eventName]);
  });
};
