import blogRouter from './routes/blog.route.js';
import authRouter from './routes/auth.route.js';
import { errorHandler, errorConverter } from './middleware/error.js';
import ApiError from './utils/ApiError.js';
import httpStatus from 'http-status';
import express from 'express';
import passport from 'passport';
import { jwtStrategy } from './config/passport.js';
import { morganSucessHandler, morganErrorHandler } from './config/morgan.js';

const app = express();

// Set up logging using morgan
app.use(morganSucessHandler); 
app.use(morganErrorHandler); 

app.use(express.json());

// Initialize passport for authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy); 

// Set up API routes
app.use(authRouter);  
app.use(blogRouter);  

// Not found 404
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Convert errors to ApiError instances and handle them
app.use(errorConverter); // Convert any error to ApiError
app.use(errorHandler);   // Handle errors and send responses

export default app;
