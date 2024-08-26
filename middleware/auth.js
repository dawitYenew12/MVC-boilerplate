import passport from "passport";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

const verifyCallBack = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please Authenticate!");
  }
  req.user = (user instanceof Promise) ? await user : user;
  resolve();
};

export const auth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallBack(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((error) => next(error));
};

const authMiddleware = auth;

export default authMiddleware;
