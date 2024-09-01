import Blog from './../models/blog.model.js';
import { logger } from './../config/logger.js';

export const createBlog = async (reqBody, userId) => {
  await Blog.create({ ...reqBody, createdBy: userId });
};

export const getBlogs = async (userId) => {
  const blogs = await Blog.find({ createdBy: userId });
  return blogs;
};

export const fileUpload = async (filePath) => {
  logger.info(`File uploaded successfully at ${filePath}`);
};

export default { createBlog, getBlogs };
