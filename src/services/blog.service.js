import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Blog from './../models/blog.model.js';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createBlog = async (reqBody, userId) => {
  await Blog.create({ ...reqBody, createdBy: userId });
};

export const getBlogs = async (userId) => {
  const blogs = await Blog.find({ createdBy: userId });
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

export default { createBlog, getBlogs, getFileStream };
