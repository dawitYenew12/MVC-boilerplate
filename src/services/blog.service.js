import Blog from './../models/blog.model.js';

export const createBlog = async (reqBody, userId) => {
  await Blog.create({ ...reqBody, createdBy: userId });
};

export const getBlogs = async (userId) => {
  const blogs = await Blog.find({ createdBy: userId });
  return blogs;
};

export default { createBlog, getBlogs };
