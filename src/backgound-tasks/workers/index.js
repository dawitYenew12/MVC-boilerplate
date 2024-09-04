import { Worker } from 'bullmq';
import config from '../../config/config.js';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { logger } from '../../config/logger.js';

export const createWorker = async (name, filename) => {
  const processorPath = pathToFileURL(path.join(__dirname, filename));
  const worker = new Worker(name, processorPath, {
    connection: {
      host: config.redis.host,
      port: config.redis.port,
    },
    autorun: true,
  });

  worker.on('completed', (job) => {
    logger.info(`completed job: ${job.name} Id: ${job.id}`);
  });
};

export default { createWorker };
