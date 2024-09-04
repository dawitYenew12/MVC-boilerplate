import { Queue } from 'bullmq';
import config from '../../config/config.js';

const cacheProccessorQueue = new Queue('CacheProcessor', {
  connection: {
    host: config.redis.host,
    port: config.redis.port,
  },
});

export default cacheProccessorQueue;
