import blogRouter from './routes/blog.route.js';
import { errorHandler, errorConverter } from './middleware/error.js';
import ApiError from './utils/ApiError.js';
import httpStatus from 'http-status';
import express from 'express';
const app = express();

app.use(express.json());
app.use(blogRouter);
app.use((req, res, next) => {
    next( new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
app.use(errorConverter);
app.use(errorHandler);

export default app;
