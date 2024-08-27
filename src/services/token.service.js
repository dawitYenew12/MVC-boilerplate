import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import config from '../config/config.js';
import { tokenTypes } from '../config/token.js';
import { Token } from '../models/token.model.js';

/**
 * Save a token to the database.
 *
 * @param {string} token - The JWT token to be saved.
 * @param {ObjectId} userId - The ID of the user to whom the token belongs.
 * @param {dayjs.Dayjs} expires - The expiration date of the token.
 * @param {string} type - The type of the token (e.g., access, refresh).
 * @param {boolean} [blacklisted=false] - Whether the token is blacklisted.
 * @returns {Promise<Token>} - The created token document.
 */
export const saveToken = async (
  token,
  userId,
  expires,
  type,
  blacklisted = false,
) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(), // Convert dayjs object to a JavaScript Date object
    type,
    blacklisted,
  });

  return tokenDoc;
};

/**
 * Verify a token by decoding it and checking if it exists in the database.
 *
 * @param {string} token - The JWT token to verify.
 * @param {string} type - The type of the token (e.g., access, refresh).
 * @returns {Promise<Token>} - The token document if verification is successful.
 * @throws {Error} - If the token is not found or is invalid.
 */
export const verifyToken = async (token, type) => {
  const payLoad = jwt.verify(token, config.jwt.secretKey); // Decode and verify the token using the secret key
  const tokenDoc = await Token.findOne({
    token,
    user: payLoad.subject, // The 'subject' field contains the user ID
    type,
    blacklisted: false, // Ensure the token is not blacklisted
  });

  if (!tokenDoc) {
    throw new Error('Token not found'); // Throw an error if the token is not found in the database
  }
  return tokenDoc;
};

/**
 * Generate a JWT token.
 *
 * @param {ObjectId} userId - The ID of the user for whom the token is generated.
 * @param {dayjs.Dayjs} expires - The expiration date of the token.
 * @param {string} type - The type of the token (e.g., access, refresh).
 * @param {string} [secret=config.jwt.secretKey] - The secret key to sign the token.
 * @returns {string} - The signed JWT token.
 */
export const generateToken = (
  userId,
  expires,
  type,
  secret = config.jwt.secretKey,
) => {
  const payLoad = {
    subject: userId, // The 'subject' field typically represents the user ID
    issueDate: dayjs().unix(), // Issue date as a Unix timestamp
    expTIme: expires.unix(), // Expiration time as a Unix timestamp
    type,
  };

  return jwt.sign(payLoad, secret); // Sign and return the token
};

/**
 * Generate both access and refresh tokens for authentication.
 *
 * @param {ObjectId} userId - The ID of the user for whom the tokens are generated.
 * @returns {Promise<Object>} - An object containing the access and refresh tokens and their expiration dates.
 */
export const generateAuthTokens = async (userId) => {
  // Set access token expiration time
  const accessTokenExpires = dayjs().add(
    config.jwt.accessTokenMinutes,
    'minutes',
  );
  const accessToken = generateToken(
    userId,
    accessTokenExpires,
    tokenTypes.ACCESS,
  );

  // Set refresh token expiration time
  const refreshTokenExpires = dayjs().add(config.jwt.refreshTokenDays, 'days');
  const refreshToken = generateToken(
    userId,
    refreshTokenExpires,
    tokenTypes.REFRESH,
  );

  // Save the refresh token to the database
  await saveToken(
    refreshToken,
    userId,
    refreshTokenExpires,
    tokenTypes.REFRESH,
  );

  return {
    access: {
      token: accessToken, // The access token
      expires: accessTokenExpires.toDate(), // The expiration date of the access token
    },
    refresh: {
      token: refreshToken, // The refresh token
      expires: refreshTokenExpires.toDate(), // The expiration date of the refresh token
    },
  };
};

// export default generateAuthToken;

const tokenService = {
  generateAuthTokens,
  verifyToken,
  saveToken,
  generateToken,
};

export default tokenService;
