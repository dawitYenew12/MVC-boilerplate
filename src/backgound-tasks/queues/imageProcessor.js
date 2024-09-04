import { Queue } from 'bullmq';
import config from '../../config/config.js';

const imageProccessorQueue = new Queue('ImageProcessor', {
  connection: {
    host: config.redis.host,
    port: config.redis.port,
  },
});

export default imageProccessorQueue;
