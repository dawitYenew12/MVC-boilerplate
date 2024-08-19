import Blog from "./../models/blog.model.js";

export const createBlog = async (reqBody) => {
  await Blog.create(reqBody);
};

export const getBlogs = async () => {
  const blogs = await Blog.find({});
  return blogs;
};

export default { createBlog, getBlogs };
