import Blog from "./../models/blog.model.js";
import { catchAsync } from "../utils/catchAsync.js";

const createBlog = catchAsync(async (req, res) => {
  await Blog.create(req.body);
  res.send({ success: true, message: "Blog created successfully" });
});

const getBlogs = catchAsync(async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

export { getBlogs, createBlog };
