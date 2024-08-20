import blogRouter from './routes/blog.route.js';
import authRouter from './routes/auth.route.js'
import { errorHandler, errorConverter } from './middleware/error.js';
import ApiError from './utils/ApiError.js';
import httpStatus from 'http-status';
import express from 'express';
const app = express();
import { morganSucessHandler,morganErrorHandler } from './config/morgan.js';

app.use(morganSucessHandler)
app.use(morganErrorHandler)
app.use(express.json());
app.use(authRouter);
app.use(blogRouter);
app.use((req, res, next) => {
    next( new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
app.use(errorConverter);
app.use(errorHandler);

export default app;
