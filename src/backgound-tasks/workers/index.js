import { Worker } from 'bullmq';
import config from '../../config/config.js';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { logger } from '../../config/logger.js';

const start = async () => {
  const filename = path.join(__dirname, 'imageProcessor.js');
  const fileUrl = pathToFileURL(filename);
  const imageProccessorWorker = new Worker('ImageProcessor', fileUrl, {
    connection: {
      host: config.redis.host,
      port: config.redis.port,
    },
    autorun: true,
  });

  imageProccessorWorker.on('completed', (job) => {
    logger.info(`completed job: ${job.id}`);
  });
};

export default { start };
