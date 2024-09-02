import path from 'path';
import { catchAsync } from '../utils/catchAsync.js';
import blogService from '../services/blog.service.js';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { logger } from '../config/logger.js';

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
  res.status(httpStatus.OK).json({ filePath: req.file.filename });
});

const getFile = catchAsync(async (req, res) => {
  const filename = req.params.fileName;
  const stream = await blogService.getFileStream(filename);
  const contentType = `image/${filename.split('.')[1].toLowerCase()}`;
  res.setHeader('content-type', contentType);
  stream.pipe(res);
});

export { getBlogs, createBlog, uploadFile, getFile };
// 66cb7e3cc7c5ac6abfeacd12
