import { catchAsync } from '../utils/catchAsync.js';
import blogService from '../services/blog.service.js';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import imageProccessorQueue from '../backgound-tasks/queues/imageProcessor.js';

const createBlog = catchAsync(async (req, res) => {
  await blogService.createBlog(req.body, req.body.createdBy);
  res
    .status(httpStatus.CREATED)
    .send({ success: true, message: 'Blog created successfully' });
});

const getRecentBlogs = catchAsync(async (req, res) => {
  const blogs = await blogService.getRecentBlogs();
  res.status(httpStatus.OK).json(blogs);
});

const uploadFile = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  const fileName = `image-${Date.now()}.webp`;
  await imageProccessorQueue.add('ImageProcessor', {
    file: req.file,
    fileName,
  });
  res.status(httpStatus.OK).json({ fileName });
});

const getFile = catchAsync(async (req, res) => {
  const filename = req.params.fileName;
  const stream = await blogService.getFileStream(filename);
  const contentType = `image/${filename.split('.')[1].toLowerCase()}`;
  res.setHeader('content-type', contentType);
  stream.pipe(res);
});

const searchBlog = catchAsync(async (req, res) => {
  const blogs = await blogService.searchBlog(req.query.searchQuery);
  res.status(httpStatus.OK).json(blogs);
});

export { getRecentBlogs, createBlog, uploadFile, getFile, searchBlog };
