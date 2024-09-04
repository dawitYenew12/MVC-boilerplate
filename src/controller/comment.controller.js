import { catchAsync } from '../utils/catchAsync.js';
import commentService from '../services/comment.service.js';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';

export const addComment = catchAsync(async (req, res) => {
  const blog = await commentService.addComment(
    req.body.blogId,
    req.body.comment,
  );
  if (blog) {
    return res.status(httpStatus.OK).send({ success: true, data: blog });
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
});

export default { addComment };
