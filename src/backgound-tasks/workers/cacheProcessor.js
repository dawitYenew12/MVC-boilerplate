import ApiError from '../../utils/ApiError.js';
import httpStatus from 'http-status';
import redisClient from '../../config/redis.js';

export default async (job) => {
  try {
    const blogs = JSON.stringify(job.data.blogs);
    await redisClient.connect();
    await redisClient.set('recent-blogs', blogs);
  } catch (error) {
    throw new ApiError(httpStatus.SERVICE_UNAVAILABLE, 'service unavailable');
  }
};
