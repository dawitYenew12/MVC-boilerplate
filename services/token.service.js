import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import config from "../config/config.js";
import { tokenTypes } from "../config/token.js";
import { Token } from '../models/token.model.js';

export const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create ({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });

  return tokenDoc;
}

export const verifyToken = async (token, type) => {
  const payLoad = jwt.verify(token, config.jwt.secretKey);
  const tokenDoc = await Token.findOne({ token, user: payLoad.subject, type, blacklisted: false});
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
}

export const generateToken = (
  userId,
  expires,
  type,
  secret = config.jwt.secretKey
) => {
  const   Load = {
    subject: userId,
    issueDate: dayjs().unix(),
    expTIme: expires.unix(),
    type,
  };

  return jwt.sign(payLoad, secret);
};

export const generateAuthTokens = async (userId) => {
  const accessTokenExpires = dayjs().add(
    config.jwt.accessTokenMinutes,
    "minutes"
  );
  const accessToken = generateToken(
    userId,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = dayjs().add(
    config.jwt.refreshTokenDays,
    "days"
  );
  const refreshToken = generateToken(
    userId,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

await saveToken(refreshToken, userId, refreshTokenExpires, tokenTypes.REFRESH);

return {
    access: {
        token: accessToken,
        expires: accessTokenExpires.toDate()
    },
    refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate()
    }
}
};
// export default generateAuthToken;
