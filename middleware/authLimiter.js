import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import { RateLimiterMongo } from "rate-limiter-flexible";
import mongoose from "mongoose";

const maxWrongAttemptsByIPperDay = 100;
const maxConsecutiveFailsByEmailAndIP = 10;

export const limitConsecutiveFailsByEmailAndIP = new RateLimiterMongo({
  storeClient: mongoose.connection,
  points: maxConsecutiveFailsByEmailAndIP,
  duration: 60 * 10,
  blockDuration: 60 * 60 * 24,
  dbName: "blog_app",
});

export const limitSlowBruteByIP = new RateLimiterMongo({
  storeClient: mongoose.connection,
  points: maxWrongAttemptsByIPperDay,
  duration: 60 * 60 * 24,
  blockDuration: 60 * 60 * 24,
  dbName: "blog_app",
});

export const loginRouteRateLimit = (req, res, next) => {
  const ipAddress = req.connection.remoteAddress;
  const emailIPkey = `${req.body.email}_${ipAddress}`;

  const [emailAndIpRes, slowByIpRes] = Promise.all([
    limitConsecutiveFailsByEmailAndIP.get(emailIPkey),
    limitSlowBruteByIP.get(ipAddr),
  ]);
  const retrySecs = 0;
  if (slowByIpRes && slowByIpRes.consumedPoints > maxWrongAttemptsByIPperDay) {
    retrySecs = Math.floor(slowByIpRes.msBeforeNext / 1000);
  } else if (
    emailAndIpRes &&
    emailAndIpRes.consumedPoints > maxConsecutiveFailsByEmailAndIP
  ) {
    retrySecs = Math.floor(emailAndIpRes.msBeforeNext / 1000);
  }

  if (retrySecs > 0) {
    res.set("Retry-After", String(retrySecs));
    return next(
      new ApiError(httpStatus.TOO_MANY_REQUESTS, "Too many requests!")
    );  
  }
  next();
};

export default {
  loginRouteRateLimit,
  limitConsecutiveFailsByEmailAndIP,
  limitSlowBruteByIP,
};
