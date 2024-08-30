import { transporter, renderTemplate } from '../utils/email-transporter.js';
import config from '../config/config.js';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { logger } from '../config/logger.js';

export const sendVerificationEmail = async (
  receiverEmail,
  emailVerificationToken,
) => {
  const verificationUrl = `http://localhost:3000/auth/verifyEmail?token=${emailVerificationToken}`;
  const templateName = 'email_verification';
  const context = {
    user: {
      customName: User.name, // Context for {{user.name}} in the template
    },
    verificationUrl, // Context for {{verificationUrl}} in the template
  };
  const html = await renderTemplate(templateName, context);
  logger.info('Email rendered successfully before sending');
  const mailOptions = {
    from: `Dawit Yenew <${config.email}>`,
    to: receiverEmail,
    subject: 'Email Verification',
    html,
  };

  try {
    transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error(error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error sending email');
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
