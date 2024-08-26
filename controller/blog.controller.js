import { catchAsync } from "../utils/catchAsync.js";
import blogService from "../services/blog.service.js";
import httpStatus from "http-status";

const createBlog = catchAsync(async (req, res) => {
  console.log(req.user.id)
  await blogService.createBlog(req.body, req.user.id);
  res.status(httpStatus.CREATED).send({ success: true, message: "Blog created successfully" });
});

const getBlogs = catchAsync(async (req, res) => {
  const blogs = await blogService.getBlogs(req.body.userId);
  res.status(httpStatus.OK).json(blogs);
});

export { getBlogs, createBlog };
// 66cb7e3cc7c5ac6abfeacd12