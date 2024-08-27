import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';
import tokenService from '../services/token.service.js';
import { tokenTypes } from '../config/token.js';
import userService from './user.service.js';
import { RateLimiterMongo } from 'rate-limiter-flexible';
import mongoose from 'mongoose';
import config from '../config/config.js';

/**
 * Authenticate a user by their email and password.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} - The authenticated user object.
 * @throws {ApiError} - If the email or password is incorrect.
 */
export const loginUser = async (email, password, ipAddress) => {
  const rateLimitOptions = {
    storeClient: mongoose.connection,
    dbName: 'blog',
    blockDuration: 60 * 60 * 24,
  };

  const limitConsecutiveFailsByEmailAndIP = new RateLimiterMongo({
    ...rateLimitOptions,
    points: config.rateLimit.maxConsecutiveFailsByEmailAndIP,
    duration: 60 * 10,
  });

  const limitSlowBruteByIP = new RateLimiterMongo({
    ...rateLimitOptions,
    points: config.rateLimit.maxWrongAttemptsByIPperDay,
    duration: 60 * 60 * 24,
  });

  const limitConsecutiveFailsByEmail = new RateLimiterMongo({
    ...rateLimitOptions,
    points: config.rateLimit.maxConsecutiveFailsByEmail,
    duration: 60 * 60 * 24,
  });

  const promises = [limitSlowBruteByIP.consume(ipAddress)];
  const user = await userService.getUserByEmail(email);

  if (!user || !(await user.isPasswordMatch(password))) {
    user &&
      promises.push(
        limitConsecutiveFailsByEmailAndIP.consume(`${email}_${ipAddress}`),
        limitConsecutiveFailsByEmail.consume(email),
      );
    await Promise.all(promises);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Refresh the authentication tokens using a refresh token.
 *
 * @param {string} refreshToken - The refresh token provided by the client.
 * @returns {Promise<Object>} - New access and refresh tokens.
 * @throws {ApiError} - If the refresh token is invalid or the user cannot be authenticated.
 */
export const refreshAuthToken = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH,
    );
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.deleteOne();
    return tokenService.generateAuthTokens(user.id);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

const authService = {
  loginUser,
  refreshAuthToken,
};

export default authService;
