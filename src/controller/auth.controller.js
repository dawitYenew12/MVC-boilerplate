import { catchAsync } from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import { createUser } from '../services/user.service.js';
import { generateAuthTokens } from '../services/token.service.js';
import { loginUser } from '../services/auth.service.js';
import authService from '../services/auth.service.js';
import emailService from '../services/email.service.js';
import { logger } from '../config/logger.js';

export const register = catchAsync(async (req, res) => {
  //create user
  const createdUser = await createUser(req.body);
  //generate token
  const tokens = await generateAuthTokens(createdUser.user.id);
  res.status(httpStatus.CREATED).json({
    message: `Sent a verification email to ${createdUser.email}`,
    user: createdUser.user,
    verficationToken: createdUser.verificationToken,
    tokens,
  });
});

export const login = catchAsync(async (req, res) => {
  let { email, password } = req.body;
  const user = await loginUser(email, password, req.connection.remoteAddress);
  //generate token
  const tokens = await generateAuthTokens(user.id);
  res.status(httpStatus.OK).send({ user, tokens });
});

export const emailVerification = catchAsync(async (req, res) => {
  const token = req.query.token || req.body.token;
  const user = await emailService.verifyEmail(token);
  if (!user.isVerified) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: 'Email verification failed' });
  }
  res
    .status(httpStatus.OK)
    .json({ message: 'Email verified successfully', user });
});

export const refreshToken = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuthToken(req.body.refreshToken);
  res.status(httpStatus.OK).send({ ...tokens });
});

const authController = {
  register,
  login,
  refreshToken,
};

export default authController;
