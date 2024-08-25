import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { RateLimiterMongo } from "rate-limiter-flexible";
import mongoose from "mongoose";
import config from "../config/config.js";

const rateLimitOptions = {
  storeClient: mongoose.connection,
  dbName: "blog",
  blockDuration: 60 * 60 * 24,
};

export const limitConsecutiveFailsByEmailAndIP = new RateLimiterMongo({
  ...rateLimitOptions,
  points: config.rateLimit.maxConsecutiveFailsByEmailAndIP,
  duration: 60 * 10,
});

export const limitSlowBruteByIP = new RateLimiterMongo({
  ...rateLimitOptions,
  points: config.rateLimit.maxWrongAttemptsByIPperDay,
  duration: 60 * 60 * 24,
});

export const limitConsecutiveFailsByEmail = new RateLimiterMongo({
  ...rateLimitOptions,
  points: config.rateLimit.maxConsecutiveFailsByEmail,
  duration: 60 * 60 * 24,
});

export const loginRouteRateLimit = async (req, res, next) => {
  const ipAddress = req.connection.remoteAddress;
  const emailIPkey = `${req.body.email}_${ipAddress}`;
  const email = req.body.email;
  
  const [emailAndIpRes, slowByIpRes, emailBruteRes] = await Promise.all([
    limitConsecutiveFailsByEmailAndIP.get(emailIPkey),
    limitSlowBruteByIP.get(ipAddress),
    limitConsecutiveFailsByEmail.get(email),
  ]);
  let retrySecs = 0;
  if (
    slowByIpRes &&
    slowByIpRes.consumedPoints >= config.rateLimit.maxWrongAttemptsByIPperDay
  ) {
    retrySecs = Math.floor(slowByIpRes.msBeforeNext / 1000);
  } else if (
    emailAndIpRes &&
    emailAndIpRes.consumedPoints >=
      config.rateLimit.maxConsecutiveFailsByEmailAndIP
  ) {
    retrySecs = Math.floor(emailAndIpRes.msBeforeNext / 1000);
  } else if (
    emailBruteRes &&
    emailBruteRes.consumedPoints >= config.rateLimit.maxConsecutiveFailsByEmail
  ) {
    retrySecs = Math.floor(emailBruteRes.msBeforeNext / 1000);
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
