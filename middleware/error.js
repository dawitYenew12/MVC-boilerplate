import config from "../config/config.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import mongoose from "mongoose";

export const errorHandler = (err, req, res, next ) => {
    const {statusCode, message } = err;
    const response = {
        error: true,
        code: statusCode,
        message: message,
        ...(config.env === 'development' && {stack : err.stack}),
    }
    if (config.env === 'development') {
        console.log(err);
    }
    res.status(statusCode).json(response);
}

export const errorConverter = (err, req, res, next) => {
    console.log(err);
    let error = err;
    if (! (error instanceof ApiError)) {
        const statusCode = error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, error.stack);
    }
    next(error)
}