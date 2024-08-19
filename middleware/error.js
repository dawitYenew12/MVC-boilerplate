import config from "../config/config.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { logger } from '../config/logger.js'

export const errorConverter = (err, req, res, next) => {
    let error = err;
    if (! (error instanceof ApiError)) {
        const statusCode = error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, error.stack);
    }
    next(error)
}

export const errorHandler = (err, req, res, next ) => {
    let {statusCode, message } = err;
    if (config.env === 'production' && !err.isOperational){
        statusCode = httpStatus.INTERNAL_SERVER_ERROR,
        message = httpStatus[statusCode]
    }
    const response = {
        error: true,
        code: statusCode,
        message: message,
        ...(config.env === 'development' && {stack : err.stack}),
    }
    res.locals.errorMessage = message;
    if (config.env === 'development') {
        logger.error(err);
    }
    res.status(statusCode).json(response);
}
