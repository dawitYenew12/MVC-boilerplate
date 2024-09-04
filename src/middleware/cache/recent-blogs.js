import redisClient from '../../config/redis.js';
import { logger } from '../../config/logger.js';

export default async (req, res, next) => {
  try {
    const key = 'recent-blogs';
    const cachedBlogs = await redisClient.get(key);
    if (cachedBlogs) {
      logger.info('Serving from cache');
      return res.json({ data: JSON.parse(cachedBlogs) });
    } else {
      next();
    }
  } catch (error) {
    logger.error(error);
    next();
  }
};
