import { catchAsync } from "../utils/catchAsync.js";
import blogService from "../services/blog.service.js";
import httpStatus from "http-status";

const createBlog = catchAsync(async (req, res) => {
  await blogService.createBlog(req.body);
  res.status(httpStatus.CREATED).send({ success: true, message: "Blog created successfully" });
});

const getBlogs = catchAsync(async (req, res) => {
  const blogs = await blogService.getBlogs();
  res.status(httpStatus.OK).json(blogs);
});

export { getBlogs, createBlog };
