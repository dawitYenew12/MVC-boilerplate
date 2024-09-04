import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Blog from './../models/blog.model.js';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';
import cacheProccessorQueue from '../backgound-tasks/queues/cacheProcessor.js';
import redisClient from '../config/redis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createBlog = async (reqBody, userId) => {
  await Blog.create({ ...reqBody, createdBy: userId });
  await redisClient.del('recent-blogs');
};

export const getRecentBlogs = async () => {
  const blogs = await Blog.find().sort({ createdAt: -1 }).limit(10);
  await cacheProccessorQueue.add('cacheProccessorJob', { blogs });
  return blogs;
};

export const getFileStream = async (filename) => {
  const filePath = path.join(__dirname, '../../uploads', filename);
  if (!fs.existsSync(filePath)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  const stream = fs.createReadStream(filePath);
  return stream;
};

export const searchBlog = async (searchQuery) => {
  const blogs = await Blog.find({ $text: { $search: searchQuery } });
  return blogs;
};

export default { createBlog, getRecentBlogs, getFileStream, searchBlog };
