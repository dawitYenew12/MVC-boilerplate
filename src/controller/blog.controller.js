import { catchAsync } from '../utils/catchAsync.js';
import blogService from '../services/blog.service.js';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';

const createBlog = catchAsync(async (req, res) => {
  await blogService.createBlog(req.body, req.body.createdBy);
  res
    .status(httpStatus.CREATED)
    .send({ success: true, message: 'Blog created successfully' });
});

const getBlogs = catchAsync(async (req, res) => {
  const blogs = await blogService.getBlogs(req.body.userId);
  res.status(httpStatus.OK).json(blogs);
});

const uploadFile = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  res.status(httpStatus.OK).json({ filePath: `/uploads/${req.file.filename}` });
});

export { getBlogs, createBlog, uploadFile };
// 66cb7e3cc7c5ac6abfeacd12
