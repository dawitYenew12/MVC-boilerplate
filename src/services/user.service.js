import { User } from './../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';
import { generateVerificationToken } from '../services/token.service.js';
import { sendVerificationEmail } from '../services/email.service.js';

export const createUser = async (userBody) => {
  //check if email already exists in database
  if (await User.isEmailRegistered(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already registered');
  }
  //create user
  const user = await User.create(userBody);
  //generate email verification token with the user id
  const emailVerificationTokenDoc = await generateVerificationToken(user.id);
  const verificationToken = emailVerificationTokenDoc.token;
  //send email verification
  await sendVerificationEmail(user.email, emailVerificationTokenDoc.token);
  return {
    user,
    verificationToken,
  };
};

export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const getUserById = async (id) => {
  return await User.findById(id);
};

const userService = {
  createUser,
  getUserByEmail,
  getUserById,
};

export default userService;
