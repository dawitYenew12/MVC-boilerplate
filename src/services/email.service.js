import eventEmitter from '../utils/eventEmitter.js';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { logger } from '../config/logger.js';
import config from '../config/config.js';

export const sendVerificationEmail = async (
  receiverEmail,
  emailVerificationToken,
) => {
  try {
    const verificationUrl = `http://localhost:3000/auth/verifyEmail?token=${emailVerificationToken}`;
    // Emit an event for sending verification email
    eventEmitter.emit('signup', { receiverEmail, verificationUrl });
  } catch (error) {
    logger.error(error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error scheduling email sending',
    );
  }
};

export const verifyEmail = async (token) => {
  if (!token) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Token is required');
  }

  const payload = jwt.verify(token, config.jwt.userVerificationToken);
  const user = await User.findOne({ _id: payload.subject });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!user.isVerified) {
    user.isVerified = true;
    await user.save();
    return user;
  }
  throw new ApiError(httpStatus.BAD_REQUEST, 'User is already verified');
};

const emailService = { sendVerificationEmail, verifyEmail };
export default emailService;
