import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import config from "../config/config.js";
import { tokenTypes } from "../config/token.js";
export const generateToken = (
  userId,
  expires,
  type,
  secret = config.jwt.secretKey
) => {
  const payLoad = {
    subject: userId,
    issueDate: dayjs().unix(),
    expTIme: expires.unix(),
    type,
  };

  return jwt.sign(payLoad, secret);
};

export const generateAuthTokens = (userId) => {
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
